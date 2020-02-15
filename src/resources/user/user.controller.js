import User from "./user.model";
import bcrypt from "bcrypt";
import _ from "lodash";
import dotenv from 'dotenv';
dotenv.config()


export async function createUser(req, res) {
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password", "position"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();
    res.header('todo-auth-token', token).header("access-control-expose-headers", "todo-auth-token").json({
        status: "success",
        token: token,
        user: user
    });
}

export async function login(req, res) {
    let user = await User.findOne({
        email: req.body.email
    });
    // console.log(user)
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    if (!user.approved) return res.status(401).send('User pending approval')


    const token = user.generateAuthToken();
    res.header('todo-auth-token', token).header("access-control-expose-headers", "todo-auth-token").json({
        status: "success",
        token: token,
        user: user
    });
}

export async function getUser(req, res) {

    const user = await User.findById(req.params.id).select('-password');;
    if (!user) res.status(400).json("User does not exist")
    res.send(user);
}

export async function getUsers(req, res) {
    const user = await User.find().select('-password');;
    res.json(user);
}

export async function approveUser(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) res.status(400).json("User does not exist")
    const value = user.approved ? false : true
    const approve = await User.findByIdAndUpdate(req.params.id, {
        approved: value
    })

    if (!approve) return res.status(404).send('The user with the given ID was not found.');
    res.status(200).send(approve)
}

export async function deleteUser(req, res) {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.status(200).send(user)
}

export async function makeAdmin(req, res) {
    if (req.body.pass_key === process.env.adminKey) {
        const user = await User.findById(req.params.id);
        user.isAdmin = true
        user.save()
        res.status(200).send(user)
    } else {
        res.status(403).send("invalid admin pass")
    }
}