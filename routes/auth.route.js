import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.route("/signUp").post(async (req, res) => {});
authRouter.route("/login").post(async (req, res) => {});

export { authRouter };
