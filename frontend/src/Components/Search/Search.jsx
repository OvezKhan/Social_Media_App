import React, { useState } from 'react'
import "./Search.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';
const Search = () => {
    const [name ,setName] = useState("");
    const dispatch = useDispatch();

        const {users , loading : usersLoading} = useSelector((state) => state.allUsers)
    

    const submitHandler = (e) => {
        e.preventDefault();
dispatch(getAllUsers(name));
        
    }

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="text"
          placeholder="Name"
          value={name}
          
          required
          onChange={(e) => setName(e.target.value)}
        />



        <Button type="submit">
          Search
        </Button>

         <div className="searchResults">
        {users && users.map((user) => (
            <User
            key={user._id}
            name={user.name}
            avatar={user.avatar.url}
            userId={user._id}
             />

        ))}
      </div>
      </form>


     
    </div>
  )
}

export default Search
