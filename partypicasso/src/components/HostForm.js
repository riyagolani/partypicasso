import React, { useState } from 'react';

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
    capacity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataString = `
      Event Name: ${formData.eventName}
      Description: ${formData.description}
      Event Mode: ${formData.eventMode}
      Street Address: ${formData.streetAddress}
      City: ${formData.city}
      State: ${formData.state}
      ZIP Code: ${formData.zipCode}
      Event Date: ${formData.eventDate}
      Event Time: ${formData.eventTime}
      Booking Charge: ${formData.bookingCharge}
      Capacity: ${formData.capacity}
    `;
    alert(formDataString);
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert('Event hosted');
  //   console.log(formData);
  // };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card-container" style={{ width: '700px', height: '800px', overflowY: 'auto' }}>
        <div className="card" style={{ backgroundColor: '#6b9c80', width: '100%', padding: '20px' }}>
          <div className="card-body">
            <h5 className="card-title h2 text-center mb-4">Host Event Form</h5>
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
                  style={{ textAlign: 'center' }}
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
                  style={{ minHeight: '100px', textAlign: 'center' }} 
                />
              </div>
              <div className="form-group mt-3">
                <label>Event Mode:</label><br />
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eventMode"
                    id="inPerson"
                    value="In-person"
                    onChange={handleChange}
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
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div className="form-row justify-content-center mt-3">
                <div className="form-group ">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                    style={{ textAlign: 'center' }}
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
                  style={{ textAlign: 'center' }}
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
                  style={{ textAlign: 'center' }}
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
                  style={{ textAlign: 'center' }}
                  min="0" 
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
                style={{ textAlign: 'center' }}
                min="0" 
              />
              </div>
              <button type="submit" className="btn btn-primary mt-4">Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostForm;
