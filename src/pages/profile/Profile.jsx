import React from "react";
import "./profile.scss";
import Header from "../../components/header/Header";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { validateDetails } from "../../helper/formik";
import axios from "../../Servies/axiosInterceptor";
import { useNavigate } from "react-router-dom";
const initialValues = {
  registrationNumber: "",
  registrationCouncil: "",
  registrationYear: "",
  offlineFee: "",
  videoFee: "",
  chatFee: "",
  specialisation: "",
  mobileNumber: "",
  gender: "",
  street: "",
  city: "",
  state: "",
  country: "",
  pin: "",
};

const Profile = () => {
  const userType = "doctor";
  const navigate=useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validateDetails,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.put("/doctor/add-details", values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("dtoken")}`,
            },
          });
          console.log(response);
          if(response.status===201){
            toast.success('Added succesfully',{position:toast.POSITION.TOP_CENTER})
            navigate('/doctorhome')
          }
        } catch (error) {
          toast.error(`${error.message}`,{position:toast.POSITION.TOP_CENTER})
        }

        action.resetForm();
      },
    });
  return (
    <>
      <Header userType={userType} />

      <div className="card">
        <h2 className="heading">Upload Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              id="registrationNumber"
              value={values.registrationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.registrationNumber && errors.registrationNumber ? (
              <span>{errors.registrationNumber}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Registration Council:</label>
            <input
              type="text"
              name="registrationCouncil"
              id="registrationNumber"
              value={values.registrationCouncil}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.registrationCouncil && errors.registrationCouncil ? (
              <span>{errors.registrationCouncil}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Registration Year:</label>
            <input
              type="text"
              name="registrationYear"
              id="registrationYear"
              value={values.registrationYear}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.registrationYear && errors.registrationYear ? (
              <span>{errors.registrationYear}</span>
            ) : null}
          </div>
          <div className="inline-fields">
            <div className="form-group">
              <label>Offline Fee:</label>
              <input
                type="text"
                name="offlineFee"
                id="offlineFee"
                value={values.offlineFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.offlineFee && errors.offlineFee ? (
                <span>{errors.offlineFee}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Video Fee:</label>
              <input
                type="text"
                name="videoFee"
                id="videoFee"
                value={values.videoFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.videoFee && errors.videoFee ? (
                <span>{errors.videoFee}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Chat Fee:</label>
              <input
                type="text"
                name="chatFee"
                id="chatFee"
                value={values.chatFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.chatFee && errors.chatFee ? (
                <span>{errors.chatFee}</span>
              ) : null}
            </div>
          </div>
          <div className="form-group">
            <label>Specialisation:</label>
            <input
              type="text"
              name="specialisation"
              id="specialisation"
              value={values.specialisation}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.specialisation && errors.specialisation ? (
              <span>{errors.specialisation}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Qualification:</label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              value={values.qualification}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.qualification && errors.qualification ? (
              <span>{errors.qualification}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={values.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.mobileNumber && errors.mobileNumber ? (
              <span>{errors.mobileNumber}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              id="geneder"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              id="street"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.street && errors.street ? (
              <span>{errors.street}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.city && errors.city ? <span>{errors.city}</span> : null}
          </div>
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              name="state"
              id="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.state && errors.state ? <span>{errors.state}</span> : null}
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.country && errors.country ? (
              <span>{errors.country}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label>Pin:</label>
            <input
              type="text"
              name="pin"
              id="pin"
              value={values.pin}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.pin && errors.pin ? <span>{errors.pin}</span> : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
