import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hostform.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
    image: null, // Include image in formData
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set the event mode and clear address fields if event mode is "online"
    if (name === "eventMode" && value === "online") {
      setFormData({
        ...formData,
        eventMode: value,
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: parseInt(e.target.value), // Parse the selected value to an integer
    });
  };

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];

  //   // Update formData with selected image
  //   setFormData({
  //     ...formData,
  //     image: selectedImage,
  //   });
  // };

  const submitEventProposal = async (formData) => {
    try {
      // const user = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Append image file separately if it exists
      // if (formData.image) {
      //   formDataToSend.append('image', formData.image);
      // }

      const response = await axios.post(
        "http://localhost:5555/events/proposal",
        {
          name: formData.eventName,
          description: formData.description,
          date: formData.eventDate,
          location: {
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          mode: formData.eventMode,
          startTime: formData.eventTime,
          duration: formData.duration,
          onlineLink: formData.onlineLink,
          category: parseInt(formData.category),
          price: parseFloat(formData.bookingCharge),
          totalSeats: parseInt(formData.capacity),
        }
      );
      return response.data; // Assuming the API returns the newly created event data
    } catch (error) {
      throw error; // Throw the error to be caught by the caller
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // alert(JSON.stringify(formData));
      const eventData = await submitEventProposal(formData);
      const eventId = eventData._id;
      // alert(`Event proposal submitted successfully. Event ID: ${eventId}`);
      navigate("/eventcreatedpage");
    } catch (error) {
      console.error("Error submitting event proposal:", error);
      // Handle error
    }
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
                  value="inPerson"
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
                  value="online"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="online">
                  online
                </label>
                <input
                  className="form-check-input ml-3 mr-1 mt-3"
                  type="radio"
                  name="eventMode"
                  id="hybrid"
                  value="hybrid"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="hybrid">
                  Hybrid
                </label>
              </section>
              {formData.eventMode !== "online" && (
                <>
                <div>
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
                </>
              )}
            </div>
            <div className="col-lg-6">
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
                <option value="1">Party</option>
                <option value="2">Business</option>
                <option value="3">Education</option>
                <option value="4">Gathering</option>
                <option value="5">Show</option>
              </select>

              <label htmlFor="duration">Duration (in minutes)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter duration in minutes"
                min="0"
                required
              />
              {formData.eventMode === "online" && (
                <>
                <div>
                  <label htmlFor="onlineLink">Event Link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="onlineLink"
                    name="onlineLink"
                    value={formData.onlineLink}
                    onChange={handleChange}
                    placeholder="Enter zoom/google meet link including password"
                    required
                  />
                </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="form-group">
            <label htmlFor="eventImage">Event Image</label>
            <input
              type="file"
              className="form-control"
              id="eventImage"
              name="eventImage"
              onChange={handleImageChange}
              required
            />
          </div> */}
          {/* Image preview */}
          {/* {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Event"
              className="mt-3 "
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          )} */}
          <div className="mt-4">
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
