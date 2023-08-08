import React, { useState } from "react";
import "./header.scss";
import { images } from "../../images/image";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch } from "react-redux";
import {  logout } from "../../features/user/userSlice";
import { doctorLogout } from "../../features/doctor/doctorSlice";
import { clearAppointment } from "../../features/user/appoinmentSlice";

const Header = ({ userType }) => {
  const { user } = useSelector((state) => state.user);
  const { doctor } = useSelector((state) => state.doctor);
  const [opena, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDropClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setAnchorEl(null);
    let url
    if(userType==='doctor') {url="/auth/doctorlogout"}
    else{url= "/auth/logout"}
    try {
      const response = await axios.post(url);

      if (response.status === 200) {
        if(userType==='doctor'){
        localStorage.removeItem("dtoken")
        dispatch(doctorLogout());
        navigate("/doctorlogin");}
       else {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedIn")
        dispatch(logout())
        dispatch(clearAppointment())
        navigate('/login')}
      }
    } catch (error) {
      console.log(error);
    }

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!opena);
  };




  return (
    <>
      {userType === "doctor" ? (
        <div>
          <header>
            <nav className="navbar container">
              <div className="logo">
                <Link to="/">
                <img src={images.logo} alt="logo" /></Link>
              </div>
              <ul className={opena ? `nav-items active ` : `nav-items`}>
                <Link to='/manage-slots'>
              <li>Slots</li></Link>
              <Link to={'/appointments'} >
                <li >Appointments</li></Link>
                <li>Video Consult</li>
                <li>Chat consult</li>

                {doctor ? (
                  <ul>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleDropClick}
                      >
                        {doctor.name}
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <Link to='/doctorprofile'>
                        <MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </ul>
                ) : (
                  <li className="btn btn--nav-btn">
                    <Link to="/doctor">Login/signup</Link>
                  </li>
                )}
              </ul>
              <div className="hamburger">
                <MenuIcon onClick={handleClick} />
              </div>
            </nav>
          </header>
        </div>
      ) : (
        <div>
          <header>
            <nav className="navbar container">
              <div className="logo">
                <Link to="/">
                <img src={images.logo} alt="logo" /></Link>
              </div>
              <ul className={opena ? `nav-items active ` : `nav-items`}>
                <Link to='/available-doctors'><li>Find Doctors</li></Link>
                <li>Video Consult</li>
                <li>Chat with Doctor</li>
                {user ? (
                  <ul>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleDropClick}
                      >
                        {user.name}
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <Link to='/userprofile'>
                        <MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </ul>
                ) : (
                  <li className="btn btn--nav-btn">
                    <Link to="/signup">Login/signup</Link>
                  </li>
                )}
              </ul>
              <div className="hamburger">
                <MenuIcon onClick={handleClick} />
              </div>
            </nav>
          </header>
        </div>
      )}
    </>
  );
};

export default Header;
