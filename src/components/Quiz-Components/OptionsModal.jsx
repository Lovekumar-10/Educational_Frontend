import React, { useState, useRef, useEffect } from 'react';
import { X, Clock, Check, ChevronsUpDown } from 'lucide-react';

/* =====================================
   CUSTOM DROPDOWN COMPONENT
   ===================================== */
const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
      <label className="text-[10px] font-black text-[var(--color-purple)] uppercase tracking-[0.15em] ml-1">
        {label}
      </label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#f8f6ff] border-2 border-transparent hover:border-[var(--color-lighter-pink)] rounded-2xl px-5 py-3.5 flex items-center justify-between text-[var(--color-dark-purple)] font-bold cursor-pointer transition-all outline-none group"
      >
        <span className="truncate">{value}</span>
        <ChevronsUpDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-purple)]' : 'text-gray-400'}`} />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-[var(--color-lighter-pink)] z-[120] py-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[220px] overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-5 py-3 mx-2 rounded-xl cursor-pointer flex items-center justify-between transition-colors mb-1 ${
                value === option 
                ? 'bg-[var(--color-lighter-pink)] text-[var(--color-purple)] font-bold' 
                : 'text-[var(--color-dark-purple)] hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">{option}</span>
              {value === option && <Check size={14} strokeWidth={3} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =====================================
   MAIN OPTIONS MODAL COMPONENT
   ===================================== */
const OptionsModal = ({ isOpen, onClose }) => {
  const [isTimerOn, setIsTimerOn] = useState(true);
  const [formData, setFormData] = useState({
    type: 'Multiple Choice',
    language: 'English',
    count: '10 Questions',
    difficulty: 'Medium'
  });

  if (!isOpen) return null;

  const languages = [
    "English", "Hindi", "Spanish", "French", "German", 
    "Chinese", "Japanese", "Arabic", "Portuguese", "Russian",
    "Italian", "Korean", "Dutch", "Turkish", "Bengali",
    "Punjabi", "Marathi", "Telugu", "Tamil", "Gujarati"
  ];

  const questionCounts = ["5 Questions", "10 Questions", "15 Questions", "20 Questions", "35 Questions"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const quizTypes = ["Multiple Choice", "True / False", "Short Answer", "Fill-in-the-blank", "Bullet Points"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--color-dark-purple)]/30 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[var(--radius-lg)] shadow-[0_20px_60px_-15px_rgba(58,0,52,0.3)] overflow-visible animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-lighter-pink)] bg-white rounded-t-[var(--radius-lg)] sticky top-0 z-20">
          <h2 className="text-[var(--fs-h5)] font-bold text-[var(--color-dark-purple)] tracking-tight">
            Quiz Options
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-50 rounded-full transition-all text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <CustomSelect 
              label="Question Type" 
              options={quizTypes} 
              value={formData.type}
              onChange={(val) => setFormData({...formData, type: val})}
            />

            <CustomSelect 
              label="Language" 
              options={languages} 
              value={formData.language}
              onChange={(val) => setFormData({...formData, language: val})}
            />

            <CustomSelect 
              label="Max Questions" 
              options={questionCounts} 
              value={formData.count}
              onChange={(val) => setFormData({...formData, count: val})}
            />

            <CustomSelect 
              label="Difficulty Level" 
              options={difficulties} 
              value={formData.difficulty}
              onChange={(val) => setFormData({...formData, difficulty: val})}
            />
          </div>

          {/* Timer Working Toggle */}
          <div className="flex items-center justify-between bg-[var(--color-lighter-pink)] p-5 rounded-2xl border border-[var(--color-purple)]/5 mt-2">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-all duration-300 ${isTimerOn ? 'bg-[var(--color-purple)] text-white shadow-lg shadow-purple-200' : 'bg-white text-gray-300'}`}>
                <Clock size={22} />
              </div>
              <div>
                <p className="font-bold text-[var(--color-dark-purple)] text-sm">Quiz Timer</p>
                <p className="text-[10px] text-[var(--color-gray)] font-medium">Track speed per question</p>
              </div>
            </div>
            
            {/* Functional Toggle */}
            <div 
              onClick={() => setIsTimerOn(!isTimerOn)}
              className="flex bg-white p-1 rounded-full border-2 border-[var(--color-purple)]/10 cursor-pointer w-28 h-10 relative shadow-inner overflow-hidden"
            >
              <div className={`flex-1 text-center self-center text-[10px] font-black z-10 transition-colors duration-300 ${isTimerOn ? 'text-white' : 'text-gray-400'}`}>
                ON
              </div>
              <div className={`flex-1 text-center self-center text-[10px] font-black z-10 transition-colors duration-300 ${!isTimerOn ? 'text-[var(--color-dark-purple)]' : 'text-gray-400'}`}>
                OFF
              </div>
              {/* Sliding Background Indicator */}
              <div className={`absolute top-1 bottom-1 w-[50px] bg-[var(--color-purple)] rounded-full transition-all duration-300 shadow-md ${isTimerOn ? 'left-1' : 'left-[54px] bg-gray-200'}`}>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1 text-[var(--color-gray)]">
            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
               <Check size={10} className="text-green-600" strokeWidth={4} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Auto-saved to your preferences</p>
          </div>

          {/* Action Button */}
          <button 
            onClick={onClose}
            className="w-full bg-[var(--color-purple)] text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 shadow-lg shadow-purple-100 transition-all cursor-pointer active:scale-[0.98] mt-2"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;