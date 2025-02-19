import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor to add token
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // console.log(
          //   "Error caught from axios interceptor -->",
          //   error.response
          // );
          localStorage.removeItem("access-token"); // Clear token on unauthorized
          await logOut(); // Call logout function
          navigate("/login"); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
