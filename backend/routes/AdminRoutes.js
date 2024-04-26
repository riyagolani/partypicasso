import express from "express";
import { adminLogin, getAllEventRequests, manageEventRequest } from "../controllers/AdminController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login Method
router.post('/login', adminLogin);

// Get all Event Requests
router.get('/event-requests', authenticate, getAllEventRequests);

// Accept or decline Event Request
router.put('/event-requests/:requestId', authenticate, manageEventRequest);

export default router;