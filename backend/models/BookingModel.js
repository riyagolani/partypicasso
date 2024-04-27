import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    confirmationSent: {
        type: Boolean,
        default: false
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
