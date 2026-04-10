import React from 'react';
import { Copy, Save, Download, BookOpen, RotateCcw, Zap, Code, Brain } from 'lucide-react';

const Results = ({ data }) => {
  return (
    <div 
      className="w-full h-full overflow-y-auto p-4 md:p-6"
      style={{ backgroundColor: "var(--color-lighter-pink)" }}
    >
      <div className="w-full h-full flex justify-center">
        
        {/* MAIN CARD */}
        <div className="w-full max-w-[900px] bg-white rounded-[16px] shadow flex flex-col min-h-[500px]">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
            
            <div className="flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: "var(--color-purple)",
                  boxShadow: "0 0 8px var(--color-purple)"
                }}
              ></span>

              <h2 
                className="font-bold text-sm md:text-base"
                style={{ color: "var(--color-dark-purple)" }}
              >
                Generated Notes
              </h2>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-[var(--color-purple)]"><Copy size={18} /></button>
              <button className="hover:text-[var(--color-purple)]"><Save size={18} /></button>
              <button className="hover:text-[var(--color-purple)]"><Download size={18} /></button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            
            {!data ? (
              <div className="w-full max-w-sm flex flex-col items-center">

                {/* ICON */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <BookOpen size={40} />
                  </div>

                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-[var(--color-purple)]">
                    <Brain size={16} />
                  </div>

                  <div className="absolute bottom-0 -left-4 w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-blue-400">
                    <Code size={16} />
                  </div>
                </div>

                {/* TEXT */}
                <h3 
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--color-dark-purple)" }}
                >
                  Your desk is ready.
                </h3>

                <p 
                  className="text-sm mb-6"
                  style={{ color: "var(--color-gray)" }}
                >
                  Start by entering a topic or uploading content on the left panel.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap justify-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-xs">
                    <RotateCcw size={14} /> Resume
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-xs">
                    <Zap size={14} /> Try Sample
                  </button>
                </div>

              </div>
            ) : (
              <div className="w-full text-left animate-in fade-in duration-500">
                <p 
                  className="leading-relaxed"
                  style={{ color: "var(--color-dark-purple)" }}
                >
                  {data}
                </p>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="py-3 border-t border-gray-100 text-center">
            <p 
              className="text-[10px] font-bold tracking-wider uppercase"
              style={{ color: "var(--color-lighter-gray)" }}
            >
              Powered by AI Study Mentor
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;