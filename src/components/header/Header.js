import React, { useEffect, useState } from "react";
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
import {
  loginFailure,
  loginSucces,
  logout,
} from "../../features/user/userSlice";
import {
  doctorLoginSucces,
  doctorLogout,
} from "../../features/doctor/doctorSlice";
import { clearAppointment } from "../../features/user/appoinmentSlice";
import { toast } from "react-toastify";
import { Badge, Divider } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const Header = ({ userType }) => {
  const { user } = useSelector((state) => state.user);
  const { doctor } = useSelector((state) => state.doctor);
  const [opena, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const openNot = Boolean(anchor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDropClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropNotClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleRead = async (notificationId) => {
    const id = doctor._id;
    const notification = notificationId;

    await axios
      .put("/doctor/update-notification", { id, notification })
      .then((res) => dispatch(doctorLoginSucces(res.data)));
  };
  const handleUserNotification = async (notificationId) => {
    try {
      const id = user._id;
      const notification = notificationId;
      const res = await axios.put("/update-usernotification", {
        id,
        notification,
      });
      dispatch(loginSucces(res.data));
      setAnchor(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      dispatch(loginFailure());
    }
  });
  const handleLogout = async (e) => {
    e.preventDefault();
    setAnchorEl(null);
    let url;
    if (userType === "doctor") {
      url = "/auth/doctorlogout";
    } else {
      url = "/auth/logout";
    }
    try {
      const response = await axios.post(url);

      if (response.status === 200) {
        if (userType === "doctor") {
          localStorage.removeItem("token");
          dispatch(doctorLogout());
          navigate("/doctorlogin");
        } else {
          localStorage.removeItem("token");
          dispatch(logout());
          dispatch(clearAppointment());
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotClose = () => {
    setAnchor(null);
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
                <Link to="/doctorhome">
                  <img src={images.logo} alt="logo" />
                </Link>
              </div>
              <ul className={opena ? `nav-items active ` : `nav-items`}>
                <Link to="/manage-slots">
                  <li style={{ color: "black" }}>Slots</li>
                </Link>
                <Link to={"/appointments"}>
                  <li style={{ color: "black" }}>Appointments</li>
                </Link>
                <Link to={"/doctor-reviews"}>
                  <li>Reviews</li>
                </Link>

                {doctor ? (
                  <ul>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={openNot ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openNot ? "true" : undefined}
                        onClick={handleDropNotClick}
                      >
                        <Badge
                          badgeContent={doctor.notifications.length}
                          color="primary"
                        >
                          <MailIcon color="action" />
                        </Badge>
                      </Button>
                      <Menu
                        sx={{ display: "flex" }}
                        id="basic-menu"
                        anchorEl={anchor}
                        open={openNot}
                        onClose={handleNotClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {doctor.notifications.map((notification) => (
                          <>
                            <MenuItem
                              key={notification._id}
                              sx={{ display: "flex", color: "black", mb: 0 }}
                              onClick={handleNotClose}
                            >
                              {notification.message}
                            </MenuItem>
                            <Button
                              onClick={() => {
                                handleRead(notification._id);
                              }}
                              sx={{ ml: 1 }}
                            >
                              Mark as Read
                            </Button>
                            <Divider />
                          </>
                        ))}
                      </Menu>

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
                        <Link to="/doctorprofile">
                          <MenuItem
                            sx={{ fontSize: "15px", color: "black" }}
                            onClick={handleClose}
                          >
                            Profile
                          </MenuItem>
                        </Link>
                        <MenuItem
                          sx={{ fontSize: "15px", color: "black" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </MenuItem>
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
                  <img src={images.logo} alt="logo" />
                </Link>
              </div>
              <ul className={opena ? `nav-items active ` : `nav-items`}>
                <Link to="/all-doctors">
                  <li>Find Doctors</li>
                </Link>

                <Link to="/user-bookings">
                  <li>Bookings</li>
                </Link>

                {user ? (
                  <ul>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={openNot ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openNot ? "true" : undefined}
                        onClick={handleDropNotClick}
                      >
                        <Badge
                          badgeContent={user.notifications.length}
                          color="primary"
                        >
                          <MailIcon color="action" />
                        </Badge>
                      </Button>

                      <Menu
                        sx={{ display: "flex" }}
                        id="basic-menu"
                        anchorEl={anchor}
                        open={openNot}
                        onClose={handleNotClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {user.notifications.map((notification) => (
                          <>
                            <MenuItem
                              key={notification._id}
                              sx={{ display: "flex", color: "black", mb: 0 }}
                              onClick={handleNotClose}
                            >
                              {notification.message}
                            </MenuItem>
                            <Button
                              onClick={() => {
                                handleUserNotification(notification._id);
                              }}
                              sx={{ ml: 1 }}
                            >
                              Mark as Read
                            </Button>
                            <Divider />
                          </>
                        ))}
                      </Menu>

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
                        <Link to="/userprofile">
                          <MenuItem
                            sx={{ fontSize: "15px", color: "black" }}
                            onClick={handleClose}
                          >
                            Profile
                          </MenuItem>
                        </Link>
                        <Link to="/user-bookings">
                          <MenuItem
                            sx={{ fontSize: "15px", color: "black" }}
                            onClick={handleClose}
                          >
                            My Bookings
                          </MenuItem>
                        </Link>
                        <MenuItem
                          sx={{ fontSize: "15px" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  </ul>
                ) : (
                  <li className="btn btn--nav-btn">
                    <Link style={{color:'white'}} to="/signup">Login/signup</Link>
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
