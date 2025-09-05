import React, { useState } from 'react';
import { Bell, Calendar, AlertCircle, Info, CheckCircle, X, Settings } from 'lucide-react';

interface NotificationCenterProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Session Reminder',
      message: 'Your Abhyanga massage session with Dr. Priya Sharma is tomorrow at 2:00 PM. Please arrive 15 minutes early.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      category: 'reminder'
    },
    {
      id: 2,
      type: 'preparation',
      title: 'Pre-Treatment Instructions',
      message: 'For your Shirodhara session: avoid heavy meals 2 hours before, wear comfortable clothing, and bring a change of clothes.',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      category: 'instruction'
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Wellness Score Update',
      message: 'Great progress! Your wellness score has improved by 8% this week. Keep following your treatment plan.',
      time: '1 day ago',
      read: true,
      priority: 'low',
      category: 'progress'
    },
    {
      id: 4,
      type: 'schedule',
      title: 'Schedule Change',
      message: 'Your appointment on Jan 15th has been rescheduled to 4:30 PM due to practitioner availability.',
      time: '2 days ago',
      read: false,
      priority: 'high',
      category: 'schedule'
    },
    {
      id: 5,
      type: 'feedback',
      title: 'Session Feedback Requested',
      message: 'Please share your feedback about yesterday\'s Nasya therapy session to help us improve your care.',
      time: '3 days ago',
      read: true,
      priority: 'medium',
      category: 'feedback'
    },
    {
      id: 6,
      type: 'post-care',
      title: 'Post-Treatment Care',
      message: 'After your Abhyanga session: drink warm water, rest for 30 minutes, and avoid cold drinks for 4 hours.',
      time: '3 days ago',
      read: true,
      priority: 'medium',
      category: 'instruction'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
      case 'schedule':
        return Calendar;
      case 'preparation':
      case 'post-care':
        return Info;
      case 'wellness':
        return CheckCircle;
      case 'feedback':
        return Bell;
      default:
        return AlertCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case 'unread':
        return !notification.read;
      case 'reminders':
        return notification.category === 'reminder';
      case 'instructions':
        return notification.category === 'instruction';
      case 'progress':
        return notification.category === 'progress';
      default:
        return true;
    }
  });

  const notificationSettings = [
    { id: 'appointment_reminders', label: 'Appointment Reminders', enabled: true },
    { id: 'pre_treatment', label: 'Pre-treatment Instructions', enabled: true },
    { id: 'post_treatment', label: 'Post-treatment Care', enabled: true },
    { id: 'progress_updates', label: 'Progress Updates', enabled: true },
    { id: 'schedule_changes', label: 'Schedule Changes', enabled: true },
    { id: 'feedback_requests', label: 'Feedback Requests', enabled: false },
    { id: 'wellness_tips', label: 'Daily Wellness Tips', enabled: true },
    { id: 'emergency_alerts', label: 'Emergency Alerts', enabled: true }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600">Stay updated with your therapy progress and appointments</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {notifications.filter(n => !n.read).length} unread
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Notifications</span>
                <span className="font-semibold text-gray-900">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unread</span>
                <span className="font-semibold text-red-600">
                  {notifications.filter(n => !n.read).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Priority</span>
                <span className="font-semibold text-orange-600">
                  {notifications.filter(n => n.priority === 'high').length}
                </span>
              </div>
            </div>
          </div>

          {/* Notification Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-2">
              {[
                { id: 'all', label: 'All Notifications', count: notifications.length },
                { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
                { id: 'reminders', label: 'Reminders', count: notifications.filter(n => n.category === 'reminder').length },
                { id: 'instructions', label: 'Instructions', count: notifications.filter(n => n.category === 'instruction').length },
                { id: 'progress', label: 'Progress Updates', count: notifications.filter(n => n.category === 'progress').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{tab.label}</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'all' ? 'All Notifications' : 
                   activeTab === 'unread' ? 'Unread Notifications' :
                   activeTab === 'reminders' ? 'Reminders' :
                   activeTab === 'instructions' ? 'Instructions' :
                   'Progress Updates'}
                </h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                  Mark all as read
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.priority === 'medium' ? 'bg-orange-100' :
                        'bg-emerald-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          notification.priority === 'high' ? 'text-red-600' :
                          notification.priority === 'medium' ? 'text-orange-600' :
                          'text-emerald-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-sm font-semibold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-3">
                          <button className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors">
                            Mark as read
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                            Archive
                          </button>
                          {notification.type === 'appointment' && (
                            <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{setting.label}</span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};