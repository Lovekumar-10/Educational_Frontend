


import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/DashboardSidebar";
import TopBar from "../components/common/DashboardTopbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* Sidebar */}
      <Sidebar activeItem="Dashboard" />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Topbar */}
        <TopBar />

        {/* Content (NO padding, NO margin) */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
