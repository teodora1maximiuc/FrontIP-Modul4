import React from 'react';
import './NavBar.css';
import barsIcon from '../../images/bars-solid.svg';
import logo from '../../images/logo.png';


const NavBar = () => {
  return (
    <div className="navbar">
        <img src={logo} alt="logo" className="logo"/>
        <li>Home</li>
        <ul>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
        <img src={barsIcon} alt="Menu" className="icon" />
        <button className="account-button">Account</button>

    </div>
  );
}

export default NavBar;