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
    profilePicture: null,
    profilePictureName: "",
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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
      profilePictureName: e.target.files[0].name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("profilePicture", formData.profilePicture);
      // Make your Axios request to upload the file here
      // Example:
      // const response = await axios.post("/upload-profile-picture", formDataToUpload);
      navigate("/weLogin");
    } catch (error) {
      console.error("Error", error);
    }
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
              <label htmlFor="profilePicture">Upload Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="form-control mb-3"
                onChange={handleFileChange}
              />
              <div className="photo-container">
                {formData.profilePictureName && (
                  <p>{formData.profilePictureName}</p>
                )}
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
