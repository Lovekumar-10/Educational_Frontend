import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken as refreshTokenAPI,
  logoutAllDevices,
  getCurrentUser,
  deleteAccount,
  cancelDeletion,
  forgotPassword as forgotPasswordAPI,
  resetPassword as resetPasswordAPI,
} from "../utils/authAPI";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await getCurrentUser();
  //       if (res.data?.user) {
  //         setUser(res.data.user);
  //       }
  //     } catch (err) {

  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser(); // /auth/me
        if (res.data?.user) {
          setUser(res.data.user); // user logged in
        } else {
          setUser(null); // no user, first-time visitor
        }
      } catch (err) {
        // 🔹 IGNORE first-time 401 for /me
        if (err.response?.status === 401) {
          setUser(null); // simply no user, no console error
        } else {
          console.error(err); // real errors only
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setUser(res.data.user);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await registerUser(name, email, password);

      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const logoutAll = async () => {
    try {
      await logoutAllDevices();
    } finally {
      setUser(null);
    }
  };

  const forgotPassword = async (email) => {
    const res = await forgotPasswordAPI(email);
    return res.data;
  };

  const resetPassword = async (token, newPassword, confirmPassword) => {
    const res = await resetPasswordAPI(token, newPassword, confirmPassword);
    return res.data;
  };

  const deleteAccountAction = async () => {
    try {
      const res = await deleteAccount();
      // mark user as pending deletion
      setUser((prev) => ({ ...prev, pendingDeletion: true ,   deletionRequestedAt: new Date(), }));
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const cancelDeletionAction = async () => {
    try {
      const res = await cancelDeletion();
      // cancel pending deletion
      setUser((prev) => ({ ...prev, pendingDeletion: false }));
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        logoutAll,
        deleteAccount: deleteAccountAction, 
        cancelDeletion: cancelDeletionAction, 
        forgotPassword,
        resetPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);