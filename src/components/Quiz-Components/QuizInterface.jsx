import React, { useState, useEffect } from 'react';
import { Clock3 } from 'lucide-react';

const QuizInterface = ({ showTimer = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  // TIMER
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

  // SAMPLE DATA
  const questions = [
    {
      id: 1,
      category: "CERTIFICATION: PROFESSIONAL TIER",
      question:
        "In the context of asynchronous architectural patterns, which mechanism best ensures eventual consistency across distributed microservices without direct temporal coupling?",
      options: [
        "Synchronous RESTful request-response loops with retries",
        "Event-driven choreography via an idempotent message bus",
        "Shared database access using distributed locking protocols",
        "Tight orchestration through a centralized state machine",
      ],
    },
  ];

  const handleSelect = (idx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: idx });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col">

      {/* HEADER */}
      <header className="px-8 py-4 flex justify-between items-center border-b border-gray-200 bg-white">
        
        {/* CATEGORY */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {questions[currentIndex].category}
        </p>

        {/* PROGRESS */}
        <p className="text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </p>

        {/* TIMER */}
        {showTimer && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-gray-50">
            <Clock3 size={16} className="text-gray-400" />
            <span
              className={`font-semibold ${
                timeLeft < 60 ? "text-red-500" : "text-gray-700"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-3xl">

          {/* QUESTION */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
            {questions[currentIndex].question}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-3">
            {questions[currentIndex].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg border text-left transition
                ${
                  selectedAnswers[currentIndex] === idx
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <span className="font-medium text-gray-500">
                  {String.fromCharCode(65 + idx)}.
                </span>

                <span className="text-gray-700">{option}</span>
              </button>
            ))}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-8 py-4 flex justify-between items-center border-t border-gray-200 bg-white">

        {/* PREVIOUS */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`text-sm font-medium ${
            currentIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:text-indigo-600"
          }`}
        >
          ← Previous
        </button>

        {/* NEXT / SUBMIT */}
        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentIndex] === undefined}
          className={`px-6 py-2.5 rounded-md text-sm font-semibold transition
          ${
            selectedAnswers[currentIndex] !== undefined
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {currentIndex === questions.length - 1 ? "Submit" : "Next →"}
        </button>

      </footer>
    </div>
  );
};

export default QuizInterface;














