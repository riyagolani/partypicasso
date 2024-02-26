import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css'; // Import the CSS file

const Login = () => {
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get('user');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
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
    navigate('/');
  };

  return (
    <div className="container-login">
      <div className="card-container-login">
        <div className="card-body-login">
          <h1 className="title-login">{userType} Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group-login my-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mt-2"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group my-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-2"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input my-3"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label my-2" htmlFor="rememberMe">Remember Me</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn mt-3">Login</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;