// implement sockets for getting , saving to db , and emiiting aand snding resp to client for messages
// we can implement editing and deleting of message using routes

//will do when implementing sockets
import express from "express";
import pkg from "lodash";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chats.model.js";
const { extend } = pkg;
const msgRouter = express.Router();

msgRouter
  .route("/")
  .get(async (req, res) => {
    const { chatId } = req.body;

    try {
      const messages = await Message.find({ chatId: chatId });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    const msgBody = req.body;

    try {
      const chat = await Chat.findById(msgBody.chatId);
      if (chat) {
        extend(chat, { totalChats: chat.totalChats + 1 });
        await chat.save();
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Chat Not Found" });
      }
      const newMessage = new Message(msgBody);
      await newMessage.save();
      res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

export { msgRouter };
