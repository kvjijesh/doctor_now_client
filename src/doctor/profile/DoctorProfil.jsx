import React, { useState } from "react";
import "./doctorprofile.scss";
import { Button } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { doctorLoginSucces } from "../../features/doctor/doctorSlice";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";

const DoctorProfile = () => {
    const userType='doctor'
  const doctorData = useSelector((state) => state.doctor.doctor);
  const dispatch = useDispatch();

  const [doctorName, setDoctorName] = useState(doctorData?.name || "");
  const [doctorEmail, setDoctorEmail] = useState(doctorData?.email || "");
  const [doctorMobile, setDoctorMobile] = useState(doctorData?.mobile || "");
  const [specialisation,setSpecialisation]=useState(doctorData?.specialisation)
  const [qualification,setQualification]=useState(doctorData?.qualification)
  const [registrationNumber,setRegistrationNumber]=useState(doctorData?.registrationNumber)
  const [registrationCouncil,setRegistrationCouncil]=useState(doctorData?.registrationYear)
  const [registrationYear,setRegistrationYear]=useState(doctorData?.registrationCouncil)
  const [doctorStreet, setDoctorStreet] = useState(doctorData?.street || "");
  const [doctorCity, setDoctorCity] = useState(doctorData?.city || "");
  const [doctorState, setDoctorState] = useState(doctorData?.state || "");
  const [country, setCountry] = useState(doctorData?.country || "");
  const [doctorPin, setDoctorPin] = useState(doctorData?.pin || "");
  const [image, setImage] = useState(doctorData?.image || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", doctorName);
    formData.append("email", doctorEmail);
    formData.append("mobile", doctorMobile);
    formData.append("specialisation", specialisation);
    formData.append("qualification", qualification);
    formData.append("registrationNumber", registrationNumber);
    formData.append("registrationCouncil", registrationCouncil);
    formData.append("registrationYear", registrationYear);
    formData.append("street", doctorStreet);
    formData.append("city", doctorCity);
    formData.append("state", doctorState);
    formData.append("country", country);
    formData.append("pin", doctorPin);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`/doctor/update/${doctorData?._id}`, formData);
      if (response.status === 200) {
        dispatch(doctorLoginSucces(response.data));
        setIsEditMode(false);
      }
    } catch (error) {
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <>
    <Header userType={userType}/>
    <div className="doctor-profile-container">
      <div className="left-section">
        <div className="doctor-image">
          {isEditMode ? (
            preview ? (
              <img src={preview} alt="Doctor" />
            ) : doctorData?.image ? (
              <img
                src={`http://localhost:8000/images/${doctorData?.image}`}
                alt="Doctor"
              />
            ) : (
              <p>No image selected</p>
            )
          ) : (
            <img
              src={`http://localhost:8000/images/${doctorData?.image}`}
              alt="Doctor"
            />
          )}

          {isEditMode && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-input"
                name="image"

              />
              <label htmlFor="image-input">Change Image</label>
            </>
          )}
        </div>

        {isEditMode ? (
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            name="name"
            required
          />
        ) : (
          <div className="doctor-name">{doctorName}</div>
        )}
      </div>

      <div className="right-section">
        <div className="doctor-info-box">
          <h2>Your Profile</h2>
          <div className="info-item">
            <label>Email:</label>
            {isEditMode ? (
              <input
                type="text"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                disabled
                name="email"
                required
              />
            ) : (
              <span>{doctorEmail}</span>
            )}
          </div>
          <div className="info-item">
            <label>Mobile:</label>
            {isEditMode ? (
              <input
                type="text"
                value={doctorMobile}
                onChange={(e) => setDoctorMobile(e.target.value)}
                name="mobile"
                required
              />
            ) : (
              <span>{doctorMobile}</span>
            )}
          </div>
          <div className="info-item">
            <label>Specialisation:</label>
            {isEditMode ? (
              <input
                type="text"
                value={specialisation}
                onChange={(e) => setSpecialisation(e.target.value)}
                name="specialisation"
                required
              />
            ) : (
              <span>{specialisation}</span>
            )}
          </div>
          <div className="info-item">
            <label>Qualification:</label>
            {isEditMode ? (
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                name="qualification"
                required
              />
            ) : (
              <span>{qualification}</span>
            )}
          </div>
          <div className="info-item">
            <label>Registration Number:</label>
            {isEditMode ? (
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                name="mobile"
                required
              />
            ) : (
              <span>{registrationNumber}</span>
            )}
          </div>
          <div className="info-item">
            <label>Registration Council:</label>
            {isEditMode ? (
              <input
                type="text"
                value={registrationCouncil}
                onChange={(e) => setRegistrationCouncil(e.target.value)}
                name="registrationCouncil"
                required
              />
            ) : (
              <span>{registrationCouncil}</span>
            )}
          </div>
          <div className="info-item">
            <label>Registration Year:</label>
            {isEditMode ? (
              <input
                type="text"
                value={registrationYear}
                onChange={(e) => setRegistrationYear(e.target.value)}
                name="registrationYear"
                required
              />
            ) : (
              <span>{registrationYear}</span>
            )}
          </div>
          {isEditMode ? (
            <>
              <div className="info-item">
                <label>Street:</label>
                <input
                  type="text"
                  value={doctorStreet}
                  onChange={(e) => setDoctorStreet(e.target.value)}
                  name="street"
                  required
                />
              </div>
              <div className="info-item">
                <label>City:</label>
                <input
                  type="text"
                  value={doctorCity}
                  onChange={(e) => setDoctorCity(e.target.value)}
                  name="city"
                  required
                />
              </div>
              <div className="info-item">
                <label>State:</label>
                <input
                  type="text"
                  value={doctorState}
                  onChange={(e) => setDoctorState(e.target.value)}
                  name="state"
                  required
                />
              </div>
              <div className="info-item">
                <label>Country:</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  name="country"
                  required
                />
              </div>
              <div className="info-item">
                <label>Pin:</label>
                <input
                  type="text"
                  value={doctorPin}
                  onChange={(e) => setDoctorPin(e.target.value)}
                  name="pin"
                  required
                />
              </div>
            </>
          ) : (
            <div className="info-item">
              <label>Address:</label>
              <span>
                {doctorStreet}, {doctorCity}, {doctorState}, {country},{doctorPin}
              </span>
            </div>
          )}
          {isEditMode ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorProfile;
