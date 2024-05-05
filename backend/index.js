import express from "express";
import cors from "cors";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import EventRoutes from "./routes/EventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
// Home Page
app.get("/", (request, response) => {
  return response.status(200).send("Welcome to the Server");
});

// User Routes
app.use("/user", userRoutes);

//Admin Routes
app.use("/admin", AdminRoutes);

//Event Routes
app.use("/events", EventRoutes);

//Chat Routes
app.use("/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log("Server Running");
});

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error");
  });

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User Joined: ", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: ", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("Disconnected from socket.io");
    socket.leave(userData._id);
  });
});
