import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
    var[inputs,setInputs]=useState({"username":"password"})
    const inputHandler=(event)=>{
      const {name,value}=event.target 
      setInputs((inputs)=>({...inputs,[name]:value}))
      console.log(inputs)
    }
    const navigate=useNavigate()
    const checkData=async(event)=>{
      event.preventDefault();

      try{
        const response=await axios.post("http://localhost:3005/Loginsearch",{
          username:inputs.username,
          password:inputs.password,
       })
       if(response.data.success) {
        alert('Login successfull');
        navigate('/moviedetails');
       }
       else{
        alert('Invalid email or password. Please try again.');
        console.log(response.data);
       }
      } catch(err) {
        alert('Error occurred during login. Please try again.');
      }
    };
  return (
    <div className='pop'>
      <br/><br/> <br/><br/> <br/><br/> <br/><br/>
      <TextField required id="outlined-required" label="required" name="username" value={inputs.username} onChange={inputHandler}/><br/><br/>
      <TextField name="password" id="outlined-password-input" label="password" type="password" 
      autoComplete="current-password" value={inputs.password} onChange={inputHandler}/><br/><br/>
      <Button variant="contained" onClick={checkData}>Login</Button>
    </div>
  )
}

export default Login
