const User = require("../models/User")
const jwt = require("jsonwebtoken");

// exports.isAuthenticated = async (req, res, next) => {
//    try{
//     const token = req.cookies.token;
//     // console.log(token)
//     // console.log(req.cookies.token)  
//     if (!token) {
//         return res.status(401).json({msg: "Please login to access this resource"});
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//         // console.log(decoded)
//         req.user = await User.findById(decoded.id);
//         // console.log(req.user)

//         next();
//    }
//    catch(err){
//     console.log(err)
//     return res.status(500).json({msg: "Internal Server Error"});
//     }
// }


exports.isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // ✅ Check for token in cookie first
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // ✅ Then fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
