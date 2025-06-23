import React, { useEffect, useState } from 'react'
import './Login.css'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../Actions/User'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from 'react-toastify'

const Login = () => {
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
const {error , message} = useSelector((state) => state.like)

      const [showPassword, setShowPassword] = useState(false);
    
    const loginHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
        // API call to login
        dispatch(loginUser(email,password))
    }


     useEffect(() => {
                        if (error) {
                          toast.error(error);
                          dispatch({type:"clearErrors"});
                          }
    
                          if (message) {
                          toast.success(message);
                            
                          dispatch({type:"clearMessage"});
                          }
                      },[dispatch , error , message ])

  return (
    <div className='login'>
      <form className='loginForm' onSubmit={loginHandler}>
  <Typography variant='h3' style={{ padding: '2vmax' }}>Social App</Typography>

  <div className="formField">
    <input
      type="email"
      className="registerInputs"
      placeholder="Email"
      required
      value={email}
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
    <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </span>
  </div>

  <Link to="/forgot/password">
    <Typography>Forgot Password?</Typography>
  </Link>

  <Button type="submit">Login</Button>

  <Link to="/register">
    <Typography>New User?</Typography>
  </Link>
</form>


      
    </div>
  )
}

export default Login
