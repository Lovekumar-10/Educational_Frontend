
import { Navigate } from "react-router-dom";

const isAuthenticated = false;

const PublicRoute = ({ children }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;





// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/authContext";

// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return null; // ya loader

//   return !user ? children : <Navigate to="/dashboard" replace />;
// };

// export default PublicRoute;