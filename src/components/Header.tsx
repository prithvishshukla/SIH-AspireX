import React from 'react';
import { Leaf, Bell, User, Calendar, BarChart3, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: 'patient' | 'practitioner' | 'admin';
  setUserRole: (role: 'patient' | 'practitioner' | 'admin') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  isAuthenticated,
  setIsAuthenticated
}) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'scheduling', label: 'Scheduling', icon: Calendar },
    { id: 'tracking', label: 'Tracking', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-emerald-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                AyurSutra
              </h1>
              <p className="text-xs text-gray-500">Panchakarma Excellence</p>
            </div>
          </div>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="patient">Patient</option>
                  <option value="practitioner">Practitioner</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setIsAuthenticated(true);
                  setCurrentView('dashboard');
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};