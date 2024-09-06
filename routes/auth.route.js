import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";

const authRouter = express.Router();

authRouter.route("/signup").post(async (req, res) => {
  const user = req.body;
  console.log(req);
  try {
    const checkUser = await User.findOne({
      email: user.email,
    });
    if (checkUser) {
      return res.status(403).json({
        success: false,
        message: "User Already Exist , Login To continue",
      });
    }

    const NewUser = new User(user);
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);

    await NewUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

authRouter.route("/login").post(async (req, res) => {
  const { userName, email, password } = req.body;
  let user;

  if (userName) {
    user = await User.findOne({ userName });
  } else {
    user = await User.findOne({ email });
  }

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.KEY, {
        expiresIn: "7d",
      });
      res.status(200).json({ name: user.userName, token, userId: user._id });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Incoorect Password" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "User not found ! Please Sign Up" });
  }
});

export { authRouter };
