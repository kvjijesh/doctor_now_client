import React, { useState } from "react";
import "./register.scss";
import { images } from "../../images/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import validate from "../../helper/validateRegister";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { name, email, password, otp } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(validate(formData));

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/auth/signup", formData);
        console.log(response);
        if (response.data) {
          setIsSubmit(true);
        } else {
        }
      } catch (error) {
        toast.error(`User already exist`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/verifyotp", { email, otp });
      console.log(response);
      if (response.data) {
        toast.success(`Registration successfull!!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });

        navigate("/login");
      } else {
        toast.error(`OTP is not correct`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error(`something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="image-container">
          <img src={images.regImage} alt="Signup" />
        </div>

        <div className="form-container">
          {isSubmit ? (  <>
              <h2>OTP Verification</h2>
              <form onSubmit={handleOTPSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    placeholder="Enter name"
                    onChange={onChange}
                  />
                  <span>{formErrors.name}</span>
                </div>

                <button type="submit">Enter Email OTP</button>
              </form>
            </>

          ) : (
            <>
              <h2>Sign Up</h2>
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
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter name"
                    onChange={onChange}
                  />
                  <span>{formErrors.name}</span>
                </div>
                <button type="submit">Sign Up</button>
              </form>
              <p className="alReg">
                Already have an account?
                <Link to="/login">Click here to login!</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
