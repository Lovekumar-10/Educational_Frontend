import { Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import AiFlashcardGenerator from "../pages/dashboard/AiFlashcardGenerator";
import AiNotesGenerator from "../pages/dashboard/AiNotesGenerator";
import Messages from "../pages/dashboard/Messages";
import Mindmap from "../pages/dashboard/Mindmap";
import MyLibrary from "../pages/dashboard/MyLibrary";
import PdfSummarizer from "../pages/dashboard/PdfSummarizer";
import QuizPractice from "../pages/dashboard/QuizPractice";


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

    <Route path="ai-flashcard-generator" element={<AiFlashcardGenerator />} />
    <Route path="ai-notes-generator" element={<AiNotesGenerator />} />
    <Route path="messages" element={<Messages />} />
    <Route path="mind-map" element={<Mindmap />} />
    <Route path="my-library" element={<MyLibrary />} />
    <Route path="pdf-summarizer" element={<PdfSummarizer />} />
    <Route path="quiz-practice" element={<QuizPractice />} />
  </Route>
);

export default DashboardRoutes;
