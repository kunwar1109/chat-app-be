import express from "express";
import { connectToDb } from "./db/connection.js";
import { authRouter, chatRouter, userRouter } from "./routes/index.js";

const app = express();
app.use(express.json());
const port = 8000;

connectToDb();
// addMessageToDB();
app.use("/chats", chatRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
