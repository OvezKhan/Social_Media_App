import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(""); // Base64 string
//   const [avatarPreview, setAvatarPreview] = useState("");

const {error , loading , user} = useSelector((state) => state.like)
const navigate = useNavigate();

const submitHandler = async (e) => {
  e.preventDefault();

  const res = await dispatch(registerUser(name, email, password, avatar));

 if (res?.type === "RegisterSuccess") {
  toast.success("Registered successfully");
  navigate("/");
} else {
  toast.error(res?.payload || "Registration failed");
}


};


     const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    const Reader = new FileReader();
    Reader.readAsDataURL(file);


    Reader.onload = () => {
      if(Reader.readyState===2){
        // console.log(Reader.result);
        setAvatar(Reader.result);
      }
    }

  };

  useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch({type:"clearError"});
        }

         if (user) {
    toast.success("Registered successfully");
    navigate("/");
  }

  },[dispatch , user , error , navigate])

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{padding:"2vmax"}}>Social App Register</Typography>

         <Avatar 
         src={avatar}
         alt="User"
         sx={{height:"10vmax" , width:"10vmax"}} />

        <input type="file" accept="image/*" onChange={handleImageChange}/>


       <div className="formField">
  <input
    type="text"
    placeholder="Name"
    value={name}
    className="registerInputs"
    required
    onChange={(e) => setName(e.target.value)}
  />
</div>

<div className="formField">
  <input
    type="email"
    placeholder="Email"
    value={email}
    className="registerInputs"
    required
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

<div className="formField passwordField">
  <input
    type={showPassword ? "text" : "password"}
    className="registerInputs"
    placeholder="Password"
    value={password}
    required
    onChange={(e) => setPassword(e.target.value)}
  />
  <span
    className="eyeIcon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <VisibilityOff /> : <Visibility />}
  </span>
</div>



       

        <Button disabled={loading} type="submit">Sign Up</Button>
        <Link to="/"><Typography>Already Sign Up ? Login Now</Typography></Link>
      </form>
    </div>
  );
};

export default Register;
