const User = require("../models/User")
const Post = require("../models/Post")
const {sendEmail} = require("../middleware/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;
  
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
  
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
  
      user = await User.create({
        name,
        email,
        password,
        avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
      });
  
      const token = await user.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  




// login

exports.login = async (req, res) => {
    try {
        const {email , password} = req.body;
        console.log(email , password)
        const user = await User.findOne({email}).select("+password").populate("posts following followers");
        if(!user) {
            return res.status(400).json({ success : false , message : "Invalid email or password" })
            }
            const isMatch = await user.comparePassword(password);
            if(!isMatch) {
                return res.status(400).json({ success : false , message : "Invalid email or password"})
                }
                const token = await user.generateToken();

               const options = {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
  httpOnly: true,
  sameSite: "None", // or "None" if cross-site
  secure: true,
  path: "/"
};


                res.status(200).cookie("token", token , options).setHeader("Access-Control-Allow-Credentials", "true").json({ success : true , user , token })
                // res.status(200).json({ success : true , user , token })

    } catch (error) {
        res.status(500).json({ success:false ,  message: error.message })

        
    }
}


// exports.logout = async (req,res) =>{
//     try {
//         res.status(200).cookie("token",null , {expires: new Date(Date.now()) , httpOnly:true}).json({
//             success : true ,
//             message : "Logged out successfully"
//             })
//         }catch (error) {
//             res.status(500).json({ success:false ,  message: error.message })
//             }
// }


exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        path: "/", // make sure this matches the login cookie's path
      })
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





exports.followUser = async (req, res) => {
    const loggedInUser = await User.findById(req.user._id);
    const userToFollow = await User.findById(req.params.id);
    try {
        if(!userToFollow){
            return res.status(404).json({ success : false , message : "User not found"})
        }
        if(loggedInUser.following.includes(userToFollow._id)){
            const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
            const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
            loggedInUser.following.splice(indexfollowing, 1);
            userToFollow.followers.splice(indexfollowers , 1)
            await loggedInUser.save();
            await userToFollow.save();

            return res.status(200).json({ success : true , message : "User Unfollowed Successfully" })
            }
           
                loggedInUser.following.push(userToFollow._id);
                userToFollow.followers.push(loggedInUser._id);

                
                await loggedInUser.save();
                await userToFollow.save();

                res.status(200).json({ success : true , message : "User followed successfully" })
            

        }catch(err){
            res.status(500).json({ success:false ,  message: err.message })
            
        }

}




exports.updatePassword = async (req, res) => {
    const {oldPassword , newPassword} = req.body;
    const user = await User.findById(req.user._id).select("+password");
    try {
        if(!user){
            return res.status(404).json({ success : false , message : "User not found"})
            }

            if(!oldPassword || !newPassword){
                return res.status(400).json({ success : false , message : "Please enter both old password and new password" })
                    }

            const isMatch = await user.comparePassword(oldPassword);
            // console.log("Password from request body:", oldPassword);

            if(!isMatch){
                return res.status(400).json({ success : false , message : "Password is incorrect"})
                }

                user.password = newPassword;
                await user.save();
                res.status(200).json({ success : true , message : "Password updated successfully" })
                }catch(err){
                    res.status(500).json({ success:false ,  message: err.message })
                }
}



exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    // Avatar handling
    if (avatar) {
      // Delete old avatar if exists
     if (user.avatar?.public_id) {
  try {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  } catch (err) {
    console.warn("Failed to delete old avatar:", err.message);
  }
}

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userId = user._id;

    const followers = user.followers;
    const following = user.following;
    const posts = user.posts;

    //  Delete avatar from Cloudinary
    if (user.avatar && user.avatar.public_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar.public_id);
        console.log("Avatar deleted:", user.avatar.public_id);
      } catch (cloudError) {
        console.error("Cloudinary avatar deletion error:", cloudError.message);
      }
    }

    //  Delete all posts and their images from Cloudinary
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);

      //  Delete post image from Cloudinary
      if (post && post.image && post.image.public_id) {
        try {
          await cloudinary.uploader.destroy(post.image.public_id);
          console.log("Post image deleted:", post.image.public_id);
        } catch (imgError) {
          console.error("Cloudinary post image deletion error:", imgError.message);
        }
      }

      //  Delete post document from DB
      if (post) await post.deleteOne();
    }

    //  Remove user from followers' following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      if (index !== -1) {
        follower.following.splice(index, 1);
        await follower.save();
      }
    }

    //  Remove user from followings' followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);
      const index = follows.followers.indexOf(userId);
      if (index !== -1) {
        follows.followers.splice(index, 1);
        await follows.save();
      }
    }


    // remove all comments of the user from all posts
    const allPosts = await Post.find();
    for(let i = 0 ; i < allPosts.length ; i++){
      const post = await Post.findById(allPosts[i]._id);
      const index = post.comments.indexOf(userId);

      for(let j = 0 ; j < post.comments.length ; j++){
        if(post.comments[j].user === userId){
          post.comments.splice(j,1);
        }
      }
      await post.save();
      }


    // remove all likes of the user from all posts

       for(let i = 0 ; i < allPosts.length ; i++){
      const post = await Post.findById(allPosts[i]._id);
      const index = post.likes.indexOf(userId);

      for(let j = 0 ; j < post.likes.length ; j++){
        if(post.likes[j] === userId){
          post.likes.splice(j,1);
        }
      }
      await post.save();
      }



    //  Finally, delete user document
    await user.deleteOne();

    //  Clear cookie
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.status(200).json({ success: true, message: "Profile and associated data deleted successfully" });
  } catch (error) {
    console.error(" Profile deletion error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




exports.myProfile = async (req, res) => {
  try {
    console.log("Cookies:", req.cookies);

    const user = await User.findById(req.user._id)
      .populate({
        path: "posts",
        populate: {
          path: "owner",
          select: "name avatar", // Optional: just get these fields
        },
      })
      .populate("followers", "name avatar")
      .populate("following", "name avatar");

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "posts",
        populate: {
          path: "owner",
          select: "name avatar",
        },
      })
      .populate({
        path: "followers",
        model: "User",
        select: "_id name avatar",
      })
      .populate({
        path: "following",
        model: "User",
        select: "_id name avatar",
      });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



exports.getAllUser = async(req,res) =>{
    try {
        const users = await User.find({
          name : {$regex : req.query.name , $options: "i"},
        });
        res.status(200).json({ success : true , users });
        }catch(err){
            res.status(500).json({ success: false, message: err.message });
            }
    

}

exports.commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Check if the comment already exists
        let commentIndex = -1;

        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        });

        if (commentIndex !== -1) {
            // Update the existing comment
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();
            return res.status(200).json({ success: true, message: "Comment updated" });
        } else {
            // Add a new comment
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
            });
            await post.save();
            return res.status(200).json({ success: true, message: "Comment added" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



exports.deleteComment = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found"})
                }
                // 1st method
                // const commentIndex = post.comments.findIndex((comment) => comment.user.toString() === req.user._id.toString());
                // if (commentIndex === -1) {
                //     return res.status(404).json({ success: false, message: "Comment not found"})
                //     }
                //     post.comments.splice(commentIndex, 1);


                // 2nd method
                // checking if owner wants to delete
                if (post.owner.toString() == req.user._id.toString()) {
                    if(req.body.commentId == undefined){
                        return res.status(404).json({ success: false, message: "Comment ID is required"})
                    }
                    post.comments.forEach((item, index) => {
                        if (item._id.toString() === req.body.commentId.toString()) {
                           return post.comments.splice(index,1);
                        }
                    });
                    await post.save();
                    return res.status(200).json({ success: true, message: "Selected Comment has deleted" });
                } else {
                    post.comments.forEach((item, index) => {
                        if (item.user.toString() === req.user._id.toString()) {
                           return post.comments.splice(index,1);
                        }
                    });
                    await post.save();
                    return res.status(200).json({ success: true, message: "Comment deleted" });
                }




                    
                    } catch (err) {
                        res.status(500).json({ success: false, message: err.message });
                        }

}





exports.forgotPassword = async(req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found"});
            }
            const resetPasswordToken = user.getResetPasswordToken();
            console.log(resetPasswordToken);
            
            await user.save();

            const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetPasswordToken}`;

            const message = "Reset your password by clicking on the link below\n\n" + resetUrl;

            try {
                await sendEmail({
                    email:user.email,
                    subject:"Reset Password",
                    message,
                    });
                    res.status(200).json({ success: true, message: `Email sent to ${user.email}`})


            } catch (error) {
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;
await user.save();
res.status(500).json({ success: false, message: error.message });

                
            }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}


exports.resetPassword = async(req,res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }});
    if(!user){
        return res.status(404).json({ success: false, message: "Invalid token or expired"})
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}




exports.getMyPosts = async (req,res) => {
    try {
        const user = await User.findById(req.user._id);

        const posts = [];
        for(let i = 0 ; i < user.posts.length ; i++){
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
            }
            res.status(200).json({
                success: true,
                posts
            });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
        
    }
}




exports.getUserPosts = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);

        const posts = [];
        for(let i = 0 ; i < user.posts.length ; i++){
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
            }
            res.status(200).json({
                success: true,
                posts
            });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
        
    }
}