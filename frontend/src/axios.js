import axios from "axios";

axios.defaults.baseURL="https://social-media-app-backend-h66o.onrender.com"; // your backend API URL
axios.defaults.withCredentials = true; // ✅ important for sending cookies

export default axios;
