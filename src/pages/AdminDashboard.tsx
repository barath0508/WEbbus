import React, { useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import ComplaintList from '../components/admin/ComplaintList';
import { BusRoute, Feedback } from '../types';

// Mock routes data
const mockRoutes: BusRoute[] = [
  {
    id: 'route1',
    name: 'North Campus - Main Building',
    description: 'Route from North Campus to Main Building via City Center',
    stops: [
      { id: 'stop1', name: 'North Campus Gate', time: '7:30 AM' },
      { id: 'stop2', name: 'Library Junction', time: '7:45 AM' },
      { id: 'stop3', name: 'City Center', time: '8:00 AM' },
      { id: 'stop4', name: 'Main Building', time: '8:15 AM' },
    ]
  },
  {
    id: 'route2',
    name: 'East Wing - Science Building',
    description: 'Route from East Wing to Science Building',
    stops: [
      { id: 'stop5', name: 'East Wing Entrance', time: '8:00 AM' },
      { id: 'stop6', name: 'Cafeteria', time: '8:10 AM' },
      { id: 'stop7', name: 'Sports Complex', time: '8:20 AM' },
      { id: 'stop8', name: 'Science Building', time: '8:30 AM' },
    ]
  },
  {
    id: 'route3',
    name: 'Hostel - Engineering Block',
    description: 'Route from Hostel to Engineering Block',
    stops: [
      { id: 'stop9', name: 'Hostel Complex', time: '7:45 AM' },
      { id: 'stop10', name: 'Garden Area', time: '8:00 AM' },
      { id: 'stop11', name: 'Food Court', time: '8:15 AM' },
      { id: 'stop12', name: 'Engineering Block', time: '8:30 AM' },
    ]
  }
];

// Mock complaints data
const mockComplaints: Feedback[] = [
  {
    id: '1',
    userId: 'student1',
    routeId: 'route1',
    type: 'complaint',
    title: 'Bus arrived late',
    description: 'The bus was 15 minutes late today at North Campus Gate. This has been happening regularly for the past week.',
    status: 'pending',
    createdAt: new Date(2023, 4, 15),
    updatedAt: new Date(2023, 4, 15)
  },
  {
    id: '2',
    userId: 'student2',
    routeId: 'route2',
    type: 'complaint',
    title: 'AC not working',
    description: 'The air conditioner in the bus on the East Wing route is not functioning properly. It gets very uncomfortable in the afternoon.',
    status: 'reviewing',
    createdAt: new Date(2023, 4, 14),
    updatedAt: new Date(2023, 4, 16)
  },
  {
    id: '3',
    userId: 'student3',
    routeId: 'route3',
    type: 'feedback',
    title: 'Great service',
    description: 'I wanted to appreciate the punctuality of the bus service from Hostel to Engineering Block. The driver is always on time and very courteous.',
    status: 'resolved',
    createdAt: new Date(2023, 4, 12),
    updatedAt: new Date(2023, 4, 13)
  },
  {
    id: '4',
    userId: 'student4',
    routeId: 'route1',
    type: 'complaint',
    title: 'Overcrowded bus',
    description: 'The morning bus at 7:30 AM is always overcrowded. Can we have an additional bus or a larger vehicle for this route?',
    status: 'pending',
    createdAt: new Date(2023, 4, 16),
    updatedAt: new Date(2023, 4, 16)
  },
  {
    id: '5',
    userId: 'student5',
    routeId: 'route2',
    type: 'complaint',
    title: 'Bus skipped stop',
    description: 'The bus did not stop at the Cafeteria today even though students were waiting. The driver seemed to be in a hurry.',
    status: 'pending',
    createdAt: new Date(2023, 4, 16),
    updatedAt: new Date(2023, 4, 16)
  }
];

const AdminDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Feedback[]>(mockComplaints);
  
  const handleStatusChange = (id: string, status: 'pending' | 'reviewing' | 'resolved') => {
    setComplaints(
      complaints.map(complaint => 
        complaint.id === id 
          ? { ...complaint, status, updatedAt: new Date() } 
          : complaint
      )
    );
  };

  // Calculate complaint statistics
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
  const reviewingComplaints = complaints.filter(c => c.status === 'reviewing').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
  
  // Calculate complaints by route
  const complaintsByRoute = mockRoutes.map(route => {
    const routeComplaints = complaints.filter(c => c.routeId === route.id);
    return {
      routeId: route.id,
      routeName: route.name,
      count: routeComplaints.length,
      pending: routeComplaints.filter(c => c.status === 'pending').length
    };
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage bus routes and review student complaints
          </p>
        </div>
        
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-800 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Complaints
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{totalComplaints}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-400 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{pendingComplaints}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-400 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reviewing
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{reviewingComplaints}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Resolved
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{resolvedComplaints}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ComplaintList 
              complaints={complaints} 
              routes={mockRoutes} 
              onStatusChange={handleStatusChange} 
            />
          </div>
          
          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Complaints by Route</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {complaintsByRoute.map((routeData) => (
                  <li key={routeData.routeId} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{routeData.routeName}</p>
                        <p className="text-sm text-gray-500">
                          {routeData.pending} pending out of {routeData.count} total
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          routeData.pending > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {routeData.pending > 0 ? 'Needs attention' : 'All resolved'}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;