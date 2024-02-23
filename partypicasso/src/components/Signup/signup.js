import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
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
    navigate('/dashboard');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: '#b3d1c0', height: '100%', textAlign: 'left' }}>
      <div className="card-container" style={{ width: '70%', marginTop:"120px", padding: '100px', borderRadius: '20px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
        <div className="card-body">
          <h5 className="title h2 mb-4" style={{ textAlign: 'center', color: '#343a40' }}>Signup</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mt-3">
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
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn mt-4" style={{ background: '#b3d1c0' }}>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
