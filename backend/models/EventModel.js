import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  });

  const CategoryEnum = {
    Party: 1,
    Business: 2,
    Education: 3,
    Gathering: 4,
    Show: 5,
  };

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Assuming the start time will be stored as a string (e.g., "10:00 AM")
  },
  duration: {
    type: Number, // Duration in minutes
  },
  location: {
    type: addressSchema,
  },
  mode: {
    type: String,
    enum: ['inPerson', 'online', 'hybrid'],
    default: 'inPerson',
  },
  onlineLink: {
    type: String, // Optional link for online or hybrid events
  },
  category: {
    type: Number,
    enum: Object.values(CategoryEnum),
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  registeredAttendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  totalSeats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    default: function () {
      return this.totalSeats; // Set availableSeats to the value of totalSeats by default
    },
  },
  chatId: {
    type: String,
  },
  proposalStatus: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending',
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
