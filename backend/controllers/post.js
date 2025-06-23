const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");


exports.createPost = async (req, res) => {
    try {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.file, {
        folder: "posts",
      });
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        owner: req.user._id,
      };
  
      const post = await Post.create(newPostData);
  
      const user = await User.findById(req.user._id);
  
      user.posts.unshift(post._id);
  
      await user.save();
      res.status(201).json({
        success: true,
        message: "Post created",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


exports.likeAndUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found"})
            }
            
            if(post.likes.includes(req.user._id)){
                const index = post.likes.indexOf(req.user._id);
                post.likes.splice(index , 1);
                await post.save();
                res.status(200).json({ success: true, message: "Post unliked" });
            }
            else{
                post.likes.push(req.user._id);
                await post.save();
                res.status(200).json({ success: true, message: "Post liked" });
                }
           
                    } catch (error) {
                        res.status(500).json({ success: false, message: error.message });
                        }
}

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found"})
            }

             if(post.owner.toString() !== req.user._id.toString()){
                return res.status(403).json({ success: false, message: "Unauthorized"})
                }

                await cloudinary.v2.uploader.destroy(post.image.public_id);

                await post.deleteOne();


                const user = await User.findById(req.user._id);
                // user.posts = user.posts.filter((id) => id.toString() !== postId);
                const index = user.posts.indexOf(postId);
                user.posts.splice(index , 1);
                await user.save();

                res.status(200).json({ success: true, message: "Post deleted" });
                } catch (error) {
                    res.status(500).json({ success: false, message: error.message });
                    }
}




exports.getPostOfFollowing = async(req,res) => {
    try{
        // const user = await User.findById(req.user._id).populate("following" , "posts");
 
    //     res.status(200).json({
    //     success:true,
    //     following:user.following
    // })



    const user = await User.findById(req.user._id);
    // console.log("Following users:", user.following);

    const posts = await Post.find({
        owner : {
            $in : user.following
        }
    }).populate("owner likes comments.user")

    res.status(200).json({
        success:true,
        posts:posts.reverse()
    })

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }

}


exports.updateCaption = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ success: false, message: "Post not found"})
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({ success: false, message: "You can't update password"})
            }
            
        post.caption = req.body.caption;
        await post.save();
        res.status(200).json({ success: true, message: "Caption updated" });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}