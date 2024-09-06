import express from "express";

const userRouter = express.Router();

//seraching user and getting the info
userRouter.route("/").get(async (req, res) => {});

userRouter
  .route("/:userId")
  //getting user details
  .get(async (req, res) => {})
  // update your info
  .post(async (req, res) => {});

export { userRouter };
