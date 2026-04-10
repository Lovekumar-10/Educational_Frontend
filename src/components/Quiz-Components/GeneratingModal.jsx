import React, { useState, useEffect } from 'react';

const GeneratingModal = ({ isOpen }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Estimated 15 seconds

  const loadingStatuses = [
    "Reading your content...",
    "Identifying key concepts...",
    "Drafting smart questions...",
    "Applying difficulty settings...",
    "Finalizing your practice quiz...",
    "Almost there, just a few seconds..."
  ];

  useEffect(() => {
    // CRITICAL: Reset the timer to 15 whenever the modal opens
    if (isOpen) {
      setTimeLeft(15); 
      setStatusIndex(0);
    } else {
      return; // Don't run intervals if closed
    }


    // Rotate status text every 2.5 seconds
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % loadingStatuses.length);
    }, 2500);

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(timerInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop with heavy blur for focus */}
      <div className="absolute inset-0 bg-[var(--color-dark-purple)]/20 backdrop-blur-xl" />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-sm rounded-[32px] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] text-center animate-in fade-in zoom-in duration-300">
        
        {/* Animated AI Loader */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-4 border-[var(--color-lighter-pink)] rounded-full" />
            <div className="absolute inset-0 border-4 border-t-[var(--color-purple)] rounded-full animate-spin" />
            
            {/* Inner pulsing orb */}
            <div className="absolute inset-4 bg-gradient-to-tr from-[var(--color-purple)] to-[#c084fc] rounded-full animate-pulse flex items-center justify-center shadow-lg shadow-purple-200">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-[var(--color-dark-purple)] mb-3">
          Generating
        </h2>
        
        <div className="h-12 flex items-center justify-center">
            <p className="text-[var(--color-gray)] font-medium animate-pulse transition-all duration-500">
                {loadingStatuses[statusIndex]}
            </p>
        </div>

        {/* Expected Time Indicator */}
        <div className="mt-8 pt-6 border-t border-gray-50">
            <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                <span className="text-[10px] font-black text-[var(--color-purple)] uppercase tracking-widest">
                    AI Engine Active
                </span>
            </div>
            <p className="text-xs text-[var(--color-lighter-gray)] font-medium">
                Estimated time: <span className="text-[var(--color-dark-purple)] font-bold">{timeLeft}s</span>
            </p>
        </div>

      </div>

      {/* Internal CSS for the smooth animation if not using Tailwind's default animate-spin */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes morph {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          50% { border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%; }
        }
      `}} />
    </div>
  );
};

export default GeneratingModal;