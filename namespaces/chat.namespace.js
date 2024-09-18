export default (chatNsp) => {
  chatNsp.on("connection", (socket) => {
    console.log("A user connected to the chat namespace");

    //join the room (with chatid as room)

    //broadcast message to room except to one who sent

    //
  });
};
