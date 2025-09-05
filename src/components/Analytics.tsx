import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Activity, Target, PieChart, Download } from 'lucide-react';

interface AnalyticsProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const Analytics: React.FC<AnalyticsProps> = ({ userRole }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('progress');

  const progressData = [
    { name: 'Week 1', wellness: 65, energy: 45, sleep: 70, stress: 80 },
    { name: 'Week 2', wellness: 72, energy: 58, sleep: 75, stress: 65 },
    { name: 'Week 3', wellness: 78, energy: 70, sleep: 80, stress: 50 },
    { name: 'Week 4', wellness: 85, energy: 82, sleep: 90, stress: 35 }
  ];

  const therapyEffectiveness = [
    { name: 'Abhyanga', satisfaction: 92, sessions: 45, improvement: 88 },
    { name: 'Shirodhara', satisfaction: 89, sessions: 32, improvement: 85 },
    { name: 'Nasya', satisfaction: 87, sessions: 28, improvement: 82 },
    { name: 'Basti', satisfaction: 94, sessions: 20, improvement: 91 },
    { name: 'Udvartana', satisfaction: 86, sessions: 35, improvement: 79 }
  ];

  const renderPatientAnalytics = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-100" />
            <span className="text-sm text-emerald-100">+15%</span>
          </div>
          <h3 className="font-semibold mb-1">Overall Progress</h3>
          <div className="text-2xl font-bold">85%</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-blue-100" />
            <span className="text-sm text-blue-100">12/21</span>
          </div>
          <h3 className="font-semibold mb-1">Sessions Completed</h3>
          <div className="text-2xl font-bold">57%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-purple-100" />
            <span className="text-sm text-purple-100">3/5</span>
          </div>
          <h3 className="font-semibold mb-1">Goals Achieved</h3>
          <div className="text-2xl font-bold">60%</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-orange-100" />
            <span className="text-sm text-orange-100">98%</span>
          </div>
          <h3 className="font-semibold mb-1">Attendance Rate</h3>
          <div className="text-2xl font-bold">Excellent</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Progress Trends</h2>
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              <option value="progress">Overall Progress</option>
              <option value="wellness">Wellness Metrics</option>
              <option value="symptoms">Symptom Tracking</option>
            </select>
          </div>

          <div className="space-y-6">
            {progressData.map((week, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">{week.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Wellness Score</span>
                    <span className="font-medium text-emerald-600">{week.wellness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${week.wellness}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Energy Level</span>
                    <span className="font-medium text-blue-600">{week.energy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${week.energy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Therapy Effectiveness */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Therapy Response</h2>
          
          <div className="space-y-6">
            {therapyEffectiveness.slice(0, 4).map((therapy, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{therapy.name}</h3>
                  <span className="text-sm text-gray-600">{therapy.sessions} sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${therapy.improvement}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">
                    {therapy.improvement}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <div className="text-lg font-bold text-emerald-600">4.8/5</div>
                <div className="text-xs text-emerald-700">Avg Satisfaction</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">87%</div>
                <div className="text-xs text-blue-700">Improvement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPractitionerAnalytics = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-100" />
            <span className="text-sm text-blue-100">+5</span>
          </div>
          <h3 className="font-semibold mb-1">Active Patients</h3>
          <div className="text-2xl font-bold">28</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-emerald-100" />
            <span className="text-sm text-emerald-100">↑12%</span>
          </div>
          <h3 className="font-semibold mb-1">Session Success Rate</h3>
          <div className="text-2xl font-bold">94%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-100" />
            <span className="text-sm text-purple-100">4.9/5</span>
          </div>
          <h3 className="font-semibold mb-1">Patient Satisfaction</h3>
          <div className="text-2xl font-bold">Excellent</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-orange-100" />
            <span className="text-sm text-orange-100">156h</span>
          </div>
          <h3 className="font-semibold mb-1">Monthly Hours</h3>
          <div className="text-2xl font-bold">On Track</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Outcomes */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Outcomes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Treatment Effectiveness</h3>
              {therapyEffectiveness.map((therapy, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{therapy.name}</span>
                    <span className="font-medium text-emerald-600">{therapy.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${therapy.satisfaction}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Common Improvements</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">78%</div>
                  <div className="text-xs text-green-700">Better Sleep</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600">65%</div>
                  <div className="text-xs text-blue-700">Stress Relief</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">82%</div>
                  <div className="text-xs text-purple-700">Energy Boost</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-orange-600">71%</div>
                  <div className="text-xs text-orange-700">Pain Relief</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Sessions</span>
                <span className="font-semibold text-gray-900">145</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New Patients</span>
                <span className="font-semibold text-emerald-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed Programs</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Session Rating</span>
                <span className="font-semibold text-purple-600">4.8/5</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Performance Insights</h3>
            <div className="space-y-3 text-sm text-emerald-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Your patient satisfaction is 15% above center average</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Abhyanga treatments show highest improvement rates</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Consider adding more Shirodhara sessions for stress relief cases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'patient' ? 'Your Analytics' : 'Practice Analytics'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'patient' 
              ? 'Track your wellness journey and therapy outcomes'
              : 'Monitor patient outcomes and practice performance'
            }
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {userRole === 'patient' ? renderPatientAnalytics() : renderPractitionerAnalytics()}
    </div>
  );
};