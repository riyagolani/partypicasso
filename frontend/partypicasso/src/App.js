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
import SignOutPage from './components/Signout/Signout';
import WeLogin from "./components/Login/weLogin";
import Profile from "./components/Profile/Profile";
import EventDetails from "./components/Events/EventDetails";
import BookingDetails from "./components/Events/BookingDetails";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminEventCard from "./components/Admin/AdminEventCard";
import {UserProtectedRoute, HostProtectedRoute, AdminProtectedRoute} from "./ProtectedRoute";

function App() {
  return (
    <>
      <div className="main-div">
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<WeLogin />} />
            <Route path="/dashboard" element={<UserProtectedRoute><Dashboard /></UserProtectedRoute>} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
            <Route path="/HostForm" element={<HostProtectedRoute><HostForm /></HostProtectedRoute>} />
            <Route path="/EventCreatedPage" element={<HostProtectedRoute><EventCreatedPage /></HostProtectedRoute>} />
            <Route path="/HostDashboard" element={<HostProtectedRoute><HostDashboard /></HostProtectedRoute>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/signout" element={<SignOutPage />} />
            <Route path="/welogin" element={<WeLogin />} />
            <Route path="/eventdetails/:id" element={<UserProtectedRoute><EventDetails /></UserProtectedRoute>} />
            <Route path="/bookingdetails" element={<UserProtectedRoute><BookingDetails /></UserProtectedRoute>} />
            <Route path="/AdminDashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/AdminEventCard" element={<AdminProtectedRoute><AdminEventCard /></AdminProtectedRoute>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
