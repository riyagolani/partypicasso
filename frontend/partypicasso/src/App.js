import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Navigationbar from "./components/Navbar/Navbar";
import HostForm from "./components/Host/HostForm";
import EventCreatedPage from "./components/Host/EventCreatedPage";
import HostDashboard from "./components/Host/HostDashbord";
import Chat from "./components/Chat/chat";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/signup";
import WeLogin from "./components/Login/weLogin";
import Profile from "./components/Profile/Profile";
import EventDetails from "./components/Events/EventDetails";
import BookingDetails from "./components/Events/BookingDetails";

function App() {
  return (
    <>
      <div className="main-div">
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<WeLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/HostForm" element={<HostForm />} />
            <Route path="/EventCreatedPage" element={<EventCreatedPage />} />
            <Route path="/HostDashbord" element={<HostDashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/welogin" element={<WeLogin />} />
            <Route path="/eventdetails" element={<EventDetails />} />
            <Route path="/bookingdetails" element={<BookingDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
