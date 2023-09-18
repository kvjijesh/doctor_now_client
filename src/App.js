import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
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
import Footer from "./components/Footer";
import { VideoCall } from "./components/VideoCall";
import Ratings from "./components/Ratings";
import DoctorsByDepartment from "./user/doctorlist/DoctorsByDepartment";
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
                <Footer />
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
          <Route path="/login" element={<Login />} />
          <Route path="/doctor" element={<RegisterDoctor />} />
          <Route path="/doctorlogin" element={<LoginDoctor />} />
          <Route path="/doctors-by-departments" element={<><Header userType={'user'}/><DoctorsByDepartment/></>} />
          <Route
            path="/doctor-details"
            element={
              <>
                <DoctorDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
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
                  <Navbar />
                  <HomeAdmin />
                </>
              }
            />
            <Route
              path="/doctors"
              element={
                <>
                  <DoctorList />
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <Navbar />
                  <UsersList />
                </>
              }
            />
            <Route path="/departments" element={<DepartmentPage />} />
            <Route path="/bookings" element={<UserBookings />} />
          </Route>
          {/* Doctors Protected Routes */}
          <Route element={<ProtectedRouteDoctor />}>
            <Route path="/doctorhome" element={<DoctorHome />} />
            <Route path="/manage-slots" element={<AddSlot />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/doctor/call/:roomId"
              element={
                <>
                  <Header userType={"doctor"} />
                  <VideoCall value={"doctor"} />
                </>
              }
            />
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
                  <Footer />
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
                  <Footer />
                </>
              }
            />
            <Route
              path="/booking-success"
              element={
                <>
                  <ConfirmBooking />
                  <Footer />
                </>
              }
            />
            <Route
              path="/user-bookings"
              element={
                <>
                  <BookingList />
                </>
              }
            />
            <Route
              path="/user/call/:roomId"
              element={
                <>
                  <Header userType={"user"} />
                  <VideoCall value={"user"} />
                </>
              }
            />
            <Route path="feedback" element={<Ratings />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
