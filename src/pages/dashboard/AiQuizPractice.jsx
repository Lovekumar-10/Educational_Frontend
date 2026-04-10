import React, { useState, useEffect, useRef } from "react";
import { FileText, Upload, Type, X, Settings2, File } from "lucide-react";
import OptionsModal from "../../components/Quiz-Components/OptionsModal";
import GeneratingModal from "../../components/Quiz-Components/GeneratingModal";

const AiQuizPractice = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const MAX_CHARS = 25000;

  // Simulate moving to the quiz after generation
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        // alert("Quiz Generated! Move to Quiz View now.");
        // In real use, you'd navigate to your results page here
      }, 15000); // 15 seconds to match the modal's countdown
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  };

  const isNextDisabled = () => {
    if (activeTab === "text") return textContent.length === 0;
    if (activeTab === "document") return !selectedFile;
    return false;
  };
  // Trigger the generating modal
  const handleGenerate = () => {
    if (!isNextDisabled()) {
      setIsGenerating(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-lighter-pink)] font-[var(--ff-primary)] p-4 md:p-10 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* HEADER */}
        <header>
          <h1 className="text-[var(--fs-h3)] md:text-[var(--fs-h2)] font-bold text-[var(--color-dark-purple)]">
            AI Quiz Generator
          </h1>
          <p className="text-[var(--color-gray)] text-[var(--fs-body)] mt-1">
            Upload a document, paste your notes, or select a topic to
            automatically generate a quiz with AI.
          </p>
        </header>

        {/* NAVIGATION & OPTIONS ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-[#EBE4FF] p-1.5 rounded-full flex items-center w-full md:w-auto">
            {[
              { id: "text", label: "Text", icon: <Type size={16} /> },
              {
                id: "document",
                label: "Document",
                icon: <FileText size={16} />,
              },
              { id: "topic", label: "Topic", icon: <Settings2 size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2.5 rounded-full transition-all text-sm font-semibold ${
                  activeTab === tab.id
                    ? "bg-white text-[var(--color-purple)] shadow-sm"
                    : "text-[var(--color-lighter-gray)] hover:text-[var(--color-purple)]"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOptionsOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-2.5 bg-white border border-[var(--color-lighter-gray)] rounded-full text-[var(--color-dark-purple)] hover:shadow-md transition-all w-full md:w-auto"
          >
            <Settings2 size={18} />
            <span className="font-semibold">Options</span>
          </button>
        </div>

        {/* MAIN SURFACE AREA (Interactive Zone) */}
        <main className="w-full bg-white border-2 border-dashed border-[#dcd1ff] rounded-[var(--radius-lg)] min-h-[350px] md:min-h-[400px] p-6 shadow-[var(--shadow-card)] flex flex-col">
          {activeTab === "text" && (
            <textarea
              className="w-full flex-grow bg-transparent outline-none resize-none text-[var(--color-dark-purple)] placeholder:text-[var(--color-lighter-gray)] text-lg"
              placeholder="Paste in your notes or other content..."
              maxLength={MAX_CHARS}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          )}

          {activeTab === "document" && (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-20 h-20 bg-[var(--color-lighter-pink)] rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <Upload className="text-[var(--color-purple)]" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-dark-purple)]">
                    Click to upload document
                  </h3>
                  <p className="text-[var(--color-gray)] mt-1">
                    PDF, PPT, Word or Text (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="w-full max-w-md bg-white p-5 rounded-2xl border-2 border-[var(--color-purple)] relative flex items-center gap-4">
                  <div className="p-3 bg-[var(--color-lighter-pink)] rounded-xl text-[var(--color-purple)]">
                    <File size={32} />
                  </div>
                  <div className="text-left flex-grow overflow-hidden">
                    <p className="font-bold text-[var(--color-dark-purple)] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs font-bold text-[var(--color-purple)] uppercase">
                      {selectedFile.size}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "topic" && (
            <div className="flex-grow flex items-center justify-center">
              <input
                type="text"
                placeholder="Enter a topic..."
                className="w-full max-w-lg p-5 rounded-2xl border-2 border-[var(--color-lighter-pink)] focus:border-[var(--color-purple)] outline-none text-lg shadow-sm"
              />
            </div>
          )}
        </main>

        {/* BOTTOM ACTION ROW: Next (Left) and Character Count (Right) */}
        <footer className="flex justify-between items-center w-full px-1">
          <button
          onClick={handleGenerate} // Connect generating logic
            disabled={isNextDisabled()}
            className={`px-14 py-3.5 rounded-xl font-bold text-lg transition-all transform active:scale-95
              ${
                isNextDisabled()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-purple)] text-white hover:brightness-110 shadow-lg shadow-purple-200"
              }`}
          >
            Next
          </button>

          <div className="text-[var(--color-lighter-gray)] font-medium text-sm md:text-base">
            {activeTab === "text" ? (
              <span>
                {textContent.length.toLocaleString()} /{" "}
                {MAX_CHARS.toLocaleString()} characters
              </span>
            ) : (
              <span className="opacity-0">
                Placeholder
              </span> /* Maintains layout height */
            )}
          </div>
        </footer>
      </div>

      {/* OPTIONS MODAL */}
      <OptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
      />
        {/* GENERATING MODAL */}

      <GeneratingModal 
        isOpen={isGenerating} 
      />
    </div>
  );
};

export default AiQuizPractice;
