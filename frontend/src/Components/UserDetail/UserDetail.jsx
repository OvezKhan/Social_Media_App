import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {  followAndUnfollowUser, getMyPosts, getUserPosts, getUserProfile } from "../../Actions/User"; // Adjust path based on your folder structure
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import Post from "../Post/Post"; // Adjust path based on where your Post component is located
import { Avatar, Button, colors, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import {  useParams } from "react-router-dom";
// import { useAlert } from "react-alert";
// Go up two levels from Components/Account


import User from "../User/User";


const UserDetail = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { user:me } = useSelector((state) => state.user);

  const { user, loading: userLoading , error : userError} = useSelector((state) => state.userProfile);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const { error: followError, message , loading : followLoading} = useSelector((state) => state.user);
  
const [followersToggle , setFollowersToggle] = useState(false);
const [followingToggle , setFollowingToggle] = useState(false);
const [following , setFollowing] = useState(false);
const [myProfile , setMyProfile] = useState(false)
const params = useParams();
const shownMessage = useRef(false);


const followHandler = async () => {
      if (!user) return;
// setFollowing(!following);
    shownMessage.current = false; // Reset before dispatching
   await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));

    if (me._id === params.id) {
      setMyProfile(true);
    }
  }, [dispatch, me._id, params.id]);

  useEffect(() => {
    // Handle following state based on user.followers
    if (user && user.followers){
      const isFollowing = user.followers.some((follower) => follower._id === me._id);
      setFollowing(isFollowing);
    }
  }, [user, me._id]);

  useEffect(() => {
    // Show follow/unfollow messages only once
    if (message && !shownMessage.current) {
      toast.success(message);
      shownMessage.current = true;
      dispatch({ type: "clearMessage" });
      dispatch(getUserProfile(params.id)); // Refresh the profile
      dispatch(getMyPosts());
    }


    if (followError) {
      toast.error(followError);
      dispatch({ type: "clearMessage" });
    }

    if (userError) {
      toast.error(userError);
      dispatch({ type: "clearMessage" });
    }
  },[message, followError , params.id , userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
     <div className="accountleft">
  {posts && posts.filter(p => p !== null).length > 0 ? (
  posts
    .filter(p => p !== null)
    .map((post) => (
      <Post
        key={post._id}
        caption={post.caption}
        postId={post._id}
        likes={post.likes}
        comments={post.comments}
        postImage={post?.image?.url}
        ownerImage={post?.owner?.avatar?.url || ""}
        ownerName={post?.owner?.name || "Unknown"}
        ownerId={post?.owner?._id || ""}
      />
    ))
) : (
  <Typography variant="h6">User has not posted anything yet</Typography>
)}

</div>

      <div className="accountright">
       
       {
        user && (
          <>
           <Avatar
          src={user?.avatar?.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        {user && <Typography>{user.name}</Typography>}

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
         <Typography>{user?.followers?.length || 0}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(true)}>
            <Typography>Following</Typography>
          </button>
        <Typography>{user?.following?.length || 0}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
         <Typography>{user?.posts?.length || 0}</Typography>
        </div>

{myProfile ? null : <Button disabled={followLoading} style={{background : following ? "red" : "blue"}} onClick={followHandler} variant="contained">
    {following ? "Unfollow" : "Follow"}
    </Button>}

          </>
        )
       }

        

      

        <Dialog open={followersToggle} onClose={() => setFollowersToggle(false)}>
  <div className="DialogBox">
    <Typography variant="h4">Followers</Typography>
    {/* {console.log(user.followers)} */}

    {user && user.followers.length > 0 ? (
      user.followers.map((follower) => (
        <User
          key={follower._id}
          userId={follower._id}
          userAvatar={follower.avatar?.url}
          userFollowers={follower.followers?.length}
          name={follower.name}
        />
      ))
    ) : (
      <Typography style={{ margin:"2vmax"}}>You Have No Follower</Typography>
    )}
  </div>
</Dialog>





 <Dialog open={followingToggle} onClose={() => setFollowingToggle(false)}>
  <div className="DialogBox">
    <Typography variant="h4">Following</Typography>
    {/* {console.log(user.following)} */}

    {user && user.following.length > 0 ? (
      user.following.map((following) => (
        <User
          key={following._id}
          userId={following._id}
          userAvatar={following.avatar?.url}
          userFollowers={following.following?.length}
          name={following.name}
        />
      ))
    ) : (
      <Typography>You Have No Following</Typography>
    )}
  </div>
</Dialog>

      </div>
    </div>
  );
};

export default UserDetail;
