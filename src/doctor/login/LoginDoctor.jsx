import React from "react";
import "./logindoctor.scss";
import Header from "../../components/header/Header";
import { images } from "../../images/image";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validateSchema } from "../../helper/formik";
import {
  doctorLoginFailure,
  doctorLoginStart,
  doctorLoginSucces,
} from "../../features/doctor/doctorSlice";
import axios from "../../Servies/axiosInterceptor";

const initialValues = {
  email: "",
  password: "",
};

const LoginDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = "doctor";
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validateSchema,
      onSubmit: async (values, action) => {
        dispatch(doctorLoginStart());
        try {
          const response = await axios.post("/auth/doctorlogin", values);
          if (response.status === 200) {
            localStorage.setItem('dtoken', response.data.token);
            localStorage.setItem("doctorData", JSON.stringify(response.data));
            dispatch(doctorLoginSucces(response.data));
            navigate("/doctorhome");
          }
        } catch (error) {
          dispatch(doctorLoginFailure());
          if (error.isAxiosError) {
            const response = error.response;
              toast.error(`${response.data.message}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
          }
        }
        action.resetForm();
      },
    });

  return (
    <>
      <Header userType={userType} />

      <div className="signup-page">
        <div className="container">
          <div className="image-container">
            <img src={images.regImage} alt="Signup" />
          </div>
          <div className="form-container">
            <h2>Login as Doctor</h2>
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
    </>
  );
};

export default LoginDoctor;
