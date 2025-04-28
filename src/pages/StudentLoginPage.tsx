import React from 'react';
import { Bus } from 'lucide-react';
import StudentLoginForm from '../components/auth/StudentLoginForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const StudentLoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Bus size={48} className="text-blue-800" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          College Bus Tracker
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <StudentLoginForm />
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;