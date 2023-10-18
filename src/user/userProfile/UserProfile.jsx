import React, { useState } from "react";
import "./UserProfile.scss";
import { Button, Input } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { loginSucces } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import Axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const UserProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [formdata, setFormdata] = useState({
    userName: userData?.name || "",
    userEmail: userData?.email || "",
    userMobile: userData?.mobile || "",
    userStreet: userData?.street || "",
    userCity: userData?.city || "",
    userState: userData?.state || "",
    userPin: userData?.pin || "",
  })

  const [image, setImage] = useState(userData?.image);
  const [isEditMode, setIsEditMode] = useState(false);
  const [preview, setPreview] = useState("");
  const [isLoading,setIsLoading]=useState(false)



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(e.target.files[0]));
    e.preventDefault()
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }


  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "dsavfcph");
    formData.append("cloud_name", "dw6hpsoj9");

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dw6hpsoj9/image/upload",
        formData
      );

      if (response.status === 200) {
        const newForm = { ...formdata, imgUrl: response.data.secure_url };

        try {
          const updateResponse = await axios.post(
            `/update/${userData?._id}`,
            newForm
          );

          if (updateResponse.status === 200) {
            setIsLoading(false)
            dispatch(loginSucces(updateResponse?.data));
            setIsEditMode(false);
          }
        } catch (error) {
          toast.error(`${error.response?.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };


  return (
    <>
      {isLoading?(<Spinner/>):(
        <>
        <div className="user-profile-container">
        <div className="left-section">
          <div className="user-image">
            {isEditMode ? (
              preview ? (
                <img src={preview} alt="User" />
              ) : userData?.image ? (
                <img
                  src={`${userData?.image}`}
                  alt="User"
                />
              ) : (
                <p>No image selected</p>
              )
            ) : (
              <img
                src={`${userData?.image}`}
                alt="User"
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
            <Input type="standard" name="userName" value={formdata.userName} onChange={(e) => handleChange(e)} />
          ) : (
            <div className="user-name">{formdata.userName}</div>
          )}
        </div>

        <div className="right-section">
          <div className="user-info-box">
            <h2>Your Profile</h2>
            <div className="info-item">
              <label>Email:</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={formdata.userEmail}
                  onChange={(e) => handleChange(e)}
                  disabled
                  name="userEmail"
                />
              ) : (
                <span>{formdata.userEmail}</span>
              )}
            </div>
            <div className="info-item">
              <label>Mobile:</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={formdata.userMobile}
                  onChange={(e) => handleChange(e)}
                  name="userMobile"
                />
              ) : (
                <span>{formdata.userMobile}</span>
              )}
            </div>
            {isEditMode ? (
              <>
                <div className="info-item">
                  <label>Street:</label>
                  <input
                    type="text"
                    value={formdata.userStreet}
                    onChange={(e) => handleChange(e)}
                    name="userStreet"
                  />
                </div>
                <div className="info-item">
                  <label>City:</label>
                  <input
                    type="text"
                    value={formdata.userCity}
                    onChange={(e) => handleChange(e)}
                    name="userCity"
                  />
                </div>
                <div className="info-item">
                  <label>State:</label>
                  <input
                    type="text"
                    value={formdata.userState}
                    onChange={(e) => handleChange(e)}
                    name="userState"
                  />
                </div>
                <div className="info-item">
                  <label>Pin:</label>
                  <input
                    type="text"
                    value={formdata.userPin}
                    onChange={(e) => handleChange(e)}
                    name="userPin"
                  />
                </div>
              </>
            ) : (
              <div className="info-item">
                <label>Address:</label>
                <span>
                  {formdata.userStreet}, {formdata.userCity}, {formdata.userState}, {formdata.userPin}
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
      <footer >
        <Footer />
      </footer>
        </>
      )}
    </>
  );
};

export default UserProfile;
