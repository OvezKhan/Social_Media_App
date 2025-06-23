// import axios from 'axios';
import { toast } from 'react-toastify';
import axios from "../axios"

export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "likeRequest",
      });
  
      const { data } = await axios.get(`/api/v1/post/${id}`);
      dispatch({
        type: "likeSuccess",
        payload: data.message,
      });
      
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    }
  };






  export const commentOnPost = (postId, comment) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/v1/post/comment/${postId}`,
        { comment },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      dispatch({ type: 'COMMENT_SUCCESS', payload: data.message });
      toast.success(data.message)
    } catch (error) {
      dispatch({ type: 'COMMENT_FAIL', payload: error.response.data.message });
    }
  };




  export const deleteCommentOnPost = (postId, commentId) => async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/v1/post/comment/${postId}`, {
        data: { commentId },
      });
  
      dispatch({ type: 'DELETE_COMMENT_SUCCESS', payload: data.message });
      toast.success(data.message)
    } catch (error) {
      dispatch({ type: 'DELETE_COMMENT_FAIL', payload: error.response.data.message });
    }
  };
  

 
  






  // Actions/Post.js


export const createNewPost = (caption , image) => async (dispatch) => {
  try {
    dispatch({ type: "NewPostRequest" });

    const { data } = await axios.post("/api/v1/post/upload",  {
      caption,
      file:image,
    },
    {
      headers: {
        "Content-Type": "application/json",
        },
    }
  );

    dispatch({ type: "NewPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "NewPostFailure",
      payload: error.response.data.message,
    });
  }
};






export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: "DeletePostRequest" });

    const { data } = await axios.delete(`/api/v1/post/${postId}`, {
      withCredentials: true,
    });

    dispatch({ type: "DeletePostSuccess", payload: data.message });
    
  } catch (error) {
    dispatch({
      type: "DeletePostFailure",
      payload: error.response.data.message,
    });
  }
};