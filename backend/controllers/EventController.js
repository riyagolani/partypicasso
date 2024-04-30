import Event from '../models/EventModel.js';
import EventRequest from '../models/EventRequestModel.js';
// import Chat from '../models/Chat.js';
import Booking from '../models/BookingModel.js';
// import Confirmation from '../models/Confirmation.js';


export const calculateRemainingSeats = async (eventId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    const bookingsCount = await Booking.countDocuments({ eventId });
    const remainingSeats = event.totalSeats - bookingsCount;
    return remainingSeats;
}; //Not final yet

// Function to get list of events
export const getEvents = async (request, response) => {
    try {
        if (!request.user || request.user.role !== 'user') {
            return response.status(403).json({ message: 'Access forbidden: Only authenticated users with role user can access this resource.' });
        }
        const events = await Event.find({proposalStatus: 'accepted'});
        return response.status(200).json(events);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Function to search events by name, description, or category
export const searchEvents = async (request, response) => {
    try {
        // Check if the user is authenticated
        if (!request.user) {
            return response.status(401).json({ message: 'Unauthorized: Please log in to access this resource.' });
        }

        const searchText = request.query.searchText;

        // Search events by name, description, or category
        const events = await Event.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } }, // Case-insensitive search by name
                { description: { $regex: searchText, $options: 'i' } }, // Case-insensitive search by description
                { category: { $regex: searchText, $options: 'i' } } // Case-insensitive search by category
            ]
        });

        return response.status(200).json(events);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};


// Function to get event details by eventId
export const getEventDetails = async (request, response) => {
    try {
        // Extract the eventId parameter from the request URL
        const { eventId } = request.params;

        // Fetch event details from the database using the eventId
        const event = await Event.findById(eventId);

        // Check if the event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Return the event details in the response
        return response.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event details:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};


export const submitEventProposal = async (request, response) => {
    try {
        // Access the user ID and role from the request object
        const { id, role } = request.user;

        // Check if the user has the 'host' role
        if (role !== 'Host') {
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
        console.log('Event proposal submitted successfully.' );
        return response.status(201).json(newEventRequest._id);
    } catch (error) {
        console.error('Error submitting event proposal:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};


export const eventProposalStatus = async (request, response) => {
    try {
        // Extract the proposalId parameter from the request URL
        const { requestId } = request.params;

        // Fetch event proposal details from the database using the proposalId
        const eventRequest = await EventRequest.findById(requestId);

        // Check if the event proposal exists
        if (!eventRequest) {
            return response.status(404).json({ message: 'Event proposal not found.' });
        }

        // Return the status of the event proposal in the response
        return response.status(200).json(eventRequest);
    } catch (error) {
        console.error('Error fetching event request status:', error);
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
export const bookEvent = async (request, response) => {
    try {
        // Extract the eventId and quantity of tickets from the request body
        const { eventId } = request.params;
        const { quantity } = request.body;
        const userId = request.user.id;
        // Find the event by eventId in the database
        const event = await Event.findById(eventId);

        // Check if the event exists
        if (!event) {
            return response.status(404).json({ message: 'Event not found.' });
        }

        // Check if the requested quantity of tickets is available
        const remainingSeats = await calculateRemainingSeats(eventId);

        if (remainingSeats < quantity) {
            return response.status(400).json({ message: 'Not enough tickets available.' });
        }

        // Create booking records in the database
        const booking = new Booking({
            eventId,
            quantity,
            userId
            // You can add more fields like user ID, booking date, etc.
        });
        await booking.save();

        // Return the booking ID or any relevant success message as a response
        return response.status(200).json({ bookingId: booking._id });
    } catch (error) {
        console.error('Error booking tickets:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};

// // Function to send booking confirmation
// export const sendBookingConfirmation = async (request, response) => {
//     // Implement logic to send booking confirmation to user
// };
