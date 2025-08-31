import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import CourseSearchResults from './pages/course-search-results';
import UniversityProfile from './pages/university-profile';
import CourseComparison from './pages/course-comparison';
import UserDashboard from './pages/user-dashboard';
import CourseDetail from './pages/course-detail';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/course-search-results" element={<CourseSearchResults />} />
        <Route path="/university-profile" element={<UniversityProfile />} />
        <Route path="/course-detail" element={<CourseDetail />} />
        
        {/* Protected routes */}
        <Route path="/course-comparison" element={<ProtectedRoute><CourseComparison /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;