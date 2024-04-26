import Event from '../models/EventModel.js';
import EventRequest from '../models/EventRequestModel.js';
// import Chat from '../models/Chat.js';
// import Booking from '../models/Booking.js';
// import Confirmation from '../models/Confirmation.js';

// Function to get list of events
export const getEvents = async (request, response) => {
    try {
        const events = await Event.find();
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Function to search for events
export const searchEvents = async (request, response) => {
    // Implement search functionality based on request parameters
};

// Function to get event details by eventId
export const getEventDetails = async (request, response) => {
    // Implement logic to retrieve event details by eventId
};

export const submitEventProposal = async (request, response) => {
    try {
        // Access the user ID and role from the request object
        const { id, role } = request.user;

        // Check if the user has the 'host' role
        if (role !== 'host') {
            return response.status(403).json({ message: 'Unauthorized: Only hosts can submit event proposals.' });
        }

        // Extract event details from request body
        const eventData = request.body;

        // Add the organizer (user) ID to the event data
        eventData.organizer = id;

        // Create new event proposal
        const newEventProposal = new Event(eventData);

        // Save the event proposal to the database
        await newEventProposal.save();

        // Create new event request
        const newEventRequest = new EventRequest({
            hostId: id,
            eventId: newEventProposal._id, // Assuming the event ID is stored in _id field
            eventName: eventData.name,
            requestStatus: 'pending',
            reasonForRejection: null // Initially set to null
        });

        // Save the event request to the database
        await newEventRequest.save();

        // Send confirmation message
        return response.status(201).json({ message: 'Event proposal submitted successfully.' });
    } catch (error) {
        console.error('Error submitting event proposal:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};




// // Function to join event chat
// export const joinEventChat = async (request, response) => {
//     // Implement logic to allow user to join event chat
// };

// Function to get list of user's event chats
// export const getChatList = async (request, response) => {
//     // Implement logic to retrieve list of user's event chats
// };

// // Function to book tickets for an event
// export const bookEvent = async (request, response) => {
//     // Implement logic to book tickets for an event
// };

// // Function to send booking confirmation
// export const sendBookingConfirmation = async (request, response) => {
//     // Implement logic to send booking confirmation to user
// };
