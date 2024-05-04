// HostDashboard.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import hostdashboardImg from "../../Images/hostdashboard_img.jpg"; // Import the image
import axios from "axios";

const HostDashboard = () => {
  const [eventRequests, setEventRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const userinfo = localStorage.getItem('userInfo');

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const fetchEventRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/getallrequests`, {
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
    <div className="hostdashboard-container-bg">
      <div className="hostdashboard-container">
        
        <div className="flex items-center justify-center mb-8">
          <img
            src={hostdashboardImg}
            alt="Host Dashboard"
            className="hostdashboard-image"
          />
          
        
        </div>
        <div className="text-center mb-8">

        <h2 className="text-5xl text-white mb-4">Welcome to your Dashboard </h2>
          <p>Ready to Register your Event with us !!</p>
          <p>Manage your events and registrations here.</p>
          <Link to="/hostform" className="btn btn-primary mt-4">
            Register Event
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Registered Event Requests</h2>
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
  );
};

export default HostDashboard;
