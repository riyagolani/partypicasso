import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hostform.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HostForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    eventMode: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    eventDate: "",
    eventTime: "",
    bookingCharge: "",
    capacity: "",
    category: "",
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
    // Add form submission logic here
    navigate("/EventCreatedPage");
  };

  return (
    <div className="hostform-container h-screen d-flex justify-content-center align-items-center">
      <div className="hostform p-5">
        <h1 className="hosttext text-center mb-2">Host Event Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                className="form-control mb-3"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />
              <label htmlFor="description">Description of Event</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={{ minHeight: "100px" }}
                required
              />
              <section className="mt-4 my-3">
                <label>Event Mode:</label>
                <input
                  className="form-check-input ml-3 mr-1 mt-3"
                  type="radio"
                  name="eventMode"
                  id="inPerson"
                  value="In-person"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="inPerson">
                  In-person
                </label>
                <input
                  className="form-check-input ml-2 mr-1 mt-3"
                  type="radio"
                  name="eventMode"
                  id="online"
                  value="Online"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="online">
                  Online
                </label>
                <input
                  className="form-check-input ml-3 mr-1 mt-3"
                  type="radio"
                  name="eventMode"
                  id="hybrid"
                  value="Hybrid"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="hybrid">
                  Hybrid
                </label>
              </section>
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
            <div className="col-lg-6">
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
                <option value="Educational Workshop">
                  Educational Workshop
                </option>
                <option value="Business Seminar">Business Seminar</option>
                <option value="Comedy Show">Comedy Show</option>
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
