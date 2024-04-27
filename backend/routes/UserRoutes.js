import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/UserController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { allUsers } from "../controllers/ChatUserControllers.js";

const router = express.Router();

// User registration route
router.post("/", registerUser);

// User login route
router.post("/login", loginUser);

// User profile route
router.get("/profile", authenticate, getUserProfile);

router.get("/chat", allUsers);

export default router;
