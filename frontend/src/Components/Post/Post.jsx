import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  Avatar,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  MoreVert,
} from "@mui/icons-material";

import { deleteCommentOnPost, deletePost, likePost } from "../../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";
import { commentOnPost } from "../../Actions/Post";
// import { getMyPosts } from '../../../../backend/controllers/user';

const Post = ({
  postId,
  postImage,
  caption,
  likes = [],
  comments = [],
  ownerName,
  ownerImage,
  ownerId,
  isAccount = false,
  isDelete = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [liked, setLiked] = useState(false); // Check if user already liked the post
  const [likesUser, setLikesUser] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleLike = async () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    await dispatch(likePost(postId));

    if (isAccount) {
      console.log(`Bring me my posts`);
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleAddComment = async () => {
    if (!commentValue.trim()) return;
    await dispatch(commentOnPost(postId, commentValue));
    setCommentValue("");
    if (isAccount) {
      console.log(`Refresh my posts`);
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    if (isAccount) {
    //   console.log(`Refresh my posts`);
    dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleDelete = () => {
    dispatch(deletePost(postId)); // postId comes from props
  };

  useEffect(() => {
    if (likes && user?._id) {
      const isLiked = likes.some((item) => item._id === user._id);
      setLiked(isLiked);
      setLikeCount(likes.length);
    }
  }, [likes, user?._id]);

  return (
    <div className="post">
      {/* <div className="postHeader">
                {
                    isAccount ? (
                        <Button>
                            <MoreVert />
                        </Button>
                        ) : null

                }
            </div> */}
      {/* <img src={postImage} alt="Post" /> */}

      {postImage ? <img src={postImage} alt="Post" /> : null}

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ width: "3vmax", height: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.542)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
      >
        <Typography>{likeCount} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentsOpen(true)}>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={handleDelete}>
            <DeleteOutline />
          </Button>
        ) : (
          ""
        )}
      </div>

      {/* Likes Dialog */}
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <DialogTitle>Liked by</DialogTitle>
        <DialogContent>
          {likes.length > 0 ? (
            likes.map((likeUser) => (
              <div
                key={likeUser._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1vmax",
                }}
              >
                <Avatar src={likeUser.avatar} sx={{ marginRight: "1vmax" }} />
                <Link to={`/user/${likeUser._id}`}>
                  <Typography>{likeUser.name}</Typography>
                </Link>
              </div>
            ))
          ) : (
            <DialogContentText>No likes yet</DialogContentText>
          )}
        </DialogContent>
      </Dialog>

      {/* comment dialog  */}
      <Dialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        fullWidth
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent dividers>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "1vmax",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography fontWeight="bold">{comment.user.name}</Typography>
                  <Typography>{comment.comment}</Typography>
                </div>

                {/* Delete button for comment author OR post owner */}
          {(comment.user._id === user?._id || ownerId === user?._id) && (
            <Button
              onClick={() => handleDeleteComment(comment._id)}
              style={{ minWidth: "unset", padding: "0.5vmax" }}
            >
              <DeleteOutline style={{ color: "red" }} />
            </Button>
          )}
              </div>
            ))
          ) : (
            <DialogContentText>No comments yet</DialogContentText>
          )}
        </DialogContent>

        <div style={{ display: "flex", padding: "1vmax" }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            style={{
              flex: 1,
              padding: "0.5vmax 1vmax",
              borderRadius: "20px",
              border: "1px solid lightgray",
              outline: "none",
              marginRight: "1vmax",
            }}
          />
          <Button
            onClick={handleAddComment}
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
