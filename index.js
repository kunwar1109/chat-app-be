import express from "express";
import { connectToDb } from "./db/connection.js";
import {
  authRouter,
  chatRouter,
  msgRouter,
  userRouter,
} from "./routes/index.js";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);
app.use(express.json());
const port = 8000;

connectToDb();
const io = new Server(server, {});

io.on("connection", (socket) => {
  console.log("A user connected");
});

// addChatToDB();
app.use("/chats", chatRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/messages", msgRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
