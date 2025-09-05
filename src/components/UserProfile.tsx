import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Shield, Bell } from 'lucide-react';

interface UserProfileProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const UserProfile: React.FC<UserProfileProps> = ({ userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const profileData = {
    patient: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Wellness Street, San Francisco, CA 94102',
      dateOfBirth: '1985-06-15',
      emergencyContact: 'Michael Johnson - +1 (555) 987-6543',
      medicalHistory: 'Chronic stress, occasional migraines, lactose intolerance',
      currentProgram: 'Detoxification & Stress Relief Package',
      practitioner: 'Dr. Priya Sharma',
      joinDate: '2024-11-15'
    },
    practitioner: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@ayursutra.com',
      phone: '+1 (555) 234-5678',
      address: 'AyurSutra Health Center, 456 Healing Avenue',
      specialization: 'Panchakarma Therapy, Stress Management',
      experience: '12 years',
      certification: 'BAMS, MD (Ayurveda), Certified Panchakarma Specialist',
      languages: 'English, Hindi, Sanskrit',
      workSchedule: 'Monday-Friday: 9:00 AM - 6:00 PM',
      patientCount: 28
    }
  };

  const currentProfile = userRole === 'patient' ? profileData.patient : profileData.practitioner;

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{currentProfile.name}</h1>
            <p className="text-emerald-100 mb-4">
              {userRole === 'patient' ? 'Wellness Journey Member' : currentProfile.specialization}
            </p>
            <div className="flex items-center space-x-4 text-emerald-100">
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {currentProfile.email}
              </span>
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {currentProfile.phone}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={currentProfile.name}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-900">{currentProfile.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  defaultValue={currentProfile.email}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-900">{currentProfile.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  defaultValue={currentProfile.phone}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-900">{currentProfile.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  defaultValue={currentProfile.address}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900">{currentProfile.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional/Medical Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {userRole === 'patient' ? 'Medical Information' : 'Professional Information'}
          </h2>
          <div className="space-y-4">
            {userRole === 'patient' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <p className="text-gray-900">{new Date(currentProfile.dateOfBirth).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <p className="text-gray-900">{currentProfile.emergencyContact}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                  {isEditing ? (
                    <textarea
                      defaultValue={currentProfile.medicalHistory}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900">{currentProfile.medicalHistory}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Program</label>
                  <p className="text-emerald-600 font-medium">{currentProfile.currentProgram}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Practitioner</label>
                  <p className="text-gray-900">{currentProfile.practitioner}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <p className="text-gray-900">{currentProfile.specialization}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <p className="text-gray-900">{currentProfile.experience}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
                  <p className="text-gray-900">{currentProfile.certification}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <p className="text-gray-900">{currentProfile.languages}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Schedule</label>
                  <p className="text-gray-900">{currentProfile.workSchedule}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active Patients</label>
                  <p className="text-emerald-600 font-medium">{currentProfile.patientCount}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {userRole === 'patient' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600 mb-1">12</div>
              <div className="text-sm text-emerald-700">Sessions Completed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">9</div>
              <div className="text-sm text-blue-700">Sessions Remaining</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
              <div className="text-sm text-purple-700">Wellness Score</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-1">58</div>
              <div className="text-sm text-orange-700">Days Since Start</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Confirm new password"
              />
            </div>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              Update Password
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">SMS Authentication</div>
              <div className="text-sm text-gray-600">Receive SMS codes for additional security</div>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        {[
          { id: 'appointments', label: 'Appointment Reminders', description: 'Get notified about upcoming sessions' },
          { id: 'progress', label: 'Progress Updates', description: 'Receive updates about your wellness journey' },
          { id: 'instructions', label: 'Pre/Post Treatment Instructions', description: 'Important care instructions' },
          { id: 'newsletter', label: 'Wellness Newsletter', description: 'Monthly tips and insights' },
          { id: 'promotions', label: 'Special Offers', description: 'New programs and discounts' }
        ].map((setting) => (
          <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{setting.label}</div>
              <div className="text-sm text-gray-600">{setting.description}</div>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">SMS</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">App</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'security' && renderSecurityTab()}
      {activeTab === 'notifications' && renderNotificationsTab()}
    </div>
  );
};