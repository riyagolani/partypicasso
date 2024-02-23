import Navigationbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Chat from "./components/Chat/chat"


function App() {
  return (
    <div className='main-div'>
      <Navigationbar />
      <Chat />
    </div>
  );
}

export default App;
