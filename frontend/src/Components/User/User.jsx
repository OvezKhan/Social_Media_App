import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const User = ({userId,name,avatar}) => {
  return (
    <Link to={`/user/${userId}`} className='homeuser'>
        <img src={avatar} alt={name} />
        <Typography>{name}</Typography>
      
    </Link>
  )
}

export default User
