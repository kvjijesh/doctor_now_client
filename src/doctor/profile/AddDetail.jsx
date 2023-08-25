import React, { useEffect, useState } from "react";
import "./adddetail.scss";
import Header from "../../components/header/Header";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { validateDetails } from "../../helper/formik";
import axios from "../../Servies/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  doctorLoginSucces,
  doctorloginFailure,
} from "../../features/doctor/doctorSlice";
const initialValues = {
  registrationNumber: "",
  registrationCouncil: "",
  registrationYear: "",
  offlineFee: "",
  videoChatFee: "",
  textChatFee: "",
  specialisation: "",
  mobile: "",
  gender: "",
  street: "",
  city: "",
  state: "",
  country: "",
  pin: "",
  document:"",
  is_submitted: true,
};

const AddDetail = () => {
  const userType = "doctor";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const doctorData = useSelector((state) => state.doctor.doctor);
  const id=doctorData?._id
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const res = await axios.get("/all-departments");

        const departmentNames = res.data.map(department => department.name);
        setDepartmentOptions(departmentNames)

      } catch (error) {
        toast.error(`${error.response}`);
      }
    };
    getDepartments();
  }, []);



  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validateDetails,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post("/doctor/add-details", {...values,id});

          if (response.status === 201) {
            console.log(response.data);
            dispatch(doctorLoginSucces(response.data.updatedDoctor));
            toast.success("Added succesfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/doctorhome");
          }
        } catch (error) {
          toast.error(`${error.response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        action.resetForm();
      },
    });
  return (
    <>
      <Header userType={userType} />

      <div className="card1">
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
                name="videoChatFee"
                id="videoChatFee"
                value={values.videoChatFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.videoChatFee && errors.videoChatFee ? (
                <span>{errors.videoChatFee}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Chat Fee:</label>
              <input
                type="text"
                name="textChatFee"
                id="textChatFee"
                value={values.textChatFee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.textChatFee && errors.textChatFee ? (
                <span>{errors.textChatFee}</span>
              ) : null}
            </div>
          </div>
          <div className="form-group">
            <label>Specialisation:</label>
            <select
              name="specialisation"
              id="specialisation"
              value={values.specialisation}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select Specialisation
              </option>
              {departmentOptions?.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
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
              name="mobile"
              id="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.mobile && errors.mobile ? (
              <span>{errors.mobile}</span>
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
              <option selected disabled>
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
          <div className="form-group">
            <label>Documents:</label>
            <input
              type="file"
              name="document"
              id="document"
              value={values.document}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.document && errors.document ? <span>{errors.document}</span> : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDetail;
