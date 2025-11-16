import React, { useState } from 'react';
import './login.css'; // import your CSS
import { useOrder } from './OrderContext';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosInstance";   // ⭐ IMPORTANT for deployment

const Login = () => {
  const {email,setEmail}=useOrder();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
const navigate = useNavigate(); 
  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setMsg('Please fill in all fields!');
      return;
    }

    try {
     const res = await axios.post(
        "/swiggy/login",
        { email, password }
      );

      const data = res.data;
      localStorage.clear();      
      localStorage.setItem("userName", data.name);

      setMsg("login successful");
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/swiggy/admin");
        } else {
          navigate("/swiggy/profile");
        }
      }, 500);

    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="login0">
      <h1>Login</h1>
      <div className="loginimg">
        <p>or <a href="/swiggy/register">create an account</a></p>
        <img src="/images/Login_food.jpeg" alt="Login" />
      </div>
      <div className="Login">
        <input
          type="email"
          placeholder="email"
          className="mn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Enter password"
          className="mn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button onClick={handleLogin} id="loginbtn">Login</button>

        <p>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        <p style={{ color: msg.includes('success') ? 'green' : 'red' }}>{msg}</p>
      </div>
    </div>
  );
};

export default Login;
