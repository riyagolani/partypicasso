import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  });

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
  location: {
    type: addressSchema,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the UserModel
  },
  registeredAttendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the UserModel
  }],
  totalSeats: {
    type: Number,
    required: true,
  },
  chatId: {
    type: String, // Reference to the group chat for this event
  },
  proposalStatus: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'], // Proposal status can be one of these values
    default: 'pending', // Default value if not specified
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
