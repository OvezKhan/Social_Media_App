import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../Actions/User";
import { toast } from "react-toastify";
import { Avatar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, message, loading } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };

    if (file) Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, avatar, email));
  };

  // Clear previous message/error on mount
  useEffect(() => {
    dispatch({ type: "ClearError" });
    dispatch({ type: "ClearMessage" });
  }, [dispatch]);

  // Show success/error and navigate
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "ClearMessage" });
      dispatch(loadUser());
      navigate("/account");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Update Your Profile
        </Typography>

        <Avatar
          src={avatar}
          alt="User Avatar"
          sx={{ height: "10vmax", width: "10vmax", margin: "1vmax auto" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          className="updateInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          className="updateInputs"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
