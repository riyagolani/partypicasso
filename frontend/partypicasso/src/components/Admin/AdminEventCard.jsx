import React from "react";
import "./AdminEventCard.css";

const AdminEventCard = ({ event, onAccept, onReject, imageUrl }) => {
    return (
        <div className="admin-event-card">
            <div className="admin-event-details">
                <img src={imageUrl} alt={event.name} className="admin-event-image" />
                <h2>{event.name}</h2>
                <p>Date: {event.date}</p>
                <p>Description: {event.description}</p>
                <p>Host: {event.hostName}</p>
                <p>Host ID: {event.hostId}</p>
            </div>
            <div className="action-buttons">
                <button onClick={() => onAccept(event.id)}>Accept</button>
                <button onClick={() => onReject(event.id)}>Reject</button>
            </div>
        </div>
    );
};

export default AdminEventCard;
