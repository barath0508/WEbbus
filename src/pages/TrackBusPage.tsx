import React from 'react';
import Navbar from '../components/navigation/Navbar';
import BusTracker from '../components/location/BusTracker';
import { BusLocation } from '../types';
import { busRoutes } from '../data/routes';

// Mock function to get location updates for a bus
const getLocationUpdates = async (routeId: string): Promise<BusLocation> => {
  // In a real app, this would call an API to get the real bus location
  // For demo purposes, generate a random location near the college
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  // Generate random coordinates based on the route
  let latitude = 0;
  let longitude = 0;
  
  switch(routeId) {
    case 'R01':
      latitude = 13.2176 + (Math.random() - 0.5) * 0.01; // Ennore coordinates
      longitude = 80.3061 + (Math.random() - 0.5) * 0.01;
      break;
    case 'R02':
      latitude = 13.0578 + (Math.random() - 0.5) * 0.01; // Triplicane coordinates
      longitude = 80.2771 + (Math.random() - 0.5) * 0.01;
      break;
    default:
      latitude = 13.0827 + (Math.random() - 0.5) * 0.01; // Chennai central coordinates
      longitude = 80.2707 + (Math.random() - 0.5) * 0.01;
  }
  
  return {
    routeId,
    latitude,
    longitude,
    timestamp: new Date()
  };
};

const TrackBusPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Track Your Bus</h1>
          <p className="mt-1 text-sm text-gray-600">
            Real-time tracking of college bus routes
          </p>
        </div>
        
        <div className="mt-6">
          <BusTracker routes={busRoutes} getLocationUpdates={getLocationUpdates} />
        </div>
      </main>
    </div>
  );
};

export default TrackBusPage;