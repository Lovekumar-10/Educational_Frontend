import { Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
// import AiStudyMentor from "../pages/dashboard/AiStudyMentor";

import AiFlashcardGenerator from "../pages/dashboard/AiFlashcardGenerator";
import AiNotesGenerator from "../pages/dashboard/AiNotesGenerator";
import PdfSummarizer from "../pages/dashboard/PdfSummarizer";
import AiQuizPractice from "../pages/dashboard/AiQuizPractice";

import Messages from "../pages/dashboard/Messages";
import Mindmap from "../pages/dashboard/Mindmap";
import MyLibrary from "../pages/dashboard/MyLibrary";


import DashboardHome from "../pages/dashboard/DashboardHome";

const DashboardRoutes = () => (
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<DashboardHome />} />
    {/* <Route path="ai-study-mentor" element={<AiStudyMentor />} /> */}

    <Route path="ai-flashcard-generator" element={<AiFlashcardGenerator />} />
    <Route path="ai-notes-generator" element={<AiNotesGenerator />} />
    <Route path="pdf-summarizer" element={<PdfSummarizer />} />
    <Route path="ai-quiz-practice" element={<AiQuizPractice />} />


    <Route path="messages" element={<Messages />} />
    <Route path="mind-map" element={<Mindmap />} />
    <Route path="my-library" element={<MyLibrary />} />
  </Route>
);

export default DashboardRoutes;
