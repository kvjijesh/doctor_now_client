import React, { useState } from "react";
import "./register.scss";
import { images } from "../../images/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import validate from "../../helper/validateRegister";

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
    let url;
    if (userType === "doctor") {
      url = "/auth/doctorsignup";
    } else {
      url = "/auth/signup";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(url, formData);
        console.log(response);
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
      console.log(response);
      if (response.data) {
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
      toast.error(`Something went wrong`, {
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
              </>
            ) : (
              <>
                <h2>Sign Up as {userType}</h2>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm password"
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
                    <Link to="/login">Click here to login!</Link>
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
