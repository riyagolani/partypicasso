import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EventsCategory from './components/EventsCategory';
import EventsLocation from './components/EventsLocation';
import Navigationbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div className='main-div'>
      <Navigationbar />
      <Hero />
      <EventsCategory />
      <EventsLocation />
      <Footer />
    </div>
  );
}

export default App;
