// src/routes.jsx

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
import Knowledge from "./panels/admin/pages/Knowledge"


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
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/knowledge" element={<Knowledge />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<h1 className="text-center font-bold text-2xl">404 – Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
