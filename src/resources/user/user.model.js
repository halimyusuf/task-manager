import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const Schema = mongoose.Schema;
dotenv.config();

const userModel = new Schema({
  name: String,
  email: String,
  password: String,
  position: String,
  approved: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userModel.methods.generateAuthToken = function () {
  const token = jwt.sign({
      _id: this._id,
      isAdmin: this.isAdmin
    },
    process.env.jwtPrivateKey
  );
  return token;
};

export default mongoose.model("User", userModel);