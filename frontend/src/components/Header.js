import React from "react";
import logo from "../images/logo.svg";
import { Link, useNavigate } from 'react-router-dom';
function Header(props) {
  const navigate = useNavigate();
  const signOut =(e)=> {
    e.preventDefault();
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      { props.email? 
      <p className="heder__subtitle">{props.email}  <Link to="/signin "onClick={signOut} className="header__logout">Log out</Link> </p> : <p className="heder__subtitle"><Link to={`/${props.navTo}`} className="header__logout">{props.title}</Link> </p>}
    </header>
  );
}

export default Header;
