export default (chatNsp) => {
  chatNsp.on("connection", (socket) => {
    console.log("A user connected to the chat namespace", socket.id);

    //join the room (with chatid as roomName)
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`socket ${socket.id} joined`);
    });

    //broadcast message to room except to one who sent
    socket.on("send_msg", ({ message }) => {
      socket.broadcast.to(message.chatId).emit("recieve_msg", message, () => {
        console.log("hello");
      });
    });

    //leave room function
    socket.on("leave_chat", (chatId) => {
      socket.leave(chatId);
    });
  });
};
