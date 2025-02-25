import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://electronicsstorewebapp.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
      }
})