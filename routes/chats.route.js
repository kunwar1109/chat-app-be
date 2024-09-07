import express from "express";
import { Chat } from "../models/chats.model.js";
import pkg from "lodash";
const chatRouter = express.Router();
const { extend, pull } = pkg;
//create  a chat and get chats for a user
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
  .post(async (req, res) => {
    const chat = req.body;
    try {
      const NewChat = new Chat(chat);
      await NewChat.save();
      return res.status(201).json({
        success: true,
        chat: NewChat,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

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
  .put(async (req, res) => {
    const { chatId } = req.params;
    const { type, update } = req.body;
    try {
      const chat = await Chat.findById(chatId);
      if (chat) {
        if (type === "MEMBER_ADD" || type === "MEMBER_REM") {
          if (type === "MEMBER_ADD") {
            update.forEach((data) => {
              chat.members.push(data);
            });
          } else {
            const remMembers = pull(chat.members, ...update);
            console.log(remMembers);
          }
        } else {
          chat = extend(chat, update);
        }
        await chat.save();
        res.status(200).json({ success: true, chat, message: "Updated" });
      } else {
        res.status(404).json({ success: false, message: "Chat Not Found" });
      }
    } catch (error) {}
  });

export { chatRouter };
