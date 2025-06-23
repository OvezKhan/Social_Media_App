import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };


  // Clear previous message/error on mount
    useEffect(() => {
      dispatch({ type: "ClearError" });
      dispatch({ type: "ClearMessage" });
    }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/account");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ marginBottom: "2vmax" }}>
          Change Password
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="updatePasswordInputs"
        />

        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="updatePasswordInputs"
        />

        <Button type="submit" disabled={loading}>
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
