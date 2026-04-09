import React from "react";

const AiStudyMentor = () => {
  return (
    <div className="d-flex" style={{ height: "calc(100vh - 72px)" }}>

      {/* LEFT PANEL */}
      <div style={{ width: "30%", borderRight: "1px solid #eee" }}>
        LEFT (Input Panel)
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "70%", overflowY: "auto" }}>
        RIGHT (Output Panel)
      </div>

    </div>
  );
};

export default AiStudyMentor;