import React, { useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import  {registerUser}  from "../../features/auth/authServices";
import {Link,useNavigate} from 'react-router-dom'
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData));
    navigate('/login');
   
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="registerPage">
      <h2>Register</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="box">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <div className="box">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="btnClear" type="button" onClick={handleClear}>
          Clear
        </button>
        <button className="btnRegister" type="submit" disabled={loading}>
          Register
        </button>
       <div className="navigateLogin">
         <p>Alredy register <Link to='/login'>click here!!</Link></p>
       </div>
      </form>
    </div>
  );
};

export default Register;
