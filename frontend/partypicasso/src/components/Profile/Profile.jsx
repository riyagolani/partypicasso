import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [editUser, seteditUser] = useState({
    user_id: userInfo.data._id,
    username: userInfo.data.username,
    email: userInfo.data.email,
    contact: userInfo.data.contact,
    interest: [
      { label: "Party", value: "Party" },
      { label: "Seminar", value: "Seminar" },
      { label: "Concert", value: "Concert" },
    ],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeInterest = (selectedOptions) => {
    seteditUser((prevData) => ({
      ...prevData,
      interest: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("clicked here");
    e.preventDefault();
    console.log("Edited", editUser);

    try {
      const response = await axios.put("http://localhost:5555/user/profile", {
        editUser,
      });
      const success = response.status === 200;
      localStorage.setItem("userInfo", JSON.stringify(response));
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
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
                value={editUser.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                value={editUser.email}
                onChange={handleChange}
              />
              {/* <label htmlFor="password">Password</label> 
               <input
                type="password"
                className="form-control mb-3"
                name="password"
                value={editUser.password}
                onChange={handleChange}
              /> */}
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                className="form-control mb-3"
                name="contact"
                value={editUser.contact}
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
                value={editUser.interest}
                onChange={handleChangeInterest}
              />
              <label htmlFor="url">Profile Photo</label>
              {/* <input
                type="url"
                className="form-control mb-3"
                name="url"
                value={editUser.url}
                onChange={handleChange}
              /> */}
              <div className="photo-container">
                {editUser.url && <img src={editUser.url} alt="Profile" />}
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
