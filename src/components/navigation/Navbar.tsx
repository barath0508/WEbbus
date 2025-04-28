import React from 'react';
import { Bus, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Bus size={24} className="text-blue-800" />
            <span className="ml-2 text-xl font-bold text-blue-800">College Bus Tracker</span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <a href="/" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                {user?.role === 'student' && (
                  <>
                    <a href="/feedback" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                      Submit Feedback
                    </a>
                    <a href="/track-bus" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                      Track Bus
                    </a>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <a href="/complaints" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                      View Complaints
                    </a>
                    <a href="/routes" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                      Manage Routes
                    </a>
                  </>
                )}
                <div className="flex items-center ml-4">
                  <div className="bg-gray-100 p-1 rounded-full">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-4"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <a href="/login/student" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                  Student Login
                </a>
                <a href="/login/admin" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                  Admin Login
                </a>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <a href="/" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </a>
                {user?.role === 'student' && (
                  <>
                    <a href="/feedback" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                      Submit Feedback
                    </a>
                    <a href="/track-bus" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                      Track Bus
                    </a>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <a href="/complaints" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                      View Complaints
                    </a>
                    <a href="/routes" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                      Manage Routes
                    </a>
                  </>
                )}
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-5">
                    <div className="bg-gray-100 p-1 rounded-full">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <span className="ml-3 text-base font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <div className="mt-3 px-2">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a href="/login/student" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                  Student Login
                </a>
                <a href="/login/admin" className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">
                  Admin Login
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;