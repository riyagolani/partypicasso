import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  const serviceFee = 3.0;

  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    // Fetch event data when component mounts
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`http://localhost:5555/events/${eventId}`)
      .then(response => {
        setEventData(response.data);
      })
      .catch(error => {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      });
  }, [eventId]);

  const handleTicketQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setTicketQuantity(quantity >= 1 ? quantity : 1);
  };

  useEffect(() => {
    // Calculate total when ticket quantity changes
    if (eventData) {
      const ticketTotal = eventData.price * ticketQuantity;
      const total = ticketTotal + serviceFee;
      setTotal(total);
    }
  }, [ticketQuantity, eventData]);

  const confirmBooking = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post(`http://localhost:5555/events/${eventId}/book`, { quantity: ticketQuantity })
      .then(response => {
        alert("Booking Confirmed");
        navigate("/bookings");
      })
      .catch(error => {
        console.error("Error booking tickets:", error);
      if (error.response && error.response.status === 503 && error.response.data.message === "Seats not available") {
        alert("Seats are not available. Please try again later.");
      } else {
        setError("An error occurred while booking tickets.");
      }
      });
  };

  const formattedDate = eventData ? new Date(eventData.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }) : "";

  return (
    <div
      className="h-screen flex justify-center items-center bg-black-200"
      style={{ marginTop: "-30px" }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-75 rounded-xl shadow-lg p-6">
        {eventData && (
          <>
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            <p className="text-lg font-semibold">{eventData.name}</p>
            <p className="text-gray-700">{eventData.description}</p>
            <p className="text-gray-600">{eventData.category}</p>
            <p className="text-gray-600">{formattedDate}</p>
            <hr className="mt-3 border-b border-black-300" /><div className="mt-3">
              <h3 className="text-xl font-bold mb-3">Tickets</h3>
              <div className="flex justify-between items-center mb-4">
                <span>General Admission Ticket</span>
                <span>{eventData.price}</span>
                <input
                  type="number"
                  min="1"
                  value={ticketQuantity}
                  onChange={handleTicketQuantityChange} />
              </div>
              {/* Add more ticket options as needed */}
            </div>

            <hr className="my-3 border-b border-black-300" />

            <div className="mt-3">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <span>Subtotal</span>
                <span>
                  $
                  {(
                    eventData.price * ticketQuantity
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <hr className="my-3 border-b border-black-300" />

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-3 w-full"
              onClick={confirmBooking}
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
