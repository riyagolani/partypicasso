import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    user_id: 1,
    username: "",
    email: "",
    Interest: [],
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleChange2 = (selectedOptions) => {
    setFormData((prevState) => ({ ...prevState, skill: selectedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation for password and confirm password match here
    navigate("/weLogin");
  };

  const options = [
    { label: "Party", value: "Party" },
    { label: "Seminar", value: "Seminar" },
    { label: "Concert", value: "Concert" },
    { label: "Heckathon", value: "Heckathon" },
    { label: "Music", value: "Music" },
    { label: "Theatre", value: "Theatre" },
  ];

  return (
    <div className="signup-container h-screen d-flex justify-content-center align-items-center">
      <div className="signup p-5">
        <h1 className="text-center mb-2">CREATE ACCOUNT</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                type="text"
                name="username"
                className="form-control mb-3"
                placeholder="Enter User Name"
                required={true}
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                required={true}
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mb-3"
                placeholder="Enter password"
                required={true}
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control mb-3"
                placeholder="Confirm password"
                required={true}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Interest</label>
              <Select
                isMulti
                name="interest"
                options={options}
                className="mb-3"
                value={formData.interest}
                onChange={handleChange2}
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                type="text"
                name="phone_number"
                className="form-control mb-3"
                placeholder="Enter Phone Number"
                required={true}
                value={formData.phone_number}
                onChange={handleChange}
              />
              <label htmlFor="url">Profile Photo</label>
              <input
                id="url"
                type="url"
                name="url"
                className="form-control mb-3"
                placeholder="Enter Profile Photo URL"
                required={true}
                value={formData.url}
                onChange={handleChange}
              />
              <div className="photo-container">
                {formData.url && <img src={formData.url} alt="Profile" />}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
