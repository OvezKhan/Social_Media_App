import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // your backend API URL
axios.defaults.withCredentials = true; // ✅ important for sending cookies

export default axios;
