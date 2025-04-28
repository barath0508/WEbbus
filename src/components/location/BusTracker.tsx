import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { BusLocation, BusRoute } from '../../types';

interface BusTrackerProps {
  routes: BusRoute[];
  getLocationUpdates: (routeId: string) => Promise<BusLocation>;
}

const BusTracker: React.FC<BusTrackerProps> = ({ routes, getLocationUpdates }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Get user's current location
  const getUserLocation = () => {
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('You denied the request for geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('The request to get user location timed out');
            break;
          default:
            setLocationError('An unknown error occurred');
            break;
        }
      }
    );
  };

  // Request user location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Start tracking bus location
  const startTracking = async () => {
    if (!selectedRouteId) {
      return;
    }
    
    setIsLoading(true);
    setIsTracking(true);
    
    try {
      const location = await getLocationUpdates(selectedRouteId);
      setBusLocation(location);
    } catch (error) {
      setLocationError('Failed to get bus location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Set up interval to fetch bus location
  useEffect(() => {
    if (!isTracking || !selectedRouteId) {
      return;
    }
    
    const intervalId = setInterval(async () => {
      try {
        const location = await getLocationUpdates(selectedRouteId);
        setBusLocation(location);
      } catch (error) {
        setLocationError('Failed to update bus location');
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [isTracking, selectedRouteId, getLocationUpdates]);

  const selectedRoute = routes.find(route => route.id === selectedRouteId);

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Bus Tracker</h2>
        <p className="mt-1 text-sm text-gray-600">
          Track your bus location in real-time
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="route-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Bus Route
          </label>
          <select
            id="route-select"
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            disabled={isTracking}
          >
            <option value="">Select a route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        
        {locationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Location Error</h3>
              <p className="mt-1 text-sm text-red-700">{locationError}</p>
              {locationError.includes('denied') && (
                <p className="mt-2 text-sm text-red-700">
                  Please enable location services in your browser settings to use this feature.
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          <Button
            onClick={getUserLocation}
            variant="outline"
            leftIcon={<MapPin size={18} />}
            disabled={isLoading}
          >
            Update My Location
          </Button>
          
          <Button
            onClick={startTracking}
            disabled={!selectedRouteId || isLoading}
            isLoading={isLoading}
            leftIcon={<Navigation size={18} />}
          >
            {isTracking ? 'Refresh Bus Location' : 'Start Tracking'}
          </Button>
        </div>
        
        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg overflow-hidden relative" style={{ height: '400px' }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center">
            {!isTracking ? (
              <>
                <MapPin size={48} className="text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">Select a route and start tracking</h3>
                <p className="mt-2 text-gray-600">
                  The map will display here once you start tracking a bus route
                </p>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <Navigation size={48} className="text-blue-800 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Tracking {selectedRoute?.name}
                </h3>
                {busLocation && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700">Bus Location:</p>
                    <p className="text-gray-600">Latitude: {busLocation.latitude.toFixed(6)}</p>
                    <p className="text-gray-600">Longitude: {busLocation.longitude.toFixed(6)}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Last updated: {new Date(busLocation.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                )}
                <div className="mt-4 text-gray-600">
                  <p>In a real application, this would display an interactive map showing:</p>
                  <ul className="list-disc list-inside text-left mt-2">
                    <li>Your current location</li>
                    <li>The bus location</li>
                    <li>The route path</li>
                    <li>Estimated arrival times</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        
        {selectedRoute && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Route Stops</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ol className="space-y-4">
                {selectedRoute.stops.map((stop, index) => (
                  <li key={stop.id} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-800 text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">{stop.name}</p>
                      <p className="text-sm text-gray-600">{stop.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusTracker;