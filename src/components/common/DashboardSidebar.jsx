import React, { useState } from "react";
import {
  LayoutGrid,
  Brain,
 Book ,
  FileText ,
  Layers,
  Network ,
  BookOpen,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ activeItem: initialActive = "Dashboard" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(initialActive);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/dashboard" },
    {
      name: "Quiz practice",
      icon: <Brain size={20} />,
      path: "/dashboard/quiz-practice",
    },
    {
      name: "AI Notes Generator",
      icon: <BookOpen size={20} />,
      path: "/dashboard/ai-notes-generator",
    },
    {
      name: "AI Flashcard Generator",
      icon: <Layers size={20} />,
      path: "/dashboard/ai-flashcard-generator",
    },
    {
      name: "Pdf Summarizer",
      icon: <FileText size={20} />,
      path: "/dashboard/pdf-summarizer",
    },
     {
      name: "Mind map",
      icon: <Network  size={20} />,
      path: "/dashboard/mind-map",
    },
    {
      name: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/messages",
    },
     {
      name: "My Library",
      icon: <Book size={20} />,
      path: "/dashboard/my-library",
    },
  ];

  return (
    <aside
      className={`h-screen flex flex-col bg-[#0F0F10] border-r border-white/5 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[70px]" : "w-[260px]"
      }`}
    >
      {/* --- HEADER / LOGO --- */}
      <div
        className="h-[72px] flex items-center px-4 mb-4 relative overflow-hidden"
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <div
          className={`flex items-center w-full ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
              {/* <span className="text-white font-bold text-sm">D</span> */}
              <div className="w-9 h-9 rounded-2xl overflow-hidden ring-2 ring-purple-500/20 shrink-0 shadow-lg shadow-purple-500/10">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Love"
                  alt="Logo"
                  className="w-full h-full object-cover bg-[#1a1a1a]"
                />
              </div>
            </div>
            {!collapsed && (
              <span className="text-white font-semibold text-md tracking-tight">
                DevConnect
              </span>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-md text-gray-500 cursor-pointer hover:bg-white/5 hover:text-white transition-all"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {collapsed && isHeaderHovered && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute inset-0 flex items-center cursor-pointer  justify-center bg-[#0F0F10] text-purple-400 transition-all"
            >
              <PanelLeftOpen size={20} />
            </button>
          )}
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path; // <- use currentPath
          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)} // <- navigate to the route
              className={`group relative flex items-center h-11 cursor-pointer rounded-md transition-all duration-200 
        ${collapsed ? "justify-center" : "px-3 gap-3"} 
        ${
          isActive
            ? "bg-gradient-to-r from-purple-500/10 to-transparent text-white"
            : "text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
        }`}
            >
              {isActive && (
                <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-purple-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              )}
              <div
                className={`transition-colors duration-200 ${isActive ? "text-purple-400" : "group-hover:text-gray-200"}`}
              >
                {item.icon}
              </div>
              {!collapsed && (
                <span className="text-[13.5px] font-medium transition-all">
                  {item.name}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-14 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-[#1a1a1a] text-white text-xs py-1.5 px-3 rounded border border-white/10 whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* --- BOTTOM SECTION --- */}
      {/* <div className="p-3 border-t border-white/5">
        <div
          className={`flex items-center h-11 text-gray-400 hover:text-white cursor-pointer rounded-md hover:bg-white/5 transition-all ${collapsed ? "justify-center" : "px-3 gap-3"}`}
        >
          <Settings size={20} />
          {!collapsed && (
            <span className="text-[13.5px] font-medium">Settings</span>
          )}
        </div>
      </div> */}

      {/* --- BOTTOM SECTION --- */}
      <div className="p-3 border-t border-white/5">
        <div
          onClick={() => navigate("/dashboard/Settings")} // Added navigate here
          className={`group relative flex items-center h-11 cursor-pointer rounded-md transition-all duration-200 
    ${collapsed ? "justify-center" : "px-3 gap-3"} 
    ${
      currentPath === "/dashboard/Settings"
        ? "bg-gradient-to-r from-purple-500/10 to-transparent text-white"
        : "text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
    }`}
        >
          {/* Active indicator line */}
          {currentPath === "/dashboard/Settings" && (
            <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-purple-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          )}

          <Settings
            size={20}
            className={
              currentPath === "/dashboard/Settings" ? "text-purple-400" : ""
            }
          />

          {!collapsed && (
            <span className="text-[13.5px] font-medium">Settings</span>
          )}

          {/* Tooltip for collapsed mode */}
          {collapsed && (
            <div className="absolute left-14 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-[#1a1a1a] text-white text-xs py-1.5 px-3 rounded border border-white/10 whitespace-nowrap z-50">
              Settings
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
