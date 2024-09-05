import express from "express";
import { connectToDb } from "./db/connection.js";
const app = express();
const port = 8000;

connectToDb();
// addMessageToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
