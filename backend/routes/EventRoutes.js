import express from 'express';
import {authenticate} from '../middleware/authMiddleware.js';
import { getEvents, searchEvents, getEventDetails, submitEventProposal, eventProposalStatus, bookEvent, getAllEvents, getCategoryEvents} from '../controllers/EventController.js';

const router = express.Router();

// Event Listing API
router.get('/', authenticate, getEvents);

// Event Lsting API For All The Events
router.get('/getAll',authenticate,getAllEvents);

router.get('/:category',authenticate, getCategoryEvents);

// Event Search API
router.get('/search', authenticate, searchEvents);

// Event Details API
router.get('/:eventId', authenticate, getEventDetails);

// Event Proposal Request
router.post('/proposal', authenticate, submitEventProposal);

// Event Proposal Request Status
router.get('/proposal/:requestId/status', authenticate, eventProposalStatus);

// // Group Chat API
// router.get('/:eventId/chat', authenticate, getEventChat);

// // Chat List API
// router.get('/user/chats', authenticate, getUserChats);

// // Booking API
router.post('/:eventId/book', authenticate, bookEvent);

// // Confirmation API
// router.post('/booking/:bookingId/confirmations', authenticate, confirmBooking);

export default router;
