import React, { useState } from "react";
import "./AdminDashboard.css";
import admindashboardImg from "../../Images/admindashboard_image.jpg";
import AdminEventCard from "./AdminEventCard.jsx";

const AdminDashboard = () => {
    // Sample event request data (assuming it's an array of objects)
    const [requestedEvents, setRequestedEvents] = useState([
        { id: 1, name: "Event 1", date: "2024-05-01", description: "Description of Event 1", hostName: "Host 1", hostId: 101 },
        { id: 2, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
        { id: 3, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
        { id: 4, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
        { id: 5, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
        { id: 6, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
        { id: 7, name: "Event 2", date: "2024-05-10", description: "Description of Event 2", hostName: "Host 2", hostId: 102 },
    ]);

    // Function to handle event acceptance
    const handleAccept = (eventId) => {
        // Logic to accept event request
        console.log("Event accepted with ID:", eventId);
        // Update requested events after accepting
        // For now, let's assume the event is removed from the list after accepting
        setRequestedEvents(requestedEvents.filter(event => event.id !== eventId));
    };

    // Function to handle event rejection
    const handleReject = (eventId) => {
        // Logic to reject event request
        console.log("Event rejected with ID:", eventId);
        // Update requested events after rejection
        // For now, let's assume the event is removed from the list after rejection
        setRequestedEvents(requestedEvents.filter(event => event.id !== eventId));
    };

    return (
        <div className="admindashboard-container-bg">
            <div className="admindashboard-container">
                <div className="admindashboard-card card">
                    <div className="admindashboard-card-body card-body">
                        <h1 className="admindashboard-card-title card-title">Admin Dashboard</h1>
                        <hr className="admindashboard-divider" />
                        <div className="admindashboard-image-container">
                            <img src={admindashboardImg} alt="Admin Dashboard" className="Admindashboard-image" />
                            <h2 className="image-text">Welcome to your Dashboard</h2>
                        </div>
                        <div className="admindashboard-subtitle">
                            <p>Help Host in their events!</p>
                            <p>Manage requested events here.</p>
                        </div>
                        <h2 className="admindashboard-events-title">Requested Events</h2>
                        <div className="hostdashboard-event-list event-list">
                            {requestedEvents.map(event => (
                                <AdminEventCard 
                                    key={event.id}
                                    event={event}
                                    onAccept={handleAccept}
                                    onReject={handleReject}
                                    imageUrl={admindashboardImg} // Pass small size event image URL
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
