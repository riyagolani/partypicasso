import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import SliderComponent from "./EventSlider";
import axios from "axios";

function Dashboard() {
  const [category, setCategory] = useState("");
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
        <select id="category" onChange={setCategoryChange} value={parseInt(category)}>
                <option value="0">Select Category</option>
                <option value="1">Party</option>
                <option value="2">Business</option>
                <option value="3">Education</option>
                <option value="4">Gathering</option>
                <option value="5">Show</option>
        </select>
      </div>
      <SliderComponent apiUrl={`${categoryApiUrl}${category}`} />
      <Footer />
    </>
  );
}

export default Dashboard;
