import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose, IoMoon } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the "Capsule" mode after 50px of scrolling
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 flex justify-center px-4 transition-all duration-500">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: isScrolled ? 20 : 0, // Slides down from the top on scroll
          opacity: 1,
          backgroundColor: isScrolled
            ? "var(--color-purple)"
            : "transparent",
          width: isScrolled ? "90%" : "100%",
          borderRadius: isScrolled ? "100px" : "0px",
          boxShadow: isScrolled ? "var(--shadow-hover)" : "none",
          paddingLeft: isScrolled ? "40px" : "20px",
          paddingRight: isScrolled ? "40px" : "20px",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="max-w-7xl h-20 flex items-center justify-between backdrop-blur-md border-b border-transparent relative"
      >
        {/* LEFT SIDE: Brand Logo */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-all duration-300 hover:opacity-60 cursor-pointer ${
                  location.pathname === link.path
                    ? "text-[var(--color-dark-purple)]"
                    : "text-[var(--color-gray)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Auth Buttons & Toggles */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 text-sm font-bold text-[var(--color-dark-purple)] hover:opacity-70 transition-all cursor-pointer"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-7 py-3 bg-[var(--color-dark-purple)] text-white text-sm font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              GET STARTED
            </Link>
          </div>

          {/* Theme Toggle Button (Visual Only - Non-functional as requested) */}
          <button className="p-3 rounded-full bg-white/50 text-[var(--color-dark-purple)] shadow-inner transition-all hover:bg-white cursor-pointer">
            <IoMoon size={20} className="cursor-pointer" />
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--color-dark-purple)] cursor-pointer"
          >
            {isOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-28 left-4 right-4 bg-[var(--color-lighter-pink)] p-8 rounded-[30px] shadow-2xl border border-[var(--color-dark-purple)]/10 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-[var(--color-dark-purple)] cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-[var(--color-dark-purple)]/10" />
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-[var(--color-dark-purple)] cursor-pointer"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-[var(--color-dark-purple)] text-white py-4 rounded-2xl text-center font-bold cursor-pointer"
            >
              GET STARTED
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;













