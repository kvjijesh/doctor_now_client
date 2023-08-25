import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/admin/adminSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        dispatch(adminLogout());
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">DOCTOR NOW</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/doctors" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Doctors</span>
            </li>
          </Link>
          <Link to={"/bookings"}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Appointments</span>
            </li>
          </Link>
          <Link to={"/departments"}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Department</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
