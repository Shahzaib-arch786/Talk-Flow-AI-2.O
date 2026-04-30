// src/routes.jsx
import ProtectedRoute from "./panels/auth/components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Demo pages
import LandingPage from "./panels/Demo/pages/LandingPage";
import TryDemoPage from "./panels/Demo/pages/TryDemoPage";
import AICallPage from "./panels/Demo/pages/AICallPage";

// Auth pages
import LoginPage from "./panels/auth/pages/LoginPage";
import SignupPage from "./panels/auth/pages/SignupPage";

// Admin pages
import DashboardPage from "./panels/admin/pages/DashboardPage";
import MyBusinessPage from "./panels/admin/pages/MyBusinessPage";
import KnowledgeBasePage from "./panels/admin/pages/KnowledgeBasePage";
import TestAIPage from "./panels/admin/pages/TestAIPage";
import CallLogs from "./panels/admin/pages/CallLogs";
import Settings from "./panels/admin/pages/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Demo Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<TryDemoPage />} />
        <Route path="/demo/live" element={<AICallPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/my-business"
          element={
            <ProtectedRoute>
              <MyBusinessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/knowledge"
          element={
            <ProtectedRoute>
              <KnowledgeBasePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/call-logs"
          element={
            <ProtectedRoute>
              <CallLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/test-ai"
          element={
            <ProtectedRoute>
              <TestAIPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center font-bold text-2xl">
              404 – Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
