import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import hostdashboardImg from "../../Images/hostdashboard_img.jpg"; // Import the image
import "./HostDashboard.css";

const HostDashboard = () => {
  const appliedEvents = [
    // Event data
    { id: 1, name: "Event 1", status: "Pending" },
    { id: 2, name: "Event 2", status: "Approved" },
    { id: 3, name: "Event 3", status: "Rejected" },
  ];

  return (
    <div className="hostdashboard-container-bg">
      <div className="hostdashboard-container">
        <div className="hostdashboard-card card">
          <div className="hostdashboard-card-body card-body">
            <h1 className="hostdashboard-card-title card-title">
              Host Dashboard
            </h1>
            <hr className="hostdashboard-divider" />
            <div className="hostdashboard-image-container">
              <img
                src={hostdashboardImg}
                alt="Host Dashboard"
                className="hostdashboard-image"
              />
              <h2 className="image-text">Welcome to your Dashboard</h2>
            </div>
            <div className="hostdashboard-subtitle">
              <p>Ready to Register your Event with us !!</p>
              <p>Manage your events and registrations here.</p>
              <Link to="/hostform" className="btn btn-primary mt-4">
                Register Event
              </Link>
            </div>
            <h2 className="hostdashboard-events-title">Applied Events</h2>
            <div className="hostdashboard-event-list event-list">
              {appliedEvents.length === 0 ? (
                <p>No events applied yet</p>
              ) : (
                appliedEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/eventdetails/${event.id}`}
                    className="event-link"
                  >
                    <EventCard event={event} />
                  </Link>
                  //   <Link key={event.id} to={`/eventdetails`} className="event-link">
                  //   <EventCard event={event} />
                  // </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
