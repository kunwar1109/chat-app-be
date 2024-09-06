import express from "express";
import { Chat } from "../models/chats.model.js";
const chatRouter = express.Router();

//create a chat
chatRouter
  .route("/")
  .get(async (req, res) => {
    const { userId } = req.body;
    try {
      const chats = await Chat.find({
        members: userId,
      }).sort({ updatedAt: "desc" });

      res.status(200).json({
        success: true,
        chats,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {});

//get chat details and update
chatRouter
  .route("/:chatId")
  .get(async (req, res) => {
    const { chatId } = req.params;
    try {
      const chat = await Chat.findById(chatId);
      if (chat) {
        res.status(200).json({
          success: true,
          chat,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Chat Not Found",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  })
  .put(async (req, res) => {});

export { chatRouter };
