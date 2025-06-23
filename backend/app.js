const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path"); // ✅ required for serving static files

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./backend/config/config.env" });
}

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Routes
const post = require("./routes/post");
const user = require("./routes/user");
app.use("/api/v1", post);
app.use("/api/v1", user);



module.exports = app;
