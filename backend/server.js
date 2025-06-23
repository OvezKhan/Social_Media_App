   const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "config/config.env") });


const app = require("./app");
const { connectDatabase } = require("./config/db");
const cloudinary = require("cloudinary");

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});