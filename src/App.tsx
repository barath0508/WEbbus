import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import StudentLoginPage from './pages/StudentLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TrackBusPage from './pages/TrackBusPage';

// Protected route component
const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  requiredRole?: 'student' | 'admin';
}> = ({ element, requiredRole }) => {
  const { isAuthenticated, isAdmin, isStudent, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login/student" replace />;
  }
  
  // Role check
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole === 'student' && !isStudent) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

// Root component that redirects based on user role
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login/student" replace />;
  }
  
  return isAdmin ? 
    <Navigate to="/admin/dashboard" replace /> : 
    <Navigate to="/student/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Root route - redirects based on auth state */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Authentication routes */}
          <Route path="/login/student" element={<StudentLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          
          {/* Student routes */}
          <Route 
            path="/student/dashboard" 
            element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />} 
          />
          <Route 
            path="/track-bus" 
            element={<ProtectedRoute element={<TrackBusPage />} requiredRole="student" />} 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} 
          />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;