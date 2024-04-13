import express from "express";
import { registerUser, loginUser, getUserProfile } from '../controllers/UserController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration route
router.post('/', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route
router.get('/profile', authenticate, getUserProfile);

export default router;
