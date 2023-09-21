import React, { useState } from "react";
import "./register.scss";
import { images } from "../../images/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import validate from "../../helper/validateRegister";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Register = ({ userType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [otpCounter, setOtpCounter] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const startOtpCounter = () => {
    setIsResendDisabled(true);
    let counter = 30;
    const timer = setInterval(() => {
      if (counter > 0) {
        counter--;
        setOtpCounter(counter);
      } else {
        clearInterval(timer);
        setIsResendDisabled(false);
      }
    }, 1000);
  };
  const handleResendOTP = async () => {
    await axios.post("/auth/resend-otp", formData);
    startOtpCounter();
  };

  const { name, email, password, confirmPassword, otp } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    startOtpCounter();
    let url;
    if (userType === "doctor") {
      url = "/auth/doctorsignup";
    } else {
      url = "/auth/signup";
    }
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(url, formData);
        if (response.data) {
          setIsSubmit(true);
        } else {
        }
      } catch (error) {
        toast.error(`User already exists`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };
  const handleBack = async () => {
    setIsSubmit(false);
    /*navigate(-1)*/
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    let link;
    if (userType === "doctor") {
      link = "/auth/verifydoctorotp";
    } else {
      link = "/auth/verifyotp";
    }
    try {
      const response = await axios.post(link, { email, otp });
      if (response.status === 201) {
        toast.success(`Registration successful!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        if (userType === "doctor") navigate("/doctorlogin");
        else navigate("/login");
      } else {
        toast.error(`OTP is not correct`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(`OTP Incorrect`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <div className="signup-page">
        <div className="container">
          <div className="image-container">
            <img src={images.regImage} alt="Signup" />
          </div>
          <div className="form-container">
            {isSubmit ? (
              <>
                <h2>OTP Verification</h2>
                <form onSubmit={handleOTPSubmit}>
                  <div className="form-group">
                    <input
                      type="password"
                      id="otp"
                      name="otp"
                      value={otp}
                      placeholder="Enter OTP"
                      onChange={onChange}
                    />
                    <span>{formErrors.otp}</span>
                  </div>
                  <button type="submit">Enter Email OTP</button>
                </form>
                <div className="otp-resend">
                  <p>
                    Resend OTP in {otpCounter}s{" "}
                    <button
                      onClick={handleResendOTP}
                      disabled={isResendDisabled}
                      className="resend-button"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
                <div className="backbutton">
                  <span onClick={handleBack}>
                    <ArrowBackOutlinedIcon />
                    Go Back
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="heading">
                  <h2>Sign Up as {userType}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Enter name"
                      onChange={onChange}
                    />
                    <span>{formErrors.name}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email"
                      onChange={onChange}
                    />
                    <span>{formErrors.email}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={onChange}
                    />
                    <span>{formErrors.password}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="Renter password"
                      onChange={onChange}
                    />
                    <span>{formErrors.confirmPassword}</span>
                  </div>

                  <button type="submit">Sign Up</button>
                </form>
                <p className="alReg">
                  Already have an account?
                  {userType === "doctor" ? (
                    <Link to="/doctorlogin">Click here to login!</Link>
                  ) : (
                    <Link to="/login"> Click here to login!</Link>
                  )}
                </p>
                <p className="alReg">
                  Not a {userType}?
                  {userType === "doctor" ? (
                    <span>
                      <Link to="/signup"> Click here !</Link>
                    </span>
                  ) : (
                    <Link to="/doctor"> Click here !</Link>
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
