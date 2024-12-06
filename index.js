const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//establish socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("chat-message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("chat-message", { user: socket.id, message: msg });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
