import React, { useState } from "react";
import "./UserProfile.scss";
import { Button } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { loginSucces } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(userData?.name || "");
  const [userEmail, setUserEmail] = useState(userData?.email || "");
  const [userMobile, setUserMobile] = useState(userData?.mobile || "");
  const [userStreet, setUserStreet] = useState(userData?.street || "");
  const [userCity, setUserCity] = useState(userData?.city || "");
  const [userState, setUserState] = useState(userData?.state || "");
  const [userPin, setUserPin] = useState(userData?.pin || "");
  const [image, setImage] = useState(userData?.image || "");
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
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("mobile", userMobile);
    formData.append("street", userStreet);
    formData.append("city", userCity);
    formData.append("state", userState);
    formData.append("pin", userPin);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`/update/${userData?._id}`, formData);
      if (response.status === 200) {
        dispatch(loginSucces(response.data));
        setIsEditMode(false);
      }
    } catch (error) {
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <div className="user-profile-container">
      <div className="left-section">
        <div className="user-image">
          {isEditMode ? (
            preview ? (
              <img src={preview} alt="User" />
            ) : userData?.image ? (
              <img
                src={`http://localhost:8000/images/${userData?.image}`}
                alt="User"
              />
            ) : (
              <p>No image selected</p>
            )
          ) : (
            <img
              src={`http://localhost:8000/images/${userData?.image}`}
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
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
          />
        ) : (
          <div className="user-name">{userName}</div>
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
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled
                name="email"
              />
            ) : (
              <span>{userEmail}</span>
            )}
          </div>
          <div className="info-item">
            <label>Mobile:</label>
            {isEditMode ? (
              <input
                type="text"
                value={userMobile}
                onChange={(e) => setUserMobile(e.target.value)}
                name="mobile"
              />
            ) : (
              <span>{userMobile}</span>
            )}
          </div>
          {isEditMode ? (
            <>
              <div className="info-item">
                <label>Street:</label>
                <input
                  type="text"
                  value={userStreet}
                  onChange={(e) => setUserStreet(e.target.value)}
                  name="street"
                />
              </div>
              <div className="info-item">
                <label>City:</label>
                <input
                  type="text"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  name="city"
                />
              </div>
              <div className="info-item">
                <label>State:</label>
                <input
                  type="text"
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                  name="state"
                />
              </div>
              <div className="info-item">
                <label>Pin:</label>
                <input
                  type="text"
                  value={userPin}
                  onChange={(e) => setUserPin(e.target.value)}
                  name="pin"
                />
              </div>
            </>
          ) : (
            <div className="info-item">
              <label>Address:</label>
              <span>
                {userStreet}, {userCity}, {userState}, {userPin}
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
  );
};

export default UserProfile;
