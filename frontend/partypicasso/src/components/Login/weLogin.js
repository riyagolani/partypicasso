import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./weLogin.css";

const WeLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      const { role } = JSON.parse(userInfo).data;
      switch (role) {
        case "host":
          navigate("/hostdashboard");
          break;
        case "user":
          navigate("/dashboard");
          break;
        case "admin":
          navigate("/admindashboard");
          break;
        default:
          break;
      }
    }
  }, [navigate]);
  const handleCardClick = (userType) => {
    navigate(`/login?user=${userType}`);
  };

  return (
    <div className="container-wl">
      <h1 className="title-wl">Who wants to Login?</h1>
      <div className="card-container-wl">
        <div
          className="card-wl host-card-wl"
          onClick={() => handleCardClick("Host")}
        >
          <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="Host" />
          <div className="card-text-wl">
            <h2>
              <u>Host</u>
            </h2>
            <p className="mt-4">Host your events with ease.</p>
          </div>
        </div>
        <div
          className="card-wl user-card-wl"
          onClick={() => handleCardClick("User")}
        >
          <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="User" />
          <div className="card-text-wl">
            <h2>
              <u>User</u>
            </h2>
            <p className="mt-4">Join events as a participant.</p>
          </div>
        </div>
        <div
          className="card-wl admin-card-wl"
          onClick={() => handleCardClick("Admin")}
        >
          <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="Admin" />
          <div className="card-text-wl">
            <h2>
              <u>Admin</u>
            </h2>
            <p className="mt-4">Manage events and users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeLogin;
