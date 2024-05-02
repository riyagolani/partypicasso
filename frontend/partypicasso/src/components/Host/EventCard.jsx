import React from "react";
import "./EventCard.css";

const EventCard = ({ event, sequenceId }) => {
    const name = event.name;

  let statusText = event.proposalStatus;
  let statusColor;

  switch (event.proposalStatus) {
    case "pending":
      statusText = "pending";
      statusColor = "#ffc107"; // Yellow
      break;
    case "accepted":
      statusText = "accepted";
      statusColor = "#28a745"; // Green
      break;
    case "rejected":
      statusText = "rejected";
      statusColor = "#dc3545"; // Red
      break;
    default:
      statusText = "Unknown";
      statusColor = "#6c757d"; // Gray
  }

  return (
    <div className="event-card">
      <h5 className="event-card-id">{sequenceId}</h5>
      <h4 className="event-card-name">{name}</h4>
      <p className="event-card-status" style={{ color: statusColor }}>
        {statusText}
      </p>
      <p className="event-card-id">{sequenceId}</p>
    </div>
  );
};

export default EventCard;
