import express from "express";
import {
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/chat").get(authenticate, fetchChats);
router.route("/chat/group").post(authenticate, createGroupChat);
router.route("/chat/rename").put(authenticate, renameGroup);
router.route("/chat/groupremove").put(authenticate, removeFromGroup);
router.route("/chat/groupadd").put(authenticate, addToGroup);

export default router;
