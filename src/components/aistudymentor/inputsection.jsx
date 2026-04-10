import React, { useState } from 'react';

const InputSection = () => {
  const [activeTab, setActiveTab] = useState('Topic');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [noteStyle, setNoteStyle] = useState('Detailed Guide');

  const tabs = ['Topic', 'Paste Text', 'Upload PDF'];

  return (
    <div 
      className="w-full h-full overflow-y-auto p-4"
      style={{ backgroundColor: "var(--color-lighter-pink)" }}
    >
      <div 
        className="w-full bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-[var(--space-xl)] font-['Inter']"
      >
        
        {/* Header */}
        <div className="mb-[var(--space-xl)]">
          <h1 
            className="text-[28px] md:text-[32px] font-bold mb-2"
            style={{ color: "var(--color-dark-purple)" }}
          >
            AI Notes Generator
          </h1>

          <p 
            className="text-[var(--fs-body)] leading-relaxed"
            style={{ color: "var(--color-gray)" }}
          >
            Convert complex concepts into structured study notes in seconds.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#f3f4f6] p-1.5 rounded-full mb-[var(--space-xl)] w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeTab === tab
                  ? {
                      backgroundColor: "#fff",
                      color: "var(--color-purple)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    }
                  : {
                      color: "var(--color-lighter-gray)"
                    }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-[var(--space-lg)]">
          <label 
            className="block text-[11px] font-bold uppercase tracking-wider mb-3 opacity-60"
            style={{ color: "var(--color-dark-purple)" }}
          >
            STUDY {activeTab.toUpperCase()}
          </label>
          
          <textarea
            rows="4"
            className="w-full border-none rounded-[var(--radius-md)] p-4 outline-none resize-none transition-all"
            style={{
              backgroundColor: "#f8f9fb",
              color: "var(--color-dark-purple)"
            }}
            placeholder="Enter your content..."
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-[var(--space-md)] mb-[var(--space-xl)]">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-[var(--radius-md)] px-4 py-3"
            style={{ backgroundColor: "#f8f9fb", color: "var(--color-dark-purple)" }}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            value={noteStyle}
            onChange={(e) => setNoteStyle(e.target.value)}
            className="w-full rounded-[var(--radius-md)] px-4 py-3"
            style={{ backgroundColor: "#f8f9fb", color: "var(--color-dark-purple)" }}
          >
            <option>Detailed Guide</option>
            <option>Summary</option>
            <option>Bullet Points</option>
          </select>
        </div>

        {/* Button */}
        <button
          className="w-full text-white font-semibold py-4 rounded-full transition-all transform active:scale-[0.98] mb-4"
          style={{
            backgroundColor: "var(--color-purple)",
            boxShadow: "0 8px 20px rgba(153,63,255,0.3)"
          }}
        >
          Generate Notes
        </button>

        {/* Footer */}
        <p 
          className="text-center italic text-[12px]"
          style={{ color: "var(--color-lighter-gray)" }}
        >
          Genie uses GPT-4o for precise pedagogical synthesis.
        </p>

      </div>
    </div>
  );
};

export default InputSection;