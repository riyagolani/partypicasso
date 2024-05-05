import React, { useState, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProofileLogo from "../../Images/userProfile.png";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [editUser, seteditUser] = useState({
    user_id: userInfo.data._id,
    username: userInfo.data.username,
    email: userInfo.data.email,
    contact: userInfo.data.contact,
    url: "https://thumbs.dreamstime.com/b/isolated-white-portrait-happy-cheerful-guy-bearded-man-programmer-coder-profile-user-vector-cartoon-character-avatar-198845686.jpg",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const newPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser.newPassword !== editUser.confirmPassword) {
        // Display alert message
        alert("New password and confirm password do not match");
        // Focus on the new password field
        newPasswordRef.current.focus();
        return;
      }
      const updateProfile ={
        username:editUser.username,
        email:editUser.email,
        contact:editUser.contact,
        newPassword:editUser.newPassword,
      }
      // alert(JSON.stringify(editUser));
      const response = await axios.put("http://localhost:5555/user/profile", {
        editUser,
      });
      const success = response.status === 200;
      localStorage.setItem("userInfo", JSON.stringify(response));
      // if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
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
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                className="form-control mb-3"
                name="contact"
                value={editUser.contact}
                onChange={handleChange}
              />
              {/* Password Fields */}
              {showPasswordFields && (
                <>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    ref={newPasswordRef}
                    type="password"
                    className="form-control mb-3"
                    name="newPassword"
                    value={editUser.newPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control mb-3"
                    name="confirmPassword"
                    value={editUser.confirmPassword}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="col-lg-6">
              <div className="photo-container text-center">
                {/* Profile Picture */}
                {editUser.url && <img src={editUser.url} alt="Profile" className="mb-3" />}

                {/* Button to toggle password fields */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={togglePasswordFields}
                >
                  Change Password
                </button>
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
