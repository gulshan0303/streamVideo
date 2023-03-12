import React from 'react'
import './Navbar.css';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
const Navbar = () => {
  // const auth = localStorage.getItem('auth');
  // const user = JSON.parse(auth);
  const auth = useSelector((state) => state.auth?.user?.existingUser);
  console.log('auth', auth)
  // console.log('user', user?.name)
  return (
    <div className="navbar">
        <div className="logo">
            <Link to='/'>
            <h3>Stream-Video</h3>
            </Link>
        </div>
         {

         auth ? (<>
              <div className="userprofile">
                <p>{auth?.name}</p>
                <button>Logout</button>
              </div>
             
         </>) :

            <div className="navigation">
            <ul>
            <li>
                    <Link to='/upload'>Upload Video</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
          </div>
       
         }
         
    </div>
  )
}

export default Navbar