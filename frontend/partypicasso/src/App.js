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
import BookingList from "./components/Events/BookingList";

function App() {
  return (
    <>
      <div className="main-div">
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<WeLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<SignOutPage />} />
            <Route path="/welogin" element={<WeLogin />} />
            <Route path="/dashboard" element={<UserProtectedRoute><Dashboard /></UserProtectedRoute>} />
            <Route path="/chat" element={<UserProtectedRoute><Chat /></UserProtectedRoute>} />
            <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
            <Route path="/eventdetails/:id" element={<EventDetails />} />
            <Route path="/bookingdetails/:eventId" element={<UserProtectedRoute><BookingDetails /></UserProtectedRoute>} />
            <Route path="/bookings" element={<UserProtectedRoute><BookingList/></UserProtectedRoute>}/>
            <Route path="/hostform" element={<HostProtectedRoute><HostForm /></HostProtectedRoute>} />
            <Route path="/eventcreatedpage" element={<HostProtectedRoute><EventCreatedPage /></HostProtectedRoute>} />
            <Route path="/hostdashboard" element={<HostProtectedRoute><HostDashboard /></HostProtectedRoute>} />
            {/* <Route path="/:id/details" element={<HostProtectedRoute><EventDetails /></HostProtectedRoute>} /> */}
            <Route path="/admindashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/admineventcard" element={<AdminProtectedRoute><AdminEventCard /></AdminProtectedRoute>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
