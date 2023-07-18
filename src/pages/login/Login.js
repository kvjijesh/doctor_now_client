import React, { useState } from "react";
import "./login.scss";
import { images } from "../../images/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSucces,
} from "../../features/user/userSlice";
import validate from "../../helper/validateLogin";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { email, password } = formData;

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
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      dispatch(loginStart());
      try {
        const response = await axios.post("auth/login", formData);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          console.log(response,889898);
          dispatch(loginSucces(response.data));
          navigate("/home");
        }
      } catch (error) {
        dispatch(loginFailure());
        if (error.isAxiosError) {
          const response = error.response;
          if (response.status === 400) {
            toast.error(`${response.data.message}`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else {
            toast.error(`${response.message}`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        }
      }
    }
  };
  return (
    <div className="signup-page">
      <div className="container">
        <div className="image-container">
          <img src={images.regImage} alt="Signup" />
        </div>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
                value={password}
                name="password"
                placeholder="Enter Password"
                onChange={onChange}
              />
              <span>{formErrors.password}</span>
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="alReg">
            Not Registered??
            <Link to="/signup"> Click here to signup!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
