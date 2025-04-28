import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface FeedbackFormProps {
  onSubmit: (data: { type: string; routeId: string; title: string; description: string }) => void;
  routes: { id: string; name: string }[];
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, routes }) => {
  const [type, setType] = useState<'feedback' | 'complaint'>('feedback');
  const [routeId, setRouteId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!routeId || !title || !description) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit({ type, routeId, title, description });
      
      // Reset form on success
      setType('feedback');
      setRouteId('');
      setTitle('');
      setDescription('');
      setSuccess('Your feedback has been submitted successfully!');
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Submit Your Feedback</h2>
        <p className="mt-1 text-sm text-gray-600">
          Share your experience or report an issue with the college bus service
        </p>
      </div>
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-3">
          <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-800 h-4 w-4"
                value="feedback"
                checked={type === 'feedback'}
                onChange={() => setType('feedback')}
              />
              <span className="ml-2 text-gray-700">General Feedback</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-800 h-4 w-4"
                value="complaint"
                checked={type === 'complaint'}
                onChange={() => setType('complaint')}
              />
              <span className="ml-2 text-gray-700">Complaint</span>
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">
            Select Bus Route
          </label>
          <select
            id="route"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="">Select a route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Title"
          placeholder="Brief title for your feedback"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          maxLength={100}
        />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide details about your feedback or complaint"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            maxLength={500}
          />
          <p className="mt-1 text-xs text-gray-500">
            {500 - description.length} characters remaining
          </p>
        </div>
        
        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          leftIcon={<MessageSquare size={18} />}
          isLoading={isLoading}
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;