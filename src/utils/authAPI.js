

import axios from "axios"; 
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:5000/api"; 
// const BASE_URL = "https://auth-system-backend-h2wa.onrender.com/api"; 


// Login API
export const loginUser = (email, password) =>
  axiosInstance.post("/auth/login", { email, password });

// Register API
export const registerUser = (name, email, password) =>
  axiosInstance.post("/auth/register", { name, email, password });

// Logout API
export const logoutUser = () =>
  axiosInstance.post("/auth/logout");

// logout all devices
export const logoutAllDevices = () =>
  axiosInstance.post("/auth/logout-all");

// ✅ FIX: Refresh token should NOT use axiosInstance to avoid loops
export const refreshToken = () =>
  axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });

// Get current user
export const getCurrentUser = () =>
  axiosInstance.get("/auth/me");

// Forgot Password
export const forgotPassword = (email) =>
  axiosInstance.post("/auth/forgot-password", { email });

// Reset Password
export const resetPassword = (token, newPassword, confirmPassword) =>
  axiosInstance.post(`/auth/reset-password/${token}`, {
    newPassword,
    confirmPassword,
  });
  

  // Delete account (marks for deletion)
export const deleteAccount = () =>
  axiosInstance.post("/auth/delete-account"); // no body needed

// Cancel pending deletion
export const cancelDeletion = () =>
  axiosInstance.post("/auth/cancel-deletion"); // no body needed



  