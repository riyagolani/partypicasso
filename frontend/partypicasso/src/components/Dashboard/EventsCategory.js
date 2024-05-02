import React, { useState ,useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const data = [
//   {
//     name: "NFT.NYC 2024",
//     date: "Wed, Apr 3",
//     time: "8:30 am",
//     price: "$224",
//     img: "./images/musicconcert.jpg",
//     category: "Music Concerts",
//   }];


function EventsCategory() {
  const [category, setCategory] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Fetch data from API when category changes
    const fetchData = async () => {
      if (category) {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(`http://localhost:5555/events/${category}`);
          setEvents(response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchData();
  }, [category]);

  const setCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  const openDetails = (e) => {
    e.preventDefault();
    navigate("/eventdetails");
  };

  return (
    <div className="w-11/12 m-auto">
      <div>
        <p>Explore events from our various categories: </p>
        <select id="category" onChange={setCategoryChange}>
          <option>Music Concerts</option>
          <option>Party</option>
          <option>Educational Workshop</option>
          <option>Business Seminars</option>
          <option>Comedy Shows</option>
        </select>
      </div>
      {/* <p>{category}</p> */}
      <div className="mt-5">
        <Slider {...settings}>
          {events.map((d) => {
            // if (d.category == { category }) {
            return (
              <div className="bg-white h=[450px] text-black rounded-xl">
                <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
                  <img src={d.img} alt="" className="h-44 w-44 rounded-full" />
                </div>
                <div className=" flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-xl font-bold">{d.name}</p>
                  <p>
                    {d.date} {d.time}
                  </p>
                  <p className="font-semibold">{d.price}</p>
                  <button
                    className="bg-neutral-700 text-white text-l w-40 px-5 py-1 rounded"
                    onClick={openDetails}
                  >
                    Event Details
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default EventsCategory;
