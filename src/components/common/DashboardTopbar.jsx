






import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    // Glassmorphism & Sticky placement
    <header className="sticky top-0 z-40 h-[70px] w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4 md:px-8">
      
      {/*Enhanced Search Bar */}
      <div className="relative w-full max-w-[300px] md:max-w-[450px] group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-dark-purple)] transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-gray-100/50 border border-transparent rounded-xl py-2 pl-11 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-purple)]/20 focus:border-[var(--color-dark-purple)] transition-all duration-200"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/*  Notification with Badge */}
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

        {/*  Profile Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-3 p-1 pr-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <div className="w-10 h-10 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-[var(--color-dark-purple)]">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                {user?.name || "Alex Johnson"}
              </span>
              <span className="text-[11px] font-medium text-gray-400">
                {user?.role || "Administrator"}
              </span>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>

          {/* ⬇️ Professional Dropdown */}
          {open && (
            <div className="absolute right-0 top-[120%] w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-50 mb-1 md:hidden">
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <DropdownItem icon={<User size={16} />} label="My Profile" onClick={() => { navigate("/dashboard/profile"); setOpen(false); }} />
              <DropdownItem icon={<Settings size={16} />} label="Settings" onClick={() => { navigate("/dashboard/settings"); setOpen(false); }} />
              
              <div className="my-1 border-t border-gray-50" />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Helper component for cleaner code
const DropdownItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--color-dark-purple)] transition-colors"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default TopBar;