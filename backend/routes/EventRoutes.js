import express from 'express';
import {authenticate} from '../middleware/authMiddleware.js';
import { getEvents, searchEvents, getEventDetails, submitEventProposal, eventProposalStatus, bookEvent, getAllRequests, getCategoryEvents, getRegisteredEvents, cancelBooking} from '../controllers/EventController.js';

const router = express.Router();
// Event Listing API
router.get('/', authenticate, getEvents);

// Event Listing API for all the Events for logged in host
router.get('/getallrequests', authenticate, getAllRequests);

// List of events based on category
router.get('/category/:category', authenticate, getCategoryEvents);

// Event Search API
router.get('/search', authenticate, searchEvents);


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


// Route to get event details by ID
router.get('/:eventId', authenticate, getEventDetails); // This needs to be defined after all the generic routes

// // Confirmation API
// router.post('/booking/:bookingId/confirmations', authenticate, confirmBooking);

// Get all events registered by user
router.post('/getUser',authenticate,getRegisteredEvents);

// delete booking
router.put('/cancelBooking/:bookingId',authenticate, cancelBooking);

export default router;
