import axios from "axios";

// In a monorepo setup on Vercel, the frontend and backend will share the same domain.
// So, in production, we can use a relative path for the API.
// In development, we still point to the local backend server.
const BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
