import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Sparkles,
  Globe,
//   Github,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { validatePassword } from "../../utils/passwordValidator";


const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Use the refined validation logic
  const passData = useMemo(() => validatePassword(password), [password]);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Frontend Validation (Keep this manual - it's faster than a server call)
    if (!passData.isValid) {
      notify.error("Please satisfy all password requirements.");
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
    
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      // console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Removed h-screen to allow for full-page scrolling
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-[var(--ff-secondary)]">
      {/* LEFT SIDE: Centered Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[400px] py-12"
        >
          <div className="mb-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Join the community
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Start building with developers worldwide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Love Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-black outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Work Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-black outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-black outline-none text-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Requirements: Clean Checklist Only */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className=" mb-2 px-1">
                      <span className="text-sm  font-black text-slate-400 uppercase tracking-widest">
                        Must contain:
                      </span>
                    </div>

                    <ul className="space-y-2 px-1">
                      {passData.requirements.map((req) => (
                        <li key={req.label} className="flex items-center gap-3">
                          {req.met ? (
                            <Check
                              size={13}
                              className="text-emerald-500"
                              strokeWidth={3}
                            />
                          ) : (
                            <X
                              size={13}
                              className="text-red-500"
                              strokeWidth={3}
                            />
                          )}
                          <span
                            className={`text-xs font-medium transition-colors duration-300 ${req.met ? "text-emerald-700" : "text-red-500"}`}
                          >
                            {req.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={passData.isValid ? { scale: 1.01 } : {}}
              whileTap={passData.isValid ? { scale: 0.99 } : {}}
              type="submit"
              disabled={loading || !passData.isValid}
              className={`w-full py-4 rounded-xl font-black text-sm  flex items-center justify-center gap-2 mt-6 transition-all 
                ${
                  passData.isValid
                    ? "bg-black text-white hover:bg-slate-900 shadow-black/20 cursor-pointer"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700 mb-8">
            {/* <Github size={20} /> */}
            GitHub
          </button>

           <p className="text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
               className="text-black font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Visual Panel (Centered and same as before) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 bg-[var(--color-lighter-pink)] relative overflow-hidden flex-col items-center justify-center p-20"
      >
        {/* Animated Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/40">
              <Globe className="w-4 h-4 text-[var(--color-dark-purple)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-dark-purple)]">
                Global Developer Network
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-[var(--color-dark-purple)] leading-[1.1] mb-6 tracking-tight">
              Start building with developers worldwide.
            </h2>
            <p className="text-[var(--color-dark-purple)]/70 text-lg font-medium leading-relaxed">
              Connect your repositories, invite your team, and start deploying
              in minutes. The future of code is collaborative.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 relative"
          >
            <div className="w-full aspect-video bg-[var(--color-dark-purple)] rounded-3xl shadow-2xl flex items-center justify-center border-[8px] border-white/20">
              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-[var(--color-dark-purple)] bg-slate-200"
                    />
                  ))}
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: [-128, 128] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full w-full bg-[var(--color-lighter-pink)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;