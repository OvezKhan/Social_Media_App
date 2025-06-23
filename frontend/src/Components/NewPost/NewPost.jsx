

import React, { useState } from 'react';
import './NewPost.css';

import { createNewPost } from '../../Actions/Post';
import { toast } from 'react-toastify';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '../../Actions/User';


const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
const dispatch = useDispatch();
  const {loading , error , message} = useSelector((state) => state.like)
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    const Reader = new FileReader();
    Reader.readAsDataURL(file);


    Reader.onload = () => {
      if(Reader.readyState===2){
        // console.log(Reader.result);
        setImage(Reader.result);
      }
    }

  };


  const submitHandler = async(e) => {
      e.preventDefault();
      await dispatch(createNewPost(caption,image));
      dispatch(loadUser());
            
                  }

                  useEffect(() => {
                    if (error) {
                      toast.error(error);
                      dispatch({type:"clearErrors"});
                      }

                      if (message) {
                      toast.success(message);
                         setCaption(""); // reset caption
    setImage(null); // reset image
                      dispatch({type:"clearMessage"});
                      }
                  },[dispatch , error , message ])

  

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant='h3'>New Posts</Typography>

        {image && <img src={image} alt='posts' />}

        <input type="file" accept='image/*' onChange={handleImageChange}/>
        <input type="text" placeholder='Caption...' onChange={(e) => setCaption(e.target.value)} value={caption} />
        <Button type="submit" disabled={loading}>Post</Button>
      </form>
    </div>
  );
};

export default NewPost;

