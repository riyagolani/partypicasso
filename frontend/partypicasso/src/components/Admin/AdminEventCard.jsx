import React, { useState } from "react";
import "./AdminEventCard.css";

const AdminEventCard = ({ eventRequest, onAccept, onReject, imageUrl }) => {
  // Destructure eventRequest object and provide default values for properties
  const { _id, status, reasonForRejection } = eventRequest;
  const { name, date, description } = eventRequest.eventId;
  const { username: hostName, email: hostEmail } = eventRequest.hostId;

  // Format date string
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // State to store the reason for rejection
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    // Call the onReject function with the event ID and the reason for rejection
    onReject(_id, rejectionReason);
    // Reset the rejectionReason state
    setRejectionReason("");
  };

  // Determine the background color based on the status
  let backgroundColor;
  if (status === "rejected") {
    backgroundColor = "bg-red-100";
  } else if (status === "accepted") {
    backgroundColor = "bg-green-100";
  } else {
    backgroundColor = "bg-white";
  }

  return (
    <div className={`admin-event-card rounded-lg shadow-md p-4 mb-4 ${backgroundColor}`}>
      <div className="event-image-container mb-4">
        <img src={imageUrl} alt={name} className="admin-event-image rounded" />
      </div>
      <div className="eventRequest-details">
        <p className="text-xs text-gray-500 mb-2">
          Current Request Status: {status}
        </p>
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-sm mb-2">{description}</p>
        <p className="text-sm mb-2">On {formattedDate}</p>
        <p className="text-sm mb-2">Hosted By: {hostName}</p>
        <p className="text-sm mb-2">Contact: {hostEmail}</p>
        {status === "pending" && (
          <div className="reason-for-rejection mb-2">
            <input
              type="text"
              placeholder="Reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        )}
        {(status !== "pending" && status !== "accepted") && (
          <p className="text-xs text-gray-500 mb-2">
            Reason for Rejection: {reasonForRejection || "None"}
          </p>
        )}
      </div>

      <div className="action-buttons mt-4">
        {status === "pending" && (
          <>
            <button
              className={`mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${status !== "pending" && "bg-gray-400 cursor-not-allowed"}`}
              onClick={() => status === "pending" && onAccept(_id)}
              disabled={status !== "pending"}
            >
              Accept
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${status !== "pending" && "bg-gray-400 cursor-not-allowed"}`}
              onClick={() => status === "pending" && handleReject()}
              disabled={status !== "pending"}
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEventCard;
