import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    password: "********",
    phone_number: "1234567890",
    interest: [
      { label: "Party", value: "Party" },
      { label: "Seminar", value: "Seminar" },
      { label: "Concert", value: "Concert" },
    ],
    url: "https://thumbs.dreamstime.com/b/isolated-white-portrait-happy-cheerful-guy-bearded-man-programmer-coder-profile-user-vector-cartoon-character-avatar-198845686.jpg",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeInterest = (selectedOptions) => {
    setUserData((prevData) => ({
      ...prevData,
      interest: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated user data (you can add API call here)
    console.log("Updated user data:", userData);
    // Redirect to profile page or any other page as needed
    navigate("/profile");
  };

  return (
    <div className="profile-container h-screen d-flex justify-content-center align-items-center">
      <div className="profile p-5">
        <h1 className="text-center mb-4">User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control mb-3"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                className="form-control mb-3"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Interest</label>
              <Select
                isMulti
                name="interest"
                options={[
                  { label: "Party", value: "Party" },
                  { label: "Seminar", value: "Seminar" },
                  { label: "Concert", value: "Concert" },
                  { label: "Heckathon", value: "Heckathon" },
                  { label: "Music", value: "Music" },
                  { label: "Theatre", value: "Theatre" },
                ]}
                className="mb-3"
                value={userData.interest}
                onChange={handleChangeInterest}
              />
              <label htmlFor="url">Profile Photo</label>
              {/* <input
                type="url"
                className="form-control mb-3"
                name="url"
                value={userData.url}
                onChange={handleChange}
              /> */}
              <div className="photo-container">
                {userData.url && <img src={userData.url} alt="Profile" />}
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
