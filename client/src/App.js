import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UploadVideoPage from './pages/upload/UploadVideo';
function App() {
  return (
    <div className="App">
       <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/upload' element={<UploadVideoPage/>}/>
       </Routes>
    </div>
  );
}

export default App;
