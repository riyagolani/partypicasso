import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import admindashboardImg from "../../Images/admindashboard_image.jpg";
import AdminEventCard from "./AdminEventCard.jsx";
import axios from "axios";
const SERVER_ROUTE = "http://localhost:5555/admin/";
const AdminDashboard = () => {
  const [requestedEvents, setRequestedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const fetchEventRequests = async () => {
      try {
        const response = await axios.get(`${SERVER_ROUTE}event-requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequestedEvents(response.data);
        setLoading(false);
        console.log(response.data); // Log eventRequests object to the console
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEventRequests();
  }, []);

  // Function to handle event acceptance
  const handleAccept = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${SERVER_ROUTE}event-requests/${eventId}`,
        {
          status: "accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the requestedEvents state to reflect the changes
      setRequestedEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, status: "accepted" } : event
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleReject = async (eventId, reasonForRejection) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${SERVER_ROUTE}event-requests/${eventId}`,
        {
          status: "rejected",
          reasonForRejection: reasonForRejection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the requestedEvents state to reflect the changes
      setRequestedEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, status: "rejected" } : event
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="admindashboard-container-bg">
      <div className="admindashboard-container">
        <div className="admindashboard-card card">
          <div className="admindashboard-card-body card-body">
            <h1 className="admindashboard-card-title card-title">
              Admin Dashboard
            </h1>
            <hr className="admindashboard-divider" />
            <div className="admindashboard-image-container">
              <img
                src={admindashboardImg}
                alt="Admin Dashboard"
                className="Admindashboard-image"
              />
              <h2 className="image-text">Welcome to your Dashboard</h2>
            </div>
            <div className="admindashboard-subtitle">
              <p>Help Host in their events!</p>
              <p>Manage requested events here.</p>
            </div>
            <h2 className="admindashboard-events-title">Requested Events</h2>
            <div className="hostdashboard-event-list event-list">
              {requestedEvents.map((eventrequest) => (
                <div key={eventrequest._id}>
                  <AdminEventCard
                    key={eventrequest._id}
                    eventRequest={eventrequest} // Pass the entire event object as a prop
                    onAccept={handleAccept} // Pass onAccept function if needed
                    onReject={handleReject} // Pass onReject function if needed
                    imageUrl={admindashboardImg} // Pass imageUrl if needed
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
