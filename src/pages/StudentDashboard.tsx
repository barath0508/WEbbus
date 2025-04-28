import React, { useState } from 'react';
import { MessageSquare, Navigation } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import FeedbackForm from '../components/feedback/FeedbackForm';
import Button from '../components/ui/Button';
import { Feedback } from '../types';
import { busRoutes } from '../data/routes';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'recent'>('feedback');
  const [recentFeedback, setRecentFeedback] = useState<Feedback[]>([]);

  const handleFeedbackSubmit = (data: { type: string; routeId: string; title: string; description: string }) => {
    const newFeedback: Feedback = {
      id: `feedback-${Date.now()}`,
      userId: 'student1',
      routeId: data.routeId,
      type: data.type as 'feedback' | 'complaint',
      title: data.title,
      description: data.description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setRecentFeedback([newFeedback, ...recentFeedback]);
    setActiveTab('recent');
  };

  const getRouteName = (routeId: string) => {
    const route = busRoutes.find(r => r.id === routeId);
    return route ? `${route.routeNo} - ${route.name}` : 'Unknown Route';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Submit feedback and track your college bus
          </p>
        </div>
        
        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'feedback'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <MessageSquare size={20} className="mb-1" />
                  <span>Submit Feedback</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('recent')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'recent'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Navigation size={20} className="mb-1" />
                  <span>Recent Activity</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === 'feedback' ? (
            <FeedbackForm onSubmit={handleFeedbackSubmit} routes={busRoutes} />
          ) : (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Recent Feedback</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Track the status of your feedback and complaints
                </p>
              </div>
              
              {recentFeedback.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {recentFeedback.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                            <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === 'complaint' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type === 'complaint' ? 'Complaint' : 'Feedback'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            <span>Submitted on {item.createdAt.toLocaleDateString()}</span>
                            <span className="mx-1">•</span>
                            <span>Route: {getRouteName(item.routeId)}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          item.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback submitted</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by submitting feedback or a complaint.</p>
                  <div className="mt-6">
                    <Button
                      onClick={() => setActiveTab('feedback')}
                      leftIcon={<MessageSquare size={18} />}
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {busRoutes.map((route) => (
            <div key={route.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{route.routeNo}</h3>
                  <span className="text-sm text-gray-500">{route.startTime}</span>
                </div>
                <h4 className="text-base font-medium text-gray-800">{route.name}</h4>
                <div className="mt-4">
                  <a
                    href="/track-bus"
                    className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700"
                  >
                    <Navigation size={16} className="mr-2" />
                    Track this route
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;