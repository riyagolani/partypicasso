// EventCard.js

import React, { useState, useEffect } from "react";
import "./EventCard.css";
import axios from "axios";

const EventCard = ({ eventRequest, sequenceId }) => {
  const { eventId, status, reasonForRejection } = eventRequest;
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setEventDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  let statusText = status;
  let statusColor;

  switch (status) {
    case "pending":
      statusText = "Pending";
      statusColor = "#ffc107"; // Yellow
      break;
    case "accepted":
      statusText = "Accepted";
      statusColor = "#28a745"; // Green
      break;
    case "rejected":
      statusText = "Rejected";
      statusColor = "#dc3545"; // Red
      break;
    default:
      statusText = "Unknown";
      statusColor = "#6c757d"; // Gray
  }

  return (
    <div className="event-card">
      {eventDetails && (
        <>
          <h4 className="event-card-name">{eventDetails.name}</h4>
          <p className="event-card-description">{eventDetails.description}</p>
        </>
      )}
      <p
        className="event-card-status text-lg font-bold"
        style={{ color: statusColor }}
      >
        {statusText}
      </p>
      {status === "rejected" && (
        <p
          className="event-card-rejection-reason text-sm"
          style={{ color: statusColor }}
        >
          Reason for Rejection: {reasonForRejection}
        </p>
      )}
    </div>
  );
};

export default EventCard;
