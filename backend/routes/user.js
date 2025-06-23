const express = require('express');
const { register, login, followUser, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUser, commentOnPost, deleteComment, forgotPassword, resetPassword, getUserPosts } = require('../controllers/user');
const {isAuthenticated} = require('../middleware/auth');
const { getMyPosts } = require('../controllers/user');

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/follow/:id").get(isAuthenticated , followUser);
router.route("/logout").get(logout)
router.route("/update/password").put(isAuthenticated ,updatePassword)
router.route("/update/profile").put(isAuthenticated ,updateProfile)
router.route("/delete/me").delete(isAuthenticated , deleteMyProfile)
router.route('/my/posts').get(isAuthenticated , getMyPosts)
router.route("/me").get(isAuthenticated , myProfile)
router.route("/user/:id").get(isAuthenticated , getUserProfile)
router.route("/userposts/:id").get(isAuthenticated , getUserPosts)

router.route("/users").get(isAuthenticated , getAllUser)
router.route("/post/comment/:id").put(isAuthenticated , commentOnPost).delete(isAuthenticated , deleteComment);
router.route("/forgot/password").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

module.exports = router 