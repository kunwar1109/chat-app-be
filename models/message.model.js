import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Message is Required"],
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sent By is required"],
    },
    repliedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Chat is Required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", MessageSchema);

// export const addMessageToDB = () => {
//   [
//     {
//       message: "Hello!",
//       sentBy: "66d991b1324b735da92f57bc",
//       repliedId: "66d99d52382afbb707c94847",
//       chatId: "66d9b2f98fd5af402e423e73",
//     },
//   ].forEach(async (msg) => {
//     const NewMessage = new Message(msg);
//     try {
//       await NewMessage.save();
//       console.log("added");
//     } catch (error) {
//       console.error("cannot add to Databse", error);
//     }
//   });
// };
