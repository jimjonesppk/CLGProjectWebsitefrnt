import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import './Login.css'
import './Register1.css'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to handle form submission
    console.log(formData);
    // Reset form data after submission
    setFormData({
      email: '',
      password: ''
    });
  };
  return (
    
       <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <Button className='button' type="submit">Login</Button>
      </form>
    </div>
  
  )
}

export default Login
