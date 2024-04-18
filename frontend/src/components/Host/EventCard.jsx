import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  let statusText;
  let statusColor;

  switch (event.status) {
    case "Pending":
      statusText = "Pending Approval";
      statusColor = "#ffc107"; // Yellow
      break;
    case "Approved":
      statusText = "Approved";
      statusColor = "#28a745"; // Green
      break;
    case "Rejected":
      statusText = "Rejected";
      statusColor = "#dc3545"; // Red
      break;
    default:
      statusText = "Unknown";
      statusColor = "#6c757d"; // Gray
  }

  return (
    <div className="event-card">
      <h3 className="event-card-name">{event.name}</h3>
      <p className="event-card-status" style={{ color: statusColor }}>{statusText}</p>
      {/* <p className="event-card-id">Event ID: {event.id}</p> */}
    </div>
  );
};

export default EventCard;
