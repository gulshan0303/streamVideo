import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import  {login}  from "../../features/auth/authServices";
import {Link,useNavigate} from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const loginStatus = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
    navigate('/') 
    localStorage.setItem('auth',JSON.stringify(formData))
  };

  const handleClear = () => {
    setFormData({
      email: "",
      password: "", 
    });
  };

  return (
    <div className="registerPage">
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        
        <div className="box">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="box">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
       
        <button className="btnClear" type="button" onClick={handleClear}>
          Clear
        </button>
        <button className="btnRegister" type="submit" disabled={loginStatus}>
          Login
        </button>
       
       <div className="navigateLogin">
         <p>don't have account <Link to='/register'>click here!!</Link></p>
       </div>
      </form>
    </div>
  );
};

export default Login;
