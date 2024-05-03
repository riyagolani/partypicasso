import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import SliderComponent from "./EventSlider";
import axios from "axios";

function Dashboard() {
  const [category, setCategory] = useState("Music Concerts");
  const apiUrl = "http://localhost:5555/events/";
  const categoryApiUrl = "http://localhost:5555/events/category/";

  const setCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, [category]); // Fetch data when category changes

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Hero />
      <div>
        <p>Explore all events: </p>
      </div>
      <SliderComponent apiUrl={apiUrl} />
      <div className="pt-8">
        <p>Explore events from our various categories: </p>
        <select id="category" onChange={setCategoryChange} value={category}>
          <option value="Music Concerts">Music Concerts</option>
          <option value="Party">Party</option>
          <option value="Educational Workshop">Educational Workshop</option>
          <option value="Business Seminars">Business Seminars</option>
          <option value="Comedy Shows">Comedy Shows</option>
        </select>
      </div>
      <SliderComponent apiUrl={`${categoryApiUrl}${category}`} />
      <Footer />
    </>
  );
}

export default Dashboard;
