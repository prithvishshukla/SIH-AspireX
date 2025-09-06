import React from 'react';
import { Leaf, Bell, User, Calendar, BarChart3, AlertTriangle, Play, MessageSquare, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { VoiceInput } from './VoiceInput';
import { NotificationPanel } from './NotificationPanel';

type ViewType = 'home' | 'dashboard' | 'scheduling' | 'tracking' | 'notifications' | 'analytics' | 'profile' | 'emergency' | 'videoLibrary' | 'forum' | 'consultation';
type UserRole = 'patient' | 'practitioner' | 'admin';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: React.Dispatch<React.SetStateAction<ViewType>>;
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  isAuthenticated,
  setIsAuthenticated
}) => {
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const navigationItems = [
    { id: 'dashboard', label: t('common.dashboard'), icon: BarChart3 },
    { id: 'scheduling', label: t('common.scheduling'), icon: Calendar },
    { id: 'tracking', label: t('common.tracking'), icon: BarChart3 },
    { id: 'emergency', label: t('common.emergency'), icon: AlertTriangle },
    { id: 'videoLibrary', label: t('common.videoLibrary'), icon: Play },
    { id: 'forum', label: t('common.forum'), icon: MessageSquare },
    { id: 'consultation', label: t('common.consultation'), icon: Video },
    { id: 'analytics', label: t('common.analytics'), icon: BarChart3 },
    { id: 'profile', label: t('common.profile'), icon: User }
  ];

  const handleVoiceResult = (transcript: string) => {
    const lowerTranscript = transcript.toLowerCase();
    
    // Simple voice navigation commands
    if (lowerTranscript.includes('dashboard')) {
      setCurrentView('dashboard');
    } else if (lowerTranscript.includes('schedule') || lowerTranscript.includes('appointment')) {
      setCurrentView('scheduling');
    } else if (lowerTranscript.includes('track') || lowerTranscript.includes('progress')) {
      setCurrentView('tracking');
    } else if (lowerTranscript.includes('emergency')) {
      setCurrentView('emergency');
    } else if (lowerTranscript.includes('video') || lowerTranscript.includes('library')) {
      setCurrentView('videoLibrary');
    } else if (lowerTranscript.includes('forum') || lowerTranscript.includes('community')) {
      setCurrentView('forum');
    } else if (lowerTranscript.includes('consultation') || lowerTranscript.includes('call')) {
      setCurrentView('consultation');
    } else if (lowerTranscript.includes('analytics')) {
      setCurrentView('analytics');
    } else if (lowerTranscript.includes('profile')) {
      setCurrentView('profile');
    }
  };

  return (
    <>
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
                  {t('navigation.ayursutra')}
                </h1>
                <p className="text-xs text-gray-500">Panchakarma Excellence</p>
              </div>
            </div>

            {/* Navigation */}
            {isAuthenticated && (
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as ViewType)}
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
              {/* Voice Input */}
              <VoiceInput onResult={handleVoiceResult} size="sm" />
              
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Notifications */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
              )}
              
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
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
                  >
                    {t('common.logout')}
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
                  {t('common.getStarted')}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};