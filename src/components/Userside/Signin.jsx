
import React, { useState } from 'react'
import './Sigin.css';
const Signin = () => {
 
  const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const handleEmailChange = (event) => {
 setEmail(event.target.value);
 };
 const handlePasswordChange = (event) => {
 setPassword(event.target.value);
 };
 const handleSubmit = (event) => {
 Event.preventDefault();
 // Here you can add your logic for signing in
 console.log('Email:', email);
 console.log('Password:', password);
 // For a real application, you would typically make an API call to authenticate the user
 };
 return (
  <div
  className='box'
  style={{
    backgroundImage: `url(' https://t4.ftcdn.net/jpg/02/86/32/15/240_F_286321594_HHLM1hCAuqrrqQ0Sv3SKF7uHhmrojMoq.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
<div className='box'>
<h2>Sign In</h2>
 <form onSubmit={handleSubmit}>
<div>
 <label htmlFor="email">Your username or email:</label>
 <input
 Type="email"
 Id="email"
 Value={email}
 onChange={handleEmailChange}
 required
 />
 </div>
 <div>
 <label htmlFor="password">Password:</label>
 <input
 Type="password"
 Id="password"
 Value={password}
 onChange={handlePasswordChange}
 required
 />
 </div>
 <div>
 <a href="/forgot-password">Forgot your password?</a>
 </div>
 <button type="submit">Sign In</button>
 </form>
 <div>
 <p>Registrations are closed now.</p>
 <p>Don’t have an account? <a href="/reg">Register</a></p>
 </div>
 </div>
 </div>
 );
}

export default Signin