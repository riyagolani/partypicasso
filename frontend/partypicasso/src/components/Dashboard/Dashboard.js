import EventsCategory from "./EventsCategory";
import EventsLocation from "./EventsLocation";
import Hero from "./Hero";
import Footer from "./Footer";
import axios from 'axios';
import { useEffect, useState } from "react";


function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/events')
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Hero />
      <EventsCategory />
      <EventsLocation />
      <Footer />
    </>
  );
}

export default Dashboard;
