import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User"; // Adjust path based on your folder structure
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import Post from "../Post/Post"; // Adjust path based on where your Post component is located
import { Avatar, Button,  Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
 // Go up two levels from Components/Account


import User from "../User/User";

const Account = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message } = useSelector((state) => state.like);
const [followersToggle , setFollowersToggle] = useState(false);
const [followingToggle , setFollowingToggle] = useState(false);


const logoutHandler = async() => {
  await dispatch(logoutUser());
   toast.success("Logged Out Successfully");
}

const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete your profile?")) {
    dispatch(deleteMyProfile());
  }
};

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      toast.error(error);
      dispatch({ type: "clearMessage" });
    }
   
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch(getMyPosts()); // Refresh posts after deletion

    }
  }, [error, message, dispatch, likeError]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              caption={post.caption}
              postId={post._id}
              likes={post.likes}
              comments={post.comments}
              postImage={post?.image?.url}
ownerImage={post?.owner?.avatar?.url}
ownerName={post?.owner?.name}
ownerId={post?.owner?._id}
isAccount={true}
isDelete={true}

            />
          ))
        ) : (
          <Typography variant="h6">You have not posted anything yet</Typography>
        )}
      </div>
      <div className="accountright">
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

        <Button variant="contained" onClick={logoutHandler}>Logout</Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button variant="text" style={{ color: "red", margin: "2vmax" }} onClick={handleDelete}>
          Delete My Profile
        </Button>

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

export default Account;
