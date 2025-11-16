import React, { useState } from 'react';
import './login.css';
import axios from "../axiosInstance"; 
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [terms, setTerms] = useState(false);

  const handleRegister = async () => {
    if (!name || !number || !email || !password || !confirmPassword || !terms) {
      setMsg('Please fill in all fields!');
      return;
    }

    if (password !== confirmPassword) {
      setMsg('Passwords do not match!');
      return;
    }

    try {
      // ⭐ POST request using axiosInstance (automatically uses Railway backend URL)
      const res = await axios.post("/swiggy/register", {
        name,
        number,
        email,
        password,
        createdAt: new Date(),
      });

      const data = res.data;

      setMsg(data.msg || "Registration successful!");

      setTimeout(() => {
        window.location.href = "/swiggy/login";
      }, 1000);

    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <div className="login0">
      <h1>Register</h1>
      <div className="loginimg">
        <p>
          Already have an account? <a href="/swiggy/login">Login</a>
        </p>
        <img src="/images/Login_food.jpeg" alt="Register" />
      </div>

      <div className="Login">
        <input
          type="text"
          placeholder="Enter Full Name"
          className="mn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Phone Number"
          className="mn"
          maxLength={10}
          value={number}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setNumber(onlyNums);
          }}
        /><br />

        <input
          type="email"
          placeholder="E-mail"
          className="mn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        {/* 👁️ Password Field with Eye Animation */}
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            className="mn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={`eye-icon ${showPassword ? 'open' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>
        <br />

        {/* 👁️ Confirm Password Field with Eye Animation */}
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="mn"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setShowPasswordMessage(true)}
          />
          <span
            className={`eye-icon ${showConfirmPassword ? 'open' : ''}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            👁️
          </span>
        </div>
        <br />

        {/* ✅ Password Match Message (only after typing confirm) */}
        {showPasswordMessage && (
          <p
            style={{
              color: password === confirmPassword ? 'green' : 'red',
              fontSize: '14px',
              marginTop: '-8px',
              marginBottom: '10px'
            }}
          >
            {password === confirmPassword
              ? '✅ Passwords match'
              : '❌ Passwords do not match'}
          </p>
        )}

        <p>
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label htmlFor="terms" style={{ marginLeft: '8px' }}>
            By clicking on this, I accept the <a href="#">Terms & Conditions</a> &{' '}
            <a href="#">Privacy Policy</a>
          </label>
        </p>

        <button onClick={handleRegister} id="loginbtn">Register</button>

        <p style={{ color: msg.toLowerCase().includes('success') ? 'green' : 'red' }}>
          {msg}
        </p>
      </div>
    </div>
  );
};

export default Register;
