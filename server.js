const app = require("express")(),
  colors = require("colors"),
  httpServer = require("http").createServer(app),
  io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  }),
  PORT = 3006;
var room = null;
var receiverTyping = null;
const users = {};
io.on("connection", (socket) => {
  console.log(`someone connect and socket id ${socket.id}`.bgBlue.white);

  // CREATE NEW USER
  socket.on("new_user", (userData) => {
    room = userData.room;
    console.log('user data'.bgYellow.red,userData);
    console.log("username :".bgYellow.black, userData.username);
    console.log(`room:${userData.room}`.bgBlue.white);
    users[userData.username] = socket.id;
    io.emit("new_user", users);
  });

  // SELECT USER TO CONNECT WITH AND JOIN ROOM
  socket.on("user_select", (data) => {
    console.log("data user_select", data);
    console.log("sender", data.sender);
    console.log("receiver", data.receiver);
    receiverTyping = data.receiver
    socket.join(room);
  });

  // SEND MESSAGE INTO A SPECIFIC ROOM
  socket.on("send_message", (messageData) => {
    console.log("messageData in need".bgCyan.white, messageData);
    socket.to(room).emit("new_message", messageData);
  });

  // CHECK IF SOMEONE IS TYPING
  socket.on("someone_isTyping", (isTyping) => {
    // console.log(`someone is typing :${isTyping}`.bgCyan.white);
    console.log('users'.bgCyan.red,users);
    io.to(receiverTyping).emit('check_typing', isTyping)

  });

  // CHECK USER DISCONNECTED
  socket.on("disconnect", () => {
    console.log(`user with id: ${socket.id} has disconnected `);
    console.log("users".bgYellow.blue, users);
  });
});

httpServer.listen(PORT, () => {
  console.log("server running on port", PORT);
});
It's for My Chat App ( in progress );
