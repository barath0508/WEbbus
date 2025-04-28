import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to authenticate
      // For demo purposes, we'll simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple demo validation - in a real app this would be server-side
      if (username === 'admin' && password === 'password') {
        // Mock admin user data
        login({
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@college.edu',
          role: 'admin'
        });
        
        // Navigate to dashboard after login
        window.location.href = '/';
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
        <p className="mt-2 text-sm text-gray-600">
          Login with your credentials to access the admin dashboard
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          leftIcon={<User size={18} />}
          required
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          leftIcon={<Lock size={18} />}
          required
          error={error}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Login
        </Button>
        
        <div className="text-center mt-4">
          <a 
            href="/login/student" 
            className="text-sm font-medium text-blue-800 hover:text-blue-700"
          >
            Login as Student
          </a>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;