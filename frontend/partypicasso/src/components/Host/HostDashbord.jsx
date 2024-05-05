import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import hostdashboardImg from "../../Images/hostdashboard_img.jpg"; // Import the image
import axios from "axios";

const SERVER_ROUTE = "http://localhost:5555/events/";

const HostDashboard = () => {
  const [eventRequests, setEventRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const fetchEventRequests = async () => {
      try {
        const response = await axios.get(`${SERVER_ROUTE}getallrequests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEventRequests();
  }, []);

  return (
    <div className="admindashboard-container-bg">
      <div className="admindashboard-container">
        <div className="admindashboard-card card">
          <div className="admindashboard-card-body card-body">
            <h1 className="admindashboard-card-title card-title">
              Host Dashboard
            </h1>
            <hr className="admindashboard-divider" />
            <div className="admindashboard-image-container">
              <img
                src={hostdashboardImg}
                alt="Host Dashboard"
                className="admindashboard-image"
              />
              <h2 className="image-text">Welcome to your Dashboard</h2>
            </div>
            <div className="admindashboard-subtitle">
              <p>Ready to Register your Event with us !!</p>
              <p>Manage your events and registrations here.</p>
            </div>
            <h2 className="admindashboard-events-title">
              Registered Event Requests
            </h2>
            <div className="hostdashboard-event-list event-list">
              {loading ? (
                <p>Loading...</p>
              ) : eventRequests.length === 0 ? (
                <p>No event requests applied yet</p>
              ) : (
                eventRequests.map((request, index) => (
                  <Link
                    key={request._id}
                    to={`/eventdetails/${request.eventId}`}
                    className="event-link"
                  >
                    <EventCard eventRequest={request} sequenceId={index + 1} />
                  </Link>
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
