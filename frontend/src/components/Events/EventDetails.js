import React from "react";
import { useNavigate } from "react-router-dom";

const EventDetails = () => {
  const navigate = useNavigate();

  const payment = (e) => {
    e.preventDefault();
    navigate("/bookingdetails");
  };

  const event = {
    name: "NFT.NYC 2024",
    date: "Wed, Apr 3",
    time: "8:30 am",
    price: "$224",
    img: "./images/musicconcert.jpg",
    category: "Music Concerts",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, magna et convallis lobortis, augue purus vehicula ex, at faucibus quam mi nec mi.",
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ marginTop: "-30px" }}
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
          <img src={event.img} alt="" className="h-44 w-44 rounded-full" />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <p className="text-xl font-bold">{event.name}</p>
          <p>
            {event.date} {event.time}
          </p>
          <p className="font-semibold">{event.price}</p>
          <p>{event.description}</p>

          <button
            className="bg-neutral-700 text-white text-l w-80 px-4 py-2 rounded"
            onClick={payment}
          >
            Book this Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
