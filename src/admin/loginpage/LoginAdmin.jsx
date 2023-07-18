import React from "react";
import { images } from "../../images/image";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { validateSchema } from "../../helper/formik";
import { useDispatch } from "react-redux";
import {
  adminLoginFailure,
  adminLoginStart,
  adminLoginSucces,
} from "../../features/admin/adminSlice";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validateSchema,
      onSubmit: async (values, action) => {
        dispatch(adminLoginStart());
        try {
          const response = await axios.post("/auth/login", values);
          if (response.data.isAdmin) {
            dispatch(adminLoginSucces(response.data));
            navigate("/dashboard");
          } else {
            dispatch(adminLoginFailure("You are not allowed"));
            toast.error(`You are not allowed`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } catch (error) {
          dispatch(adminLoginFailure());
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
        action.resetForm();
      },
    });

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
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <span>{errors.email}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <span className="form-error">{errors.password}</span>
              ) : null}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
