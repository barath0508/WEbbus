import React from 'react';
import { Bus } from 'lucide-react';
import AdminLoginForm from '../components/auth/AdminLoginForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
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
          WeBBuS
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Administrator Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;