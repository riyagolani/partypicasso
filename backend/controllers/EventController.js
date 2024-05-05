import Event from '../models/EventModel.js';
import EventRequest from '../models/EventRequestModel.js';
// import Chat from '../models/Chat.js';
import Booking from '../models/BookingModel.js';
// import Confirmation from '../models/Confirmation.js';
import User from "../models/UserModel.js";
import sendEmail from "../sendEmail.js";


export const calculateRemainingSeats = async (eventId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    
    // Find all bookings for the event
    const bookings = await Booking.find({ eventId });

    // Calculate total seats booked by summing the quantity of each booking
    let totalSeatsBooked = 0;
    bookings.forEach(booking => {
        totalSeatsBooked += booking.quantity;
    });

    // Calculate remaining seats
    const remainingSeats = event.totalSeats - totalSeatsBooked;
    
    return remainingSeats;
};

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

// Function to get all the events from the database of perticular host
export const getAllRequests = async (request, response) => {
    try {
        const userId = request.user.id;
        if (!request.user || request.user.role !== 'host') {
            return response.status(403).json({ message: 'Access forbidden: Only authenticated users with role user can access this resource.' });
        }
        
        const eventrequests = await EventRequest.find({ hostId: userId });
        return response.status(200).json(eventrequests);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

//By category
export const getCategoryEvents = async (request, response) => {
    try {
        const category = request.params.category;
        if (!request.user || !request.user.role == 'user') {
            return response.status(403).json({ message: 'Access forbidden: Only authenticated users with role user can access this resource.' });
        }
        const events = await Event.find({ category: category });
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
        if (role !== 'host') {
            return response.status(403).json({ message: 'Unauthorized: Only hosts can submit event proposals.' });
        }

        // Extract event details from request body
        const eventData = request.body;

        // Add the organizer (user) ID to the event data
        eventData.organizer = id;

        // Create new event proposal
        const newEvent = new Event(eventData);

        // Save the event proposal to the database
        await newEvent.save();

        // Create new event request
        const newEventRequest = new EventRequest({
            hostId: id,
            eventId: newEvent._id, // Assuming the event ID is stored in _id field
            eventName: eventData.name,
            requestStatus: 'pending',
            reasonForRejection: null // Initially set to null
        });

        // Save the event request to the database
        await newEventRequest.save();

        // Send confirmation message
        console.log('Event proposal submitted successfully.' );
        return response.status(201).json({"eventRequestId": newEventRequest._id, "eventId": newEvent._id});
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

        if( quantity > event.availableSeats){
            return response.status(503).json({message:"Seats not available"});
        }
        // Create booking records in the database
        const booking = new Booking({
            eventId,
            quantity,
            userId
            // You can add more fields like user ID, booking date, etc.
        });
        await booking.save();

        // Calculate the new value for availableSeats
        const updatedAvailableSeats = event.availableSeats - quantity;

        // Update the event document in the database with the new value of availableSeats
        await Event.findByIdAndUpdate(eventId, { availableSeats: updatedAvailableSeats });

         // Fetch user details for email id
         const user = await User.findById(request.user.id);
        
         const email = user.email;
         await sendEmail(email, booking._id);

        // Return the booking ID or any relevant success message as a response
        return response.status(200).json({ bookingId: booking._id});
    } catch (error) {
        console.error('Error booking tickets:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};

// // Function to send booking confirmation
// export const sendBookingConfirmation = async (request, response) => {
//     // Implement logic to send booking confirmation to user
// };



// Registered bookings
export const getRegisteredEvents = async (request, response) => {
    try {
        const userId = request.user.id;
        if (!request.user || request.user.role !== 'user') {
            return response.status(403).json({ message: 'Access forbidden: Only authenticated users with role user can access this resource.' });
        }

        // Fetch all bookings for the user
        const bookings = await Booking.find({ userId });

        // Extract unique event IDs from the bookings
        const eventIds = Array.from(new Set(bookings.map(booking => booking.eventId)));

        // Fetch events associated with the extracted event IDs
        const events = await Event.find({ _id: { $in: eventIds } });

        // Prepare response data
        const responseData = bookings.map(booking => {
            const event = events.find(event => event._id.toString() === booking.eventId.toString());
            return {
                BookingId: booking._id,
                eventId: booking.eventId,
                quantity: booking.quantity,
                eventName: event.name,
                eventData: {
                    description: event.description,
                    date: event.date,
                    startTime: event.startTime,
                    duration: event.duration,
                    mode: event.mode,
                    category: event.category,
                    price: event.price,
                    organizer: event.organizer,
                    totalSeats: event.totalSeats,
                    proposalStatus: event.proposalStatus,
                    availableSeats: event.availableSeats
                }
            };
        });

        return response.status(200).json(responseData);
        
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (request, response) => {
    try {
        // Extract the bookingId parameter from the request URL
        const { bookingId } = request.params;

        // Fetch booking details from the database using the bookingId
        const booking = await Booking.findById(bookingId);

        // Check if the booking exists
        if (!booking) {
            return response.status(404).json({ message: 'Booking not found.' });
        }

        // Fetch event details related to the booking
        const event = await Event.findById(booking.eventId);

        // Update available seats in the event
        event.availableSeats += booking.quantity;

        // Save the updated event details
        await event.save();

        // Delete the booking
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        
        if (!deletedBooking) {
            return response.status(404).json({ message: 'Booking not found.' });
        }

        // Return success response
        return response.status(200).json({ message: 'Booking cancelled successfully.' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return response.status(500).json({ message: 'Internal server error.' });
    }
};