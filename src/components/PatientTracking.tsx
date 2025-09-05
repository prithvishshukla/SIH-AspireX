import React, { useState } from 'react';
import { TrendingUp, Activity, Heart, Zap, Calendar, Clock, Target, Award } from 'lucide-react';

interface PatientTrackingProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const PatientTracking: React.FC<PatientTrackingProps> = ({ userRole }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('wellness');

  const progressData = [
    { name: 'Detoxification', current: 85, target: 100, color: 'emerald' },
    { name: 'Energy Balance', current: 72, target: 100, color: 'blue' },
    { name: 'Sleep Quality', current: 90, target: 100, color: 'purple' },
    { name: 'Stress Level', current: 35, target: 20, color: 'orange', inverse: true },
    { name: 'Digestion', current: 78, target: 100, color: 'teal' },
    { name: 'Mental Clarity', current: 82, target: 100, color: 'indigo' }
  ];

  const recentSessions = [
    {
      date: '2025-01-08',
      therapy: 'Abhyanga Massage',
      duration: '90 min',
      satisfaction: 5,
      notes: 'Felt very relaxed, muscles tension reduced significantly'
    },
    {
      date: '2025-01-05',
      therapy: 'Shirodhara',
      duration: '60 min',
      satisfaction: 4,
      notes: 'Deep relaxation achieved, slight headache afterwards'
    },
    {
      date: '2025-01-03',
      therapy: 'Nasya Therapy',
      duration: '45 min',
      satisfaction: 5,
      notes: 'Breathing improved, sinus congestion cleared'
    }
  ];

  const vitals = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', color: 'emerald' },
    { label: 'Heart Rate', value: '68 BPM', status: 'normal', color: 'blue' },
    { label: 'Weight', value: '68.5 kg', status: 'stable', color: 'purple' },
    { label: 'Body Temperature', value: '98.6°F', status: 'normal', color: 'teal' }
  ];

  const milestones = [
    { title: 'First Week Complete', date: '2024-12-28', achieved: true },
    { title: '10 Sessions Milestone', date: '2025-01-05', achieved: true },
    { title: 'Halfway Point', date: '2025-01-15', achieved: false },
    { title: 'Program Complete', date: '2025-02-01', achieved: false }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'patient' ? 'Your Progress Tracking' : 'Patient Progress'}
          </h1>
          <p className="text-gray-600">Monitor therapy outcomes and wellness improvements</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-emerald-100" />
            <span className="text-2xl font-bold">4.8</span>
          </div>
          <h3 className="font-semibold mb-1">Wellness Score</h3>
          <p className="text-emerald-100 text-sm">+0.3 from last week</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-blue-100" />
            <span className="text-2xl font-bold">12/21</span>
          </div>
          <h3 className="font-semibold mb-1">Sessions Done</h3>
          <p className="text-blue-100 text-sm">57% complete</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-purple-100" />
            <span className="text-2xl font-bold">85%</span>
          </div>
          <h3 className="font-semibold mb-1">Energy Level</h3>
          <p className="text-purple-100 text-sm">Significant improvement</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-orange-100" />
            <span className="text-2xl font-bold">3</span>
          </div>
          <h3 className="font-semibold mb-1">Goals Achieved</h3>
          <p className="text-orange-100 text-sm">2 pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Progress Metrics</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('wellness')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === 'wellness'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Wellness
                </button>
                <button
                  onClick={() => setSelectedMetric('symptoms')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === 'symptoms'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Symptoms
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {progressData.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                    <span className={`text-sm font-bold text-${metric.color}-600`}>
                      {metric.current}
                      {metric.inverse ? '% (target: ≤' + metric.target + '%)' : '%'}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-${metric.color}-500 h-3 rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${metric.inverse ? 
                            Math.max(0, 100 - metric.current) : 
                            (metric.current / metric.target) * 100}%` 
                        }}
                      ></div>
                    </div>
                    {!metric.inverse && metric.target && (
                      <div
                        className="absolute top-0 w-0.5 h-3 bg-gray-400"
                        style={{ left: `${(metric.target / 100) * 100}%` }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Sessions</h2>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.therapy}</h3>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {session.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${
                            i < session.satisfaction ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {session.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vitals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Vitals</h3>
            <div className="space-y-4">
              {vitals.map((vital, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="text-sm text-gray-600">{vital.label}</div>
                    <div className="font-semibold text-gray-900">{vital.value}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full bg-${vital.color}-100 text-${vital.color}-700`}>
                    {vital.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              Milestones
            </h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.achieved ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      milestone.achieved ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {milestone.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(milestone.date).toLocaleDateString()}
                    </div>
                  </div>
                  {milestone.achieved && (
                    <Award className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                <div className="font-medium text-emerald-900">Log Daily Symptoms</div>
                <div className="text-sm text-emerald-700">Track your daily wellness</div>
              </button>
              <button className="w-full p-3 text-left bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                <div className="font-medium text-emerald-900">Update Goals</div>
                <div className="text-sm text-emerald-700">Modify treatment objectives</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};