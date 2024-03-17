import * as React from 'react';
import { AppBar, Button } from '@mui/material';
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
   
      
  return (
    <AppBar>
  <nav className='navbar'>
    <Link to="/" className='logo'>
      <h1 className='navhead'>Movie Website</h1>
    </Link>
    <ul className='nav-list'>
      <li>
        <Button color="inherit" component={Link} to="/Login">Login</Button>
        <Button color="inherit" component={Link} to="/Register1">Register</Button>
      </li>
    </ul>
  </nav>
</AppBar>
  );
}

 

export default Navbar
