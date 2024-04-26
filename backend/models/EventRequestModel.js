import mongoose from 'mongoose';

const eventRequestSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event model
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    reasonForRejection: {
        type: String,
        default: ''
    }
});

const EventRequest = mongoose.model('EventRequest', eventRequestSchema);

export default EventRequest;
