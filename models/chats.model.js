import mongoose from "mongoose";

const { Schema } = mongoose;

const ChatSchema = new Schema({
  chatType: {
    type: String,
    enum: ["PVT", "GROUP"],
    default: "PVT",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Members are required"],
    },
  ],
  name: {
    type: String,
  },
  displayPicture: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Chat = mongoose.model("Chat", ChatSchema);

// export const addChatToDB = () => {
//   [
//     {
//       members: ["66d9915fbcf7a9f28425ece4", "66d991b1324b735da92f57bc"],
//     },
//   ].forEach(async (chat) => {
//     const NewChat = new Chat(chat);
//     try {
//       await NewChat.save();
//       console.log("added");
//     } catch (error) {
//       console.error("cannot add to Databse", error);
//     }
//   });
// };
