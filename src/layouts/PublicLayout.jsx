// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)]">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-0">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;

