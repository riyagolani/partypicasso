import Navigationbar from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../.././App.css';

export default function chat(){
    return (
        <div className='flex h-screen'>
            <div className='bg-blue-100 w-1/3'>left</div>
            <div className='bg-blue-300 w-2/3'>right</div>
        </div>
  
    )
}