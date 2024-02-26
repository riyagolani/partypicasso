import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    userType: 'user', // Default to user type
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation for password and confirm password match here
    navigate('/weLogin');
  };

  return (
    <div className="container-signup d-flex justify-content-center align-items-center">
      <div className="card-container-signup">
        <div className="card-body-signup">
          <h5 className="title-signup h2 mb-4">Signup</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                className="form-control"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="host">Host</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn mt-4">Signup</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/welogin">Login</Link></p> {/* Link to the login page */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
