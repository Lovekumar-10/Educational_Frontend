import { Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import PublicRoute from "./guards/PublicRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


const AuthRoutes = () => (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute>  <Register/></PublicRoute>} />
   
  </Route>
);

export default AuthRoutes;