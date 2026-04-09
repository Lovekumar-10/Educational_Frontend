




import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeletionNoticeModal = ({
  show,
  message,
  onClose,
  onRecover,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900">
              ⚠️ Account Deletion Notice
            </h2>

            {/* Message */}
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              {message || "Your account is scheduled for deletion."}
            </p>

            {/* Info */}
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border">
              Your account is still recoverable. After the deadline, it will be permanently deleted.
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                Return to Login
              </button>

              <button
                onClick={onRecover}
                className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Recover My Account
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeletionNoticeModal;