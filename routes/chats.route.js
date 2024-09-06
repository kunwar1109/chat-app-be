import express from "express";

const chatRouter = express.Router();

//create a chat
chatRouter.route("/").post(async (req, res) => {});

//get chat details and update
chatRouter
  .route("/:chatId")
  .get(async (req, res) => {
    const { chatId } = req.params;
    res.send(chatId);
  })
  .put(async (req, res) => {});

export { chatRouter };
