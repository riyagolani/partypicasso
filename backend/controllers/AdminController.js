import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import EventRequest from "../models/EventRequestModel.js";
import Event from "../models/EventModel.js";

export const adminLogin = async (request, response) => {
  try {
    const { username, password } = request.body;
    const admin = await User.findOne({ username, role: "admin" });
    if (!admin) {
      return response.status(404).send({ message: "Admin not found" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return response.status(401).send({ message: "Invalid Credentials" });
    }
    const payload = {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    console.log("Admin has logged in!");
    return response.status(200).send({"token": token, "role": admin.role, "username": admin.username });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

// Function to get all event requests
export const getAllEventRequests = async (request, response) => {
  try {
    // Check if the user is an admin
    if (request.user.role !== "admin") {
      return response
        .status(403)
        .json({
          message: "Access forbidden: Only admins can access this resource.",
        });
    }

    // Fetch all event requests
    const eventRequests = await EventRequest.find()
      .populate("eventId")
      .populate("hostId");

    // Return the event requests
    return response.status(200).json(eventRequests);
  } catch (error) {
    console.error("Error fetching event requests:", error);
    return response.status(500).json({ message: "Internal server error." });
  }
};

// Function to accept or decline an event request
export const manageEventRequest = async (request, response) => {
  try {
    // Check if the user is an admin
    if (request.user.role !== "admin") {
      console.log("Access forbidden: Only admins can access this resource.");
      return response
        .status(403)
        .json({
          message: "Access forbidden: Only admins can access this resource.",
        });
    }

    const requestId = request.params.requestId;
    const { status, reasonForRejection } = request.body;

    // Find the event request by ID
    const eventRequest = await EventRequest.findById(requestId);
    if (!eventRequest) {
      console.log("Event request not found.");
      return response.status(404).json({ message: "Event request not found." });
    }

    // Update the status and reason for rejection (if applicable)
    eventRequest.status = status;
    if (status === "rejected") {
      eventRequest.reasonForRejection = reasonForRejection;
    }

    // Save the updated event request
    await eventRequest.save();

    // If the request is accepted or rejected, update the event's proposal status
    if (status === "accepted" || status === "rejected") {
      const eventId = eventRequest.eventId;
      const event = await Event.findById(eventId);
      if (event) {
        event.proposalStatus = status;
        await event.save();
      }
    }
    console.log("Event request updated successfully.");
    return response
      .status(200)
      .json({ message: "Event request updated successfully." });
  } catch (error) {
    console.error("Error updating event request:", error);
    return response.status(500).json({ message: "Internal server error." });
  }
};
