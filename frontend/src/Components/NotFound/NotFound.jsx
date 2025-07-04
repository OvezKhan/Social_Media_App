import React from 'react'
import "./NotFound.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ErrorOutline } from '@mui/icons-material'
const NotFound = () => {
  return (
    <div className='notFound'>
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant='h3' style={{padding:"2vmax"}}>Page Not Found</Typography>

        <Link to="/"><Typography variant='h5'>Go to Home</Typography></Link>
      </div>
    </div>
  )
}

export default NotFound
