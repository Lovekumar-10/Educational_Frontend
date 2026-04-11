
import React, { useState, useEffect, useRef } from 'react';
import { 
  Share2, 
  Edit3, 
  Download, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  MoreVertical,
  X 
} from 'lucide-react';

const QuizInterface = ({ showTimer = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalTime = 900;
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const questions = [
    {
      id: 1,
      category: "CERTIFICATION: PROFESSIONAL TIER",
      question: "In the context of asynchronous architectural patterns, which mechanism best ensures eventual consistency across distributed microservices without direct temporal coupling?",
      options: [
        "Synchronous RESTful request-response loops with retries",
        "Event-driven choreography via an idempotent message bus",
        "Shared database access using distributed locking protocols",
        "Tight orchestration through a centralized state machine",
      ],
    },
    {
      id: 2,
      category: "REACT DEVELOPMENT",
      question: "Which hook is used to handle side effects in a functional component?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
    },
    {
      id: 3,
      category: "DATABASE DESIGN",
      question: "Which normal form ensures that there are no partial dependencies on a composite primary key?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
    },
  ];

  useEffect(() => {
    if (!showTimer) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  const handleSelect = (idx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: idx });
  };

  return (
    <div className="h-full w-full flex flex-col font-[var(--ff-primary)] bg-[var(--color-lighter-pink)] overflow-hidden">
      
      {/* HEADER - LOCKED AT TOP */}
      <header className="sticky top-0 z-50 shrink-0 px-4 md:px-8 py-3 flex justify-between items-center bg-white border-b border-purple-100 shadow-sm">
        
        {/* LEFT: PROGRESS */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[var(--color-lighter-gray)] uppercase tracking-wider">
            {questions[currentIndex].category}
          </span>
          <p className="text-xs md:text-sm font-bold text-[var(--color-dark-purple)]">
            Q{currentIndex + 1} <span className="text-gray-400 font-normal">of {questions.length}</span>
          </p>
        </div>

        {/* RIGHT SIDE GROUP */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* TIMER */}
          <div className="relative flex items-center justify-center">
            <svg className="w-9 h-9 md:w-11 md:h-11 transform -rotate-90">
              <circle cx="50%" cy="50%" r={radius} stroke="#F3F4F6" strokeWidth="2.5" fill="transparent" />
              <circle
                cx="50%" cy="50%" r={radius}
                stroke="var(--color-purple)"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[9px] font-bold text-[var(--color-dark-purple)]">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { icon: <Share2 size={16} />, label: "Share" },
              { icon: <Edit3 size={16} />, label: "Edit" },
              { icon: <Download size={16} />, label: "Export" },
              { icon: <Bookmark size={16} />, label: "Save", primary: true },
            ].map((btn, i) => (
              <button 
                key={i}
                className={`p-2 rounded-md transition-all ${
                  btn.primary 
                  ? "bg-[var(--color-yellow)] text-[var(--color-dark-purple)]" 
                  : "text-gray-400 hover:bg-gray-50"
                }`}
                title={btn.label}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* MOBILE 3-DOT MENU */}
          <div className="md:hidden relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? <X size={20} /> : <MoreVertical size={20} />}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-purple-100 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in duration-200">
                {[
                  { icon: <Share2 size={16} />, label: "Share" },
                  { icon: <Edit3 size={16} />, label: "Edit Quiz" },
                  { icon: <Download size={16} />, label: "Export PDF" },
                  { icon: <Bookmark size={16} />, label: "Save Progress", primary: true },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold text-gray-600 hover:bg-[var(--color-lighter-pink)] transition-colors"
                  >
                    <span className={item.primary ? "text-[var(--color-purple)]" : ""}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - SCROLLABLE AREA */}
      <main className="flex-1 overflow-y-auto px-5 py-8 md:py-12 flex justify-center scroll-smooth">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-sm md:text-lg font-bold text-[var(--color-dark-purple)] leading-relaxed">
              {questions[currentIndex].question}
            </h2>
            <div className="h-1 w-10 bg-[var(--color-yellow)] mt-3 rounded-full"></div>
          </div>

          <div className="space-y-3">
            {questions[currentIndex].options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${isSelected ? "border-[var(--color-purple)] bg-white shadow-md" : "border-transparent bg-white/60 hover:bg-white"}`}
                >
                  <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold
                    ${isSelected ? "bg-[var(--color-purple)] text-white" : "bg-purple-50 text-[var(--color-purple)]"}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-[11px] md:text-sm font-medium ${isSelected ? "text-black" : "text-gray-500"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER - LOCKED AT BOTTOM */}
      <footer className="sticky bottom-0 z-50 shrink-0 px-6 py-4 border-t border-purple-500 flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex(prev => prev - 1)}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 text-[11px] font-bold ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "text-[var(--color-purple)]"}`}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 bg-[var(--color-purple)]" : "w-1.5 bg-gray-200"}`} />
          ))}
        </div>

        <button
          onClick={() => currentIndex === questions.length - 1 ? alert("Submitted") : setCurrentIndex(prev => prev + 1)}
          disabled={selectedAnswers[currentIndex] === undefined}
          className={`px-5 py-2.5 rounded-lg text-[11px] font-bold text-white transition-all
          ${selectedAnswers[currentIndex] !== undefined ? "bg-[var(--color-dark-purple)] shadow-lg hover:opacity-90 active:scale-95" : "bg-gray-300 cursor-not-allowed"}`}
        >
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </footer>
    </div>
  );
};

export default QuizInterface;









