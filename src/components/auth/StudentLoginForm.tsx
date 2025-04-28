import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const StudentLoginForm: React.FC = () => {
  const { login } = useAuth();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateCollegeEmail = (email: string) => {
    // Add your college email domain here
    const collegeEmailDomain = 'college.edu';
    return email.endsWith(`@${collegeEmailDomain}`);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your college email');
      return;
    }

    if (!validateCollegeEmail(email)) {
      setError('Please use your college email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data after successful OTP verification
      login({
        id: '1',
        name: email.split('@')[0], // Use email username as name
        email: email,
        role: 'student'
      });
      
      // Navigate to dashboard after login
      window.location.href = '/';
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Student Login</h2>
        <p className="mt-2 text-sm text-gray-600">
          Login with your college email to access bus services
        </p>
      </div>
      
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <Input
            label="College Email"
            type="email"
            placeholder="Enter your college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            leftIcon={<Mail size={18} />}
            required
            error={error}
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Send OTP
          </Button>
          
          <div className="text-center mt-4">
            <a 
              href="/login/admin" 
              className="text-sm font-medium text-blue-800 hover:text-blue-700"
            >
              Login as Administrator
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              We've sent a verification code to <span className="font-medium">{email}</span>
            </p>
          </div>
          
          <Input
            label="One-Time Password"
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            leftIcon={<Lock size={18} />}
            required
            maxLength={4}
            error={error}
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Verify OTP
          </Button>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-sm font-medium text-blue-800 hover:text-blue-700"
            >
              Change email
            </button>
            
            <button
              type="button"
              className="text-sm font-medium text-blue-800 hover:text-blue-700"
              onClick={() => {
                // In a real app, this would resend the OTP
                setError('');
              }}
            >
              Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentLoginForm;