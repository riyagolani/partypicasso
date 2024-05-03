import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import hostdashboardImg from "../../Images/hostdashboard_img.jpg"; // Import the image
import "./HostDashboard.css";
import axios from "axios";

const HostDashboard = () => {

  const [Events, setEvents] = useState([]);
  const [EventRequests, setEventRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/getallrequests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventRequests(response.data);
        setLoading(false);
        console.log(response.data); // Log eventRequests object to the console
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

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
            <h2 className="hostdashboard-events-title">Registered Event Requests</h2>
            <div className="hostdashboard-event-list event-list">
              {EventRequests.length === 0 ? (
                <p>No event requests applied yet</p>
              ) : (
                Events.map((event, index) => (
                  <Link
                    key={event._id}
                    to={`/${event._id}/details`}
                    className="event-link"
                  >
                    <EventCard event={event} sequenceId={index + 1}/>
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
