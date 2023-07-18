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
import ProtectedRoute from "./Servies/ProtectedRoutes";
import LoginDoctor from "./doctor/login/LoginDoctor";
import RegisterDoctor from "./doctor/register/RegisterDoctor";
import { RegisterUser } from "./user/register/RegisterUser";
import DoctorHome from "./doctor/home/DoctorHome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Header />
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
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route path="/doctor" element={<RegisterDoctor />} />
          <Route path="/doctorlogin" element={<LoginDoctor />} />
          <Route path="/doctorhome" element={<DoctorHome />} />
          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <LoginAdmin />
              </>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar />
                  <HomeAdmin />
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
