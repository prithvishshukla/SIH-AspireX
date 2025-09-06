import React, { useState } from 'react';
import { Bell, Calendar, Pill, AlertTriangle, MessageSquare, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'appointment' | 'prescription' | 'emergency' | 'forum';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'appointment' | 'prescription' | 'emergency' | 'forum'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Session Reminder',
      message: 'Your Abhyanga massage with Dr. Priya Sharma is in 2 hours.',
      timestamp: '2025-01-08T12:00:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Medication Reminder',
      message: 'Time to take your Triphala supplement - 1 tablet with warm water.',
      timestamp: '2025-01-08T11:30:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'emergency',
      title: 'Emergency Alert Resolved',
      message: 'Equipment malfunction in Shirodhara room has been resolved.',
      timestamp: '2025-01-08T10:15:00Z',
      read: true,
      priority: 'high'
    },
    {
      id: '4',
      type: 'forum',
      title: 'New Reply to Your Post',
      message: 'Dr. Sharma replied to your question about post-Abhyanga care.',
      timestamp: '2025-01-08T09:45:00Z',
      read: false,
      priority: 'low'
    },
    {
      id: '5',
      type: 'appointment',
      title: 'Session Completed',
      message: 'Your Shirodhara session has been completed. Please provide feedback.',
      timestamp: '2025-01-07T16:30:00Z',
      read: true,
      priority: 'low'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'prescription': return Pill;
      case 'emergency': return AlertTriangle;
      case 'forum': return MessageSquare;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'text-blue-600 bg-blue-100';
      case 'prescription': return 'text-green-600 bg-green-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'forum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || notification.type === activeTab
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'appointment', label: t('notifications.appointments'), count: notifications.filter(n => n.type === 'appointment').length },
    { id: 'prescription', label: t('notifications.prescriptions'), count: notifications.filter(n => n.type === 'prescription').length },
    { id: 'emergency', label: t('notifications.emergencies'), count: notifications.filter(n => n.type === 'emergency').length },
    { id: 'forum', label: t('notifications.forum'), count: notifications.filter(n => n.type === 'forum').length }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />
      <div className="fixed top-16 right-4 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t('notifications.title')}</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-sm text-emerald-600 hover:text-emerald-700"
                onClick={() => {/* Mark all as read */}}
              >
                {t('notifications.markAllRead')}
              </button>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            {notification.priority === 'high' && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                High
                              </span>
                            )}
                            {!notification.read && (
                              <button
                                className="text-xs text-emerald-600 hover:text-emerald-700"
                                onClick={() => {/* Mark as read */}}
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>{t('notifications.noNotifications')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};