import express from 'express';
import {authenticate} from '../middleware/authMiddleware.js';
import { submitEventProposal } from '../controllers/EventController.js';

const router = express.Router();

// Event Listing API
// router.get('/', getAllEvents);

// // Event Search API
// router.get('/search', searchEvents);

// // Event Details API
// router.get('/:eventId', getEventDetails);

// Event Host Request
router.post('/host', authenticate, submitEventProposal);

// // Group Chat API
// router.get('/:eventId/chat', authenticate, getEventChat);

// // Chat List API
// router.get('/user/chats', authenticate, getUserChats);

// // Booking API
// router.post('/:eventId/bookings', authenticate, bookEvent);

// // Confirmation API
// router.post('/booking/:bookingId/confirmations', authenticate, confirmBooking);

export default router;
