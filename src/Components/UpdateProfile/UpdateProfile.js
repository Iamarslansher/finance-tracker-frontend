import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiMail, FiSave, FiX, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./updateprofile.css";
import axios from "axios";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const fileInputRef = useRef(null);
  const defultImg =
    "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg";

  useEffect(() => {
    const crntUser = JSON.parse(localStorage.getItem("curentUser"));
    setName(crntUser.userName);
    setEmail(crntUser.email);
    setUserId(crntUser._id);
    setUserProfile(`http://localhost:3001/${crntUser.image}`);
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("userId", userId);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3001/users/updateprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("curentUser", JSON.stringify(response.data.user));
      alert(response.data.message);
      navigate("/dashboard");
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="update-profile-overlay">
      <div className="update-profile-modal">
        <button className="close-button" onClick={() => navigate("/dashboard")}>
          <FiX />
        </button>
        <form onSubmit={handleSubmit} className="update-profile-form">
          <div className="image-container">
            <img
              src={userProfile ? userProfile : defultImg}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <button
            type="button"
            className="change-image-button"
            onClick={() => fileInputRef.current.click()}
          >
            <FiCamera className="button-icon" />
            Change Profile Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            style={{ display: "none" }}
          />
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="input"
            />
          </div>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input"
            />
          </div>
          <button type="submit" className="update-button">
            <FiSave className="button-icon" />
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
