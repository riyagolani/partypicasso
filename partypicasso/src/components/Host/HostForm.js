import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HostForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventMode: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    eventDate: '',
    eventTime: '',
    bookingCharge: '',
    capacity: '',
    category: '' 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => { 
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formDataString = `
    //   Event Name: ${formData.eventName}
    //   Description: ${formData.description}
    //   Event Mode: ${formData.eventMode}
    //   Street Address: ${formData.streetAddress}
    //   City: ${formData.city}
    //   State: ${formData.state}
    //   ZIP Code: ${formData.zipCode}
    //   Event Date: ${formData.eventDate}
    //   Event Time: ${formData.eventTime}
    //   Booking Charge: ${formData.bookingCharge}
    //   Capacity: ${formData.capacity}
    //   Category: ${formData.category}
    // `;
    // alert(formDataString);
    navigate('/EventCreatedPage');
  };

  return (
    <div className="container-hf d-flex justify-content-center align-items-center" style={{ backgroundColor: '#b3d1c0', height: '100vh', textAlign: 'left' }}>
      <div className="card-container-hf" style={{ width: '800px', maxHeight: '70%', overflowY: 'auto' }}>
        <div className="card-hf" style={{ width: '100%', padding: '30px', borderRadius: '20px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
          <div className="card-body-hf">
            <h5 className="title h2 mb-4" style={{ textAlign: 'center', color: '#343a40' }}>Host Event Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="description">Description of Event</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  style={{ minHeight: '100px' }}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Event Mode:</label><br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eventMode"
                    id="inPerson"
                    value="In-person"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="inPerson">In-person</label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eventMode"
                    id="online"
                    value="Online"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="online">Online</label>
                </div>
                <div className="form-check form-check-inline mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eventMode"
                    id="hybrid"
                    value="Hybrid"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  required
                />
              </div>
              <div className="form-row justify-content-center mt-3">
                <div className="form-group col-md-4">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="form-group col-md-4 mt-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div className="form-group col-md-4 mt-3">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="eventTime">Event Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="eventTime"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="bookingCharge">Booking Charge</label>
                <input
                  type="number"
                  className="form-control"
                  id="bookingCharge"
                  name="bookingCharge"
                  value={formData.bookingCharge}
                  onChange={handleChange}
                  placeholder="Enter booking charge in USD"
                  min="0"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Enter capacity"
                  min="0"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Music Concerts">Music Concerts</option>
                  <option value="Party">Party</option>
                  <option value="Educational Workshop">Educational Workshop</option>
                  <option value="Business Seminar">Business Seminar</option>
                  <option value="Comedy Show">Comedy Show</option>
                </select>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn mt-4">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostForm;
