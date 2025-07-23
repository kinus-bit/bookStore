import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserFromToken, isAdmin } from '../utils/auth';
import { useCart } from '../contexts/CartContext';
import { BookOpen, ShoppingCart, LogOut, User, Settings } from 'lucide-react';

const Navigation = () => {
  const user = getUserFromToken();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BookStore</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAdmin() ? (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Browse Books</span>
                </Link>
                <Link
                  to="/cart"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive('/cart')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1">
            {user?.role === 'buyer' && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Books</span>
                </Link>
                <Link
                  to="/cart"
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive('/cart')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;