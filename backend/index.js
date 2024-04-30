import express from "express";
import cors from "cors";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import EventRoutes from "./routes/EventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
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

app.listen(PORT, () => {
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
