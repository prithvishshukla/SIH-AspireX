import React from 'react';
import { Calendar, Users, Bell, TrendingUp, Activity, Clock, Heart, Leaf } from 'lucide-react';

interface DashboardProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const getDashboardContent = () => {
    switch (userRole) {
      case 'patient':
        return <PatientDashboard />;
      case 'practitioner':
        return <PractitionerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {getDashboardContent()}
    </div>
  );
};

const PatientDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
        <p className="text-emerald-100 mb-4">Your wellness journey continues. Here's your progress overview.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-emerald-100" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-emerald-100 text-sm">Sessions Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-emerald-100" />
              <div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-emerald-100 text-sm">Progress Score</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-emerald-100" />
              <div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-emerald-100 text-sm">Wellness Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
              Upcoming Sessions
            </h2>
            <div className="space-y-4">
              <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Abhyanga Massage</h3>
                  <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Today</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">Dr. Priya Sharma • 2:00 PM - 3:30 PM</div>
                <div className="text-sm text-gray-500">Preparation: Light meal 2 hours before, wear comfortable clothing</div>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Shirodhara Therapy</h3>
                  <span className="text-sm text-gray-500">Tomorrow</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">Dr. Rajesh Kumar • 10:00 AM - 11:30 AM</div>
                <div className="text-sm text-gray-500">Preparation: Avoid heavy meals, arrive 15 minutes early</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 text-teal-600 mr-2" />
              Treatment Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Detoxification</span>
                  <span className="text-emerald-600">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Energy Balance</span>
                  <span className="text-teal-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Sleep Quality</span>
                  <span className="text-blue-600">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Leaf className="w-5 h-5 text-green-600 mr-2" />
              Daily Recommendations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Drink warm ginger tea after meals</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Practice pranayama for 15 minutes</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Take evening walk before sunset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PractitionerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Dr. Priya Sharma</h1>
        <p className="text-blue-100 mb-4">Ayurvedic Practitioner • 12 years experience</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-100" />
              <div>
                <div className="text-2xl font-bold">28</div>
                <div className="text-blue-100 text-sm">Active Patients</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-100" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-blue-100 text-sm">Today's Sessions</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-100" />
              <div>
                <div className="text-2xl font-bold">6.5h</div>
                <div className="text-blue-100 text-sm">Session Hours</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-100" />
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-blue-100 text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            Today's Schedule
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">In Progress</span>
              </div>
              <div className="text-sm text-gray-600">2:00 PM - 3:30 PM • Abhyanga Massage</div>
              <div className="text-xs text-gray-500 mt-1">Session 12/21 • Detox Program</div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">Michael Chen</h3>
                <span className="text-sm text-orange-600">Up Next</span>
              </div>
              <div className="text-sm text-gray-600">4:00 PM - 5:30 PM • Shirodhara</div>
              <div className="text-xs text-gray-500 mt-1">Session 5/14 • Stress Relief Program</div>
            </div>
            <div className="border-l-4 border-gray-300 pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">Lisa Williams</h3>
                <span className="text-sm text-gray-500">Scheduled</span>
              </div>
              <div className="text-sm text-gray-600">6:00 PM - 7:00 PM • Consultation</div>
              <div className="text-xs text-gray-500 mt-1">Initial Assessment</div>
            </div>
          </div>
        </div>

        {/* Patient Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="w-5 h-5 text-indigo-600 mr-2" />
            Patient Insights
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Treatment Effectiveness</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Abhyanga</span>
                  <span className="text-sm font-medium text-emerald-600">92% satisfaction</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shirodhara</span>
                  <span className="text-sm font-medium text-blue-600">89% satisfaction</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nasya</span>
                  <span className="text-sm font-medium text-purple-600">87% satisfaction</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Common Improvements</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-green-600">78%</div>
                  <div className="text-xs text-green-700">Better Sleep</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">65%</div>
                  <div className="text-xs text-blue-700">Stress Relief</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">82%</div>
                  <div className="text-xs text-purple-700">Energy Boost</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">71%</div>
                  <div className="text-xs text-orange-700">Pain Relief</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100 mb-4">AyurSutra Health Center Management</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-purple-100" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-purple-100 text-sm">Active Patients</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-purple-100" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-purple-100 text-sm">Practitioners</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-100" />
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-purple-100 text-sm">Today's Sessions</div>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-purple-100" />
              <div>
                <div className="text-2xl font-bold">₹2.1L</div>
                <div className="text-purple-100 text-sm">Monthly Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Center Operations */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Center Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/50">
                <h3 className="font-semibold text-emerald-900 mb-2">Room Utilization</h3>
                <div className="text-2xl font-bold text-emerald-600 mb-1">85%</div>
                <div className="text-sm text-emerald-700">12/14 rooms occupied</div>
              </div>
              <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/50">
                <h3 className="font-semibold text-blue-900 mb-2">Staff Efficiency</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                <div className="text-sm text-blue-700">Above average performance</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-purple-100 rounded-xl p-4 bg-purple-50/50">
                <h3 className="font-semibold text-purple-900 mb-2">Patient Satisfaction</h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">4.8/5</div>
                <div className="text-sm text-purple-700">Based on 45 reviews this week</div>
              </div>
              <div className="border border-orange-100 rounded-xl p-4 bg-orange-50/50">
                <h3 className="font-semibold text-orange-900 mb-2">Revenue Growth</h3>
                <div className="text-2xl font-bold text-orange-600 mb-1">+18%</div>
                <div className="text-sm text-orange-700">Compared to last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <div className="font-medium text-gray-900">Add New Practitioner</div>
              <div className="text-sm text-gray-500">Manage staff directory</div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <div className="font-medium text-gray-900">Schedule Maintenance</div>
              <div className="text-sm text-gray-500">Room and equipment care</div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
              <div className="font-medium text-gray-900">Generate Reports</div>
              <div className="text-sm text-gray-500">Monthly analytics</div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
              <div className="font-medium text-gray-900">Update Pricing</div>
              <div className="text-sm text-gray-500">Treatment packages</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};