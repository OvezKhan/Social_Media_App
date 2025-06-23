import React, { useEffect, useState } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");

  const { loading, posts } = useSelector((state) => state.postOfFollowing);
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  const { message } = useSelector((state) => state.like);

  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());

    if (message) {
          toast.success(message);
          dispatch({ type: "clearMessage" });
          }
  }, [dispatch , message]);

  if (loading || usersLoading) return <Loader />;

  return (
    <div className="home">
      {isMobile && (
        <div className="toggleViewBtn">
          <button onClick={() => setShowUsers(!showUsers)}>
            {showUsers ? "⬅ Back to Feed" : "👥 Suggested Users"}
          </button>
        </div>
      )}

      {!isMobile || !showUsers ? (
        <div className="homeleft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                caption={post.caption}
                postId={post._id}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner?.avatar?.url}
                ownerName={post.owner?.name}
                ownerId={post.owner?._id}
              />
            ))
          ) : (
            <Typography>No posts yet</Typography>
          )}
        </div>
      ) : null}

      {!isMobile ? (
        <div className="homeright">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User key={user._id} avatar={user.avatar.url} name={user.name} userId={user._id} />
            ))
          ) : (
            <Typography>No users yet</Typography>
          )}
        </div>
      ) : (
        showUsers && (
          <div className="homeright">
            {users && users.length > 0 ? (
              users.map((user) => (
                <User key={user._id} avatar={user.avatar.url} name={user.name} userId={user._id} />
              ))
            ) : (
              <Typography>No users yet</Typography>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
