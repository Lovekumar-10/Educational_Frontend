

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/DashboardSidebar";
import TopBar from "../components/common/DashboardTopbar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar activeItem="Dashboard" />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />

        <main style={{ flex: 1, backgroundColor: "#f9f9f9", overflowY: "auto", padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;