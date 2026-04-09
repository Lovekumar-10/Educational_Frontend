
import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";

import PublicRoute from "./guards/PublicRoute";

const PublicRoutes = () => (
  <Route element={<PublicLayout />}>
    <Route path="/" element={
        <PublicRoute>
          <Home />
        </PublicRoute>
      }
    />

    <Route path="/about" element={
        <PublicRoute>
          <About />
        </PublicRoute>
      }
    />
  </Route>
);

export default PublicRoutes;