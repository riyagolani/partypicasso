import React from "react";
import { useNavigate } from "react-router-dom";

const EventRegisteredPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#b3d1c0", minHeight: "100vh" }}
    >
      <div
        className="card bg-light shadow"
        style={{ width: "60%", maxWidth: "800px", padding: "40px" }}
      >
        <div className="card-body text-center">
          <h1 className="mb-4">Your Event Has Been Registered!</h1>
          <p className="lead">
            Congratulations! Your event has been successfully registered.
          </p>
          <p>You can now view the status of your event on your dashboard.</p>
          <button
            className="btn mt-3"
            style={{
              backgroundColor: "#b3d1c0",
              border: "none",
              outline: "none",
            }}
            onClick={handleSubmit}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegisteredPage;
