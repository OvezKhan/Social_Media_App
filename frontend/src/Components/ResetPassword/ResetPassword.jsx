import React, { useEffect, useState } from 'react'
import "./ResetPassword.css"
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/User';
import { toast } from 'react-toastify';
const ResetPassword = () => {
    const dispatch = useDispatch();
    const [newPassword , setNewPassword] = useState("")
const params = useParams();

const {error ,  message} = useSelector((state) => state.user)

// console.log(params)

     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token , newPassword))
        
      };

      useEffect(() => {
          if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
          }
      
          if (message) {
            toast.success(message);
      
            dispatch({ type: "clearMessage" });
          }
        }, [dispatch, error, message]);


  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ marginBottom: "2vmax" }}>
          Change Password
        </Typography>

       

        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="resetPasswordInputs"
        />

       <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1vmax",
    marginTop: "1vmax",
    marginBottom:"2vmax"
  }}
>
  <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
    <Typography>Login</Typography>
  </Link>

  <Typography style={{color: "gray"}}>Or</Typography>

  <Link to="/forgot/password" style={{ textDecoration: "none", color: "gray" }}>
    <Typography>Request Another Token</Typography>
  </Link>
</div>


        <Button type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  )
}

export default ResetPassword
