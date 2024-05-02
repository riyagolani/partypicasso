import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        // Handle error as needed
      }
    };
    fetchEvent();
  }, [id, token]);

  const payment = (e) => {
    e.preventDefault();
    navigate("/bookingdetails");
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="h-screen flex justify-center items-center" style={{ marginTop: "-30px" }}>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
          <img src={event.img} alt="" className="h-44 w-44 rounded-full" />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <p className="text-xl font-bold">{event.name}</p>
          <p>
            {formattedDate} {event.time}
          </p>
          <p className="font-semibold">{event.price}</p>
          <p>{event.description}</p>

          <button className="bg-neutral-700 text-white text-l w-80 px-4 py-2 rounded" onClick={payment}>
            Book this Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
