// src/Components/LogoutButton.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Actions/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      toast.success("Logged out successfully");
      navigate("/login");
    });
  };

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleLogout} 
      style={{
        position: 'absolute',
        top: '20px',
        right: '30px',
        padding: '0.5rem 1.2rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        zIndex: 1000
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
