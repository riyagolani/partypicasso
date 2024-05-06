import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultimage from "../../Images/default.png";
import { formatDate, formatTime } from "../utility/Utility.js";
import { Doughnut } from "react-chartjs-2";
import FinancialReportPopup from "./FinancialReportPopup"; // Import the FinancialReportPopup component
import "chart.js/auto"; // Import required chart types
import "./EventDetails.css"; // Import your CSS file containing modal styles

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [soldSeats, setSoldSeats] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
        let money =
          (response.data.totalSeats - response.data.availableSeats) *
          response.data.price;
        setSoldSeats(response.data.totalSeats - response.data.availableSeats);
        setRevenue(money);
      } catch (error) {
        console.error("Error fetching event:", error);
        // Handle error as needed
      }
    };
    fetchEvent();
  }, [id, token]);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const payment = (e) => {
    e.preventDefault();
    navigate(`/bookingdetails/${id}`); // Navigate to booking details page with event ID
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ marginTop: "-20px" }}
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">
        <div className="h-80 w-80 rounded-t-xl bg-orange-900 flex justify-center items-center">
          <img
            src={event.img || defaultimage}
            alt=""
            className="h-60 w-60 rounded"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <p className="text-xl font-bold">{event.name}</p>
          <p>
            {event.date && formatDate(event.date)}{" "}
            {event.startTime && formatTime(event.startTime)}
          </p>
          <p className="font-semibold">${event.price}</p>
          <p>{event.description}</p>
          <p>
            Available Seats: <b>{event.availableSeats}</b>
          </p>
          {userInfo.data.role === "host" && (
            <>
              <button className="btn" onClick={handleShowPopup}>
                Financial Report
              </button>
              {showPopup && (
                <FinancialReportPopup
                  revenue={revenue}
                  price={event.price}
                  soldSeats={soldSeats}
                  availableSeats={event.availableSeats}
                  onClose={handleClosePopup}
                />
              )}
            </>
          )}
          {userInfo.data.role === "user" && event.availableSeats && (
            <button
              className="bg-neutral-700 text-white text-l w-80 px-4 py-2 rounded"
              onClick={payment}
            >
              Book this Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
