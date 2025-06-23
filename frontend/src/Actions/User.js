// import axios from 'axios';
import axios from "../axios"

export const loginUser = (email,password) => async (dispatch) =>{
    try {
        dispatch({
            type: 'LoginRequest',
        });

            const {data} = await axios.post("/api/v1/login" , {email , password} , {headers:{"Content-Type":"application/json",},})

             // ✅ Save token to localStorage
    // localStorage.setItem("token", data.token);

            dispatch({
                type: 'LoginSuccess',
                payload:data.user,
            });

    } catch (error) {
        dispatch({
            type: 'LoginFailure',
            payload:error.response.data.message
        });
        
    }
}

export const logoutUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: 'LogoutRequest',
        });

             await axios.get("/api/v1/logout" , { withCredentials: true });

             // Remove token from localStorage
    localStorage.removeItem("token");

            dispatch({
                type: 'LogoutSuccess',
               
            });

    } catch (error) {
        dispatch({
            type: 'LogoutFailed',
            payload:error.response.data.message
        });
        
    }
}






export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    // const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/v1/me", {
  withCredentials: true,  // ensures cookies are sent
});



    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });


  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({ type: "PostOfFollowingRequest" });
//  const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/v1/posts");

        // console.log(data.posts); // Place log outside dispatch

        dispatch({
            type: "PostOfFollowingSuccess",
            payload: data.posts,
        });

    } catch (error) {
        dispatch({
            type: "PostOfFollowingFailed",
            payload: error.response?.data?.message || "Something went wrong",
        });
    }
};




export const getAllUsers = (name="") => async (dispatch) => {
    try {
        dispatch({ type: "allUsersRequest" });

        const { data } = await axios.get(`/api/v1/users?name=${name}`);

        // console.log(data.users); // Place log outside dispatch

        dispatch({
            type: "allUsersSuccess",
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: "allUsersFailed",
            payload: error.response?.data?.message || "Something went wrong",
        });
    }
};




export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({ type: "myPostsRequest" });
  
      const { data } = await axios.get("/api/v1/my/posts");
  
      dispatch({ type: "myPostsSuccess", payload: data.posts });
    } catch (error) {
      dispatch({
        type: "myPostsFail",
        payload: error.response.data.message,
      });
    }
  };



export const registerUser = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/register",
      { name, email, password, avatar },
      config
    );

    return dispatch({ type: "RegisterSuccess", payload: data.user }); // ✅ return added
  } catch (error) {
    return dispatch({ // ✅ return added
      type: "RegisterFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};





export const updateProfile = (name, avatar, email) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateProfileRequest" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, avatar , email },
      config
    );

    dispatch({ type: "UpdateProfileSuccess", payload: data.message });
    return { success: true, message: data.message };
  } catch (error) {
    dispatch({
      type: "UpdateProfileFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "UpdatePasswordRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/update/password",
      { oldPassword, newPassword },
      config
    );

    dispatch({ type: "UpdatePasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "UpdatePasswordFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};




export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProfileRequest" });

    const { data } = await axios.delete("/api/v1/delete/me");

    dispatch({ type: "DeleteProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DeleteProfileFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};




export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });

    const { data } = await axios.post("/api/v1/forgot/password",{
      email
    },{
      headers:{
        "Content-Type": "application/json",
        },
    });

    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const resetPassword = (token , password) => async (dispatch) => {
  try {
    dispatch({ type: "ResetPasswordRequest" });

    const { data } = await axios.put(`/api/v1/password/reset/${token}`,{
      password
    },{
      headers:{
        "Content-Type": "application/json",
        },
    });

    dispatch({ type: "ResetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "ResetPasswordFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};






export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({ type: "userPostsRequest" });
  
      const { data } = await axios.get(`/api/v1/userposts/${id}`);
  
      dispatch({ type: "userPostsSuccess", payload: data.posts });
    } catch (error) {
      dispatch({
        type: "userPostsFailure",
        payload: error.response.data.message,
      });
    }
  };



  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({ type: "userProfileRequest" });
  
      const { data } = await axios.get(`/api/v1/user/${id}`);
  
      dispatch({ type: "userProfileSuccess", payload: data.user });
    } catch (error) {
      dispatch({
        type: "userProfileFailed",
        payload: error.response.data.message,
      });
    }
  };



   export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: "followUserRequest" });
  
      const { data } = await axios.get(`/api/v1/follow/${id}`);
  
      dispatch({ type: "followUserSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "followUserFailed",
        payload: error.response.data.message,
      });
    }
  };
