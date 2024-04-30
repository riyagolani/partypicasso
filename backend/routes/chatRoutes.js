import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChats);
router.route("/group").post(authenticate, createGroupChat);
router.route("/rename").put(authenticate, renameGroup);
router.route("/groupremove").put(authenticate, removeFromGroup);
router.route("/groupadd").put(authenticate, addToGroup);

export default router;
