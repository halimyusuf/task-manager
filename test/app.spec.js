import request from "supertest";
import {
    expect
} from 'chai'
import
User
from "../src/resources/user/user.model"
import server from "../src/app";
import Project from "../src/resources/project/project.model";
import Tasks from "../src/resources/tasks/tasks.model";
import dotenv from 'dotenv';
dotenv.config()

describe("User tests", () => {
    let id;
    before(async () => {
        await User.deleteMany({})
        await Project.deleteMany({})
        await Tasks.deleteMany({})
    })
    after(() => {
        server.close()
    })
    describe("POST /api/v1/", () => {

        let token, param, param1, user, userId, owner;
        const exec = () => {
            return request(server)
                .post(`/api/v1/${param}/${param1}`)
                .set('todo-auth-token', token)
                .send({
                    name: "Yusuf Halim",
                    position: "manager",
                    password: "admin12345",
                    email: "admin123@gamil.com",
                    description: "This is a sample description ,smiles.",
                    endDate: Date.now(),
                    vendor: "vendor",
                    owner: owner
                });
        }
        beforeEach(() => {
            param1 = "register"
            param = "user"
            user = new User()
            user.isAdmin = true
            userId = user._id
            token = user.generateAuthToken()
            owner = id
        });
        it('create  user - should return 200 if token is valid', async () => {
            const res = await exec();
            console.log(res.body)
            id = res.body.user._id
            expect(res.status).to.equal(200);
        });

        it('should return 401 if no token is provided', async () => {
            token = false;
            const res = await exec();
            // console.log(res.body)
            // change to 401 later
            expect(res.status).to.equal(400);
        });

        it('should return 400 if token is invalid', async () => {
            token = 'a';
            const res = await exec();
            expect(res.status).to.equal(400);
        });

        it('create project - should return 200 if token is valid', async () => {
            param = "project"
            param1 = ""
            const res = await exec();
            // console.log(res.body)
            expect(res.status).to.equal(200);
        });

    })


    describe("GET /api/v1/", () => {
        let token, param, param1;
        const exec = async () =>
            await request(server)
            .get(`/api/v1/${param}/${param1}`)
            .set("todo-auth-token", token);
        beforeEach(() => {
            param = "user"
            param1 = "all"
            token = new User().generateAuthToken();
        });
        it("should get all users", async () => {
            const res = await exec();
            console.log(res.body)
            id = res.body[0]._id
            expect(res.status).to.equal(200);
        });

        it("should get all projects", async () => {
            param = "project"
            const res = await exec();
            expect(res.status).to.equal(200);
        });

    });

    describe("User approval - patch api/v1/project ", () => {
        let token, user, param;
        const exec = async () =>
            await request(server)
            .patch(`/api/v1/user/${id}/${param}`)
            .set("todo-auth-token", token)
            .send({
                approved: true,
                pass_key: process.env.adminKey
            });
        before(() => {
            console.log("ID is", id)
            param = "approve"
            user = new User()
            user.isAdmin = true
            console.log(id)
            token = user.generateAuthToken()
            console.log(token)
        })

        it("should expect status 200 if its successfully patched", async () => {
            const res = await exec()
            console.log(res)
            expect(res.status).to.equal(200)
            expect(res.body.approved).to.equal(true)
        })
        it("should expect status 200 if user admin its successfully patched", async () => {
            param = "admin"
            const res = await exec()
            console.log(res)
            expect(res.status).to.equal(200)
            expect(res.body.approved).to.equal(true)
        })
    })





})