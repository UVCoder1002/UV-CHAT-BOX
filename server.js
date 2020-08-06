const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http);

//SERVER THE PUBLIC DIRECTORY
http.listen("3000", () => {
  console.log("listening at port 3000");
});
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (message) => {
    console.log(message);
    //BROADCASTING MESSAGE TO EVERYONE
    io.emit("message", message);
  });
});
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, +"public/index.html"));
});
