import { Navigate } from "react-router-dom";

const isAuthenticated = false;

const ProtectedRoute = ({ children }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;














// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/authContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return null; // ya loader

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;