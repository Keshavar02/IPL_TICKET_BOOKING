import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-orange-500" />
                <span className="text-xl font-bold">IPL Tickets</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Home
            </Link>
            
            {!currentUser ? (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Register
                </Link>
                <Link to="/admin/login" className="px-3 py-2 text-sm font-medium text-blue-200 hover:text-white transition-colors">
                  Admin
                </Link>
              </>
            ) : isAdmin() ? (
              <>
                <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Dashboard
                </Link>
                <Link to="/admin/matches" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Manage Matches
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center px-3 py-2 text-sm font-medium">
                  <User className="mr-1 h-4 w-4" />
                  {currentUser.name || currentUser.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {!currentUser ? (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
                <Link 
                  to="/admin/login" 
                  className="block px-3 py-2 text-base font-medium text-blue-200 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              </>
            ) : isAdmin() ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/admin/matches" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Matches
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center px-3 py-2 text-base font-medium">
                  <User className="mr-1 h-4 w-4" />
                  {currentUser.name || currentUser.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;