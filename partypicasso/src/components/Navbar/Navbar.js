import React from 'react';
import '../../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../Images/Logo.jpg';
import HostForm from '../Host/HostForm';
import EventCreatedPage from '../Host/EventCreatedPage';
import HostDashboard from '../Host/HostDashbord';
import Login from '../Login/Login';
import Chat from '../Chat/chat';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
<<<<<<< HEAD
import Signup from '../Signup/signup';

=======
import HostForm from '../Host/HostForm';
import EventCreatedPage from '../Host/EventCreatedPage';
import HostDashboard from '../Host/HostDashbord';
import Chat from '../Chat/chat';
import LoginForm from '../Login/Login';
>>>>>>> b531bd2481767bfe7bc4a9d67206d4ec114be8c5

function Navigationbar() {
  return (
    <Router>
      <div>
        <Navbar expand="lg" className="custom-navbar">
        <img src={Logo} alt="Blog Logo" style={{borderRadius:'50%' , marginLeft:'6px' }} />
          <Navbar.Brand>
            <Nav.Link as={Link} to={'/'} className="text-light px-3">PARTY PICASSO</Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to={'/chat'} className="text-light px-3">Group Chat</Nav.Link>
              <Nav.Link as={Link} to={'/profile'} className="text-light px-3">Profile</Nav.Link>
              <Nav.Link as={Link} to={'/HostForm'} className="text-light px-3" style={{marginRight:'10px'}}>Host Form</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element= {<Chat/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/HostForm' element={<HostForm />} />
          <Route path='/EventCreatedPage' element={<EventCreatedPage/>}/>
          <Route path='/HostDashbord' element={<HostDashboard/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
        </Routes>
      </div>
    </Router>
  );
}
function Home(){
  return <p></p>
}

function Profile() {
  return <p>My Profile</p>
}

export default Navigationbar