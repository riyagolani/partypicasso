import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultimage from "../../Images/default.png";
import { formatDate, formatTime } from "../utility/Utility.js";

function SliderComponent({ apiUrl }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [apiUrl]); // Update data when apiUrl changes

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openDetails = (eventId) => {
    navigate(`/eventdetails/${eventId}`);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  
  // If there's only one event, render it directly
  if (data.length === 1) {
    const event = data[0];
    return (
      <div className="w-1/2 m-auto">
        <div className="mt-5">
          <div className="bg-white h-[450px] text-black rounded-xl">
            <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
              <img src={event.img || defaultimage} alt="" className="h-44 w-44 rounded-full" />
            </div>
            <div className=" flex flex-col justify-center items-center gap-4 p-4">
              <p className="text-xl font-bold">{event.name}</p>
              <p>
                {event.date && formatDate(event.date)} {event.startTime && formatTime(event.startTime)}
              </p>
              <p className="font-semibold">{event.price}</p>
              <button
                className="bg-neutral-700 text-white text-l w-40 px-5 py-1 rounded"
                onClick={() => openDetails(event._id)}
              >
                Event Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 m-auto">
      <div className="mt-5">
        {data.length === 0 ? (
          <p className="text-center">Oops, looks like no one is interested in hosting these events.</p>
        ) : (
          <Slider {...settings}>
            {data.map((d) => (
              <div className="bg-white h=[450px] text-black rounded-xl">
                <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
                  <img src={d.img || defaultimage} alt="" className="h-44 w-44 rounded-full" />
                </div>
                <div className=" flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-xl font-bold">{d.name}</p>
                  <p>
                    {d.date && formatDate(d.date)} {d.startTime && formatTime(d.startTime)}
                  </p>
                  <p className="font-semibold">{d.price}</p>
                  <button
                    className="bg-neutral-700 text-white text-l w-40 px-5 py-1 rounded"
                    onClick={() => openDetails(d._id)}
                  >
                    Event Details
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default SliderComponent;
