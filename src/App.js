import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import "./scss/main.scss";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeAdmin from "./admin/home/HomeAdmin";
import LoginAdmin from "./admin/loginpage/LoginAdmin";
import Navbar from "./admin/navbar/Navbar";
import {
  ProtectedRoute,
  ProtectedRouteAdmin,
  ProtectedRouteDoctor,
} from "./Servies/ProtectedRoutes";
import LoginDoctor from "./doctor/login/LoginDoctor";
import RegisterDoctor from "./doctor/register/RegisterDoctor";
import { RegisterUser } from "./user/register/RegisterUser";
import DoctorHome from "./doctor/home/DoctorHome";
import Profile from "./doctor/profile/AddDetail";
import DoctorList from "./admin/doctorlist/DoctorList";
import UserProfile from "./user/userProfile/UserProfile";
import DoctorProfile from "./doctor/profile/DoctorProfil";
import DoctorsList from "./user/doctorlist/DoctorsList";
import UsersList from "./admin/userslist/UsersList";
import DoctorDetails from "./user/doctordetails/DoctorDetails";
import AddSlot from "./doctor/slots/AddSlot";
import Booking from "./user/appointment/Booking";
import ConfirmBooking from "./user/appointment/ConfirmBooking";
import Appointments from "./doctor/appointments/Appointments";
import DepartmentPage from "./admin/departments/DepartmentPage";
import BookingList from "./user/appointment/BookingList";
import UserBookings from "./admin/bookinglist/UserBookings";



function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                <RegisterUser />
              </>
            }
          />
          <Route
            path="/login"
            element={ <Login />}
          />
          <Route path="/doctor" element={<RegisterDoctor />} />
          <Route path="/doctorlogin" element={<LoginDoctor />} />
          <Route path="/doctor-details" element={<DoctorDetails/>} />

          <Route
            path="/admin"
            element={
              <>
                <Header />
                <LoginAdmin />
              </>
            }
          />
          <Route
            path="/available-doctors"
            element={
              <>
                <Header />
                <DoctorsList />
              </>
            }
          />

          {/* admins protected routes */}
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <HomeAdmin />
                </>
              }
            />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="/departments" element={<DepartmentPage />} />
            <Route path="/bookings" element={<UserBookings/>} />
          </Route>

          {/* Doctors Protected Routes */}
          <Route element={<ProtectedRouteDoctor />}>
            <Route path="/doctorhome" element={<DoctorHome />} />
            <Route path="/manage-slots" element={<AddSlot/>} />
            <Route path="/appointments" element={<Appointments/>} />
            <Route
              path="/doctorprofile"
              element={
                <>
                  <DoctorProfile />
                </>
              }
            />
          </Route>

          {/* user protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/userprofile"
              element={
                <>
                  <Header />
                  <UserProfile />
                </>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <>
                  <Header />
                  <Booking />
                </>
              }
            />
            <Route
              path='/booking-success'
              element={
                <>

                  <ConfirmBooking />
                </>
              }
            />
            <Route
              path='/user-bookings'
              element={
                <>

                  <BookingList />
                </>
              }
            />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
