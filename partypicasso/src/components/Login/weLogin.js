import React from 'react';
import { useNavigate } from 'react-router-dom';
import './weLogin.css'; // Import the CSS file
// import hostImage from './host.jpg'; // Import images for each card
// import userImage from './user.jpg';
// import adminImage from './admin.jpg';

const WeLoginPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (userType) => {
    navigate(`/login?user=${userType}`);
  };

  return (
    <div className="container">
      <h1 className="title">Who wants to Login?</h1>
      <div className="card-container">
        <div className="card host-card" onClick={() => handleCardClick('Host')}>
          {/* <img src={hostImage} alt="Host" /> */}
          <div className="card-text">
            <h2>Host</h2>
            <p>Host your events with ease.</p>
          </div>
        </div>
        <div className="card user-card" onClick={() => handleCardClick('User')}>
          {/* <img src={userImage} alt="User" /> */}
          <div className="card-text">
            <h2>User</h2>
            <p>Join events as a participant.</p>
          </div>
        </div>
        <div className="card admin-card" onClick={() => handleCardClick('Admin')}>
          {/* <img src={adminImage} alt="Admin" /> */}
          <div className="card-text">
            <h2>Admin</h2>
            <p>Manage events and users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeLoginPage;
