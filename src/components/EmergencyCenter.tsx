import React, { useState } from 'react';
import { AlertTriangle, Phone, Clock, User, MapPin, Plus, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmergencyCenterProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

interface Emergency {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'inProgress' | 'resolved';
  reportedBy: string;
  assignedTo?: string;
  location: string;
  timestamp: string;
  updates: Array<{
    timestamp: string;
    message: string;
    author: string;
  }>;
}

export const EmergencyCenter: React.FC<EmergencyCenterProps> = ({ userRole }) => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showReportModal, setShowReportModal] = useState(false);

  const emergencies: Emergency[] = [
    {
      id: 'emg-001',
      title: 'Patient experiencing severe allergic reaction',
      description: 'Patient Sarah Johnson showing signs of severe allergic reaction during Abhyanga session. Immediate medical attention required.',
      priority: 'critical',
      status: 'inProgress',
      reportedBy: 'Dr. Priya Sharma',
      assignedTo: 'Emergency Team Alpha',
      location: 'Treatment Room 3',
      timestamp: '2025-01-08T14:30:00Z',
      updates: [
        {
          timestamp: '2025-01-08T14:35:00Z',
          message: 'Emergency team dispatched to location',
          author: 'System'
        },
        {
          timestamp: '2025-01-08T14:40:00Z',
          message: 'Patient stabilized, administering antihistamine',
          author: 'Dr. Emergency Team'
        }
      ]
    },
    {
      id: 'emg-002',
      title: 'Equipment malfunction in Shirodhara room',
      description: 'Oil heating system malfunctioned, potential safety hazard. Room evacuated as precaution.',
      priority: 'high',
      status: 'resolved',
      reportedBy: 'Maintenance Staff',
      assignedTo: 'Technical Team',
      location: 'Shirodhara Room 2',
      timestamp: '2025-01-08T10:15:00Z',
      updates: [
        {
          timestamp: '2025-01-08T10:20:00Z',
          message: 'Room evacuated, technical team notified',
          author: 'Safety Officer'
        },
        {
          timestamp: '2025-01-08T11:45:00Z',
          message: 'Equipment repaired and tested. Room cleared for use.',
          author: 'Technical Team'
        }
      ]
    },
    {
      id: 'emg-003',
      title: 'Patient fall in reception area',
      description: 'Elderly patient slipped on wet floor near reception. Minor injury reported.',
      priority: 'medium',
      status: 'resolved',
      reportedBy: 'Reception Staff',
      assignedTo: 'First Aid Team',
      location: 'Reception Area',
      timestamp: '2025-01-07T16:20:00Z',
      updates: [
        {
          timestamp: '2025-01-07T16:25:00Z',
          message: 'First aid administered, patient conscious and responsive',
          author: 'First Aid Team'
        },
        {
          timestamp: '2025-01-07T16:45:00Z',
          message: 'Patient cleared by medical staff, incident report filed',
          author: 'Medical Staff'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'inProgress': return 'bg-orange-100 text-orange-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredEmergencies = emergencies.filter(emergency => 
    selectedStatus === 'all' || emergency.status === selectedStatus
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('emergency.title')}</h1>
          <p className="text-gray-600">{t('emergency.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
            <Phone className="w-4 h-4" />
            <span className="font-medium">Emergency: 911</span>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('emergency.reportEmergency')}</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-100" />
            <span className="text-2xl font-bold">
              {emergencies.filter(e => e.status === 'open').length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Open Cases</h3>
          <p className="text-red-100 text-sm">Require immediate attention</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-orange-100" />
            <span className="text-2xl font-bold">
              {emergencies.filter(e => e.status === 'inProgress').length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">In Progress</h3>
          <p className="text-orange-100 text-sm">Being handled</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <User className="w-8 h-8 text-green-100" />
            <span className="text-2xl font-bold">
              {emergencies.filter(e => e.status === 'resolved').length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Resolved</h3>
          <p className="text-green-100 text-sm">Successfully handled</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-purple-100" />
            <span className="text-2xl font-bold">
              {emergencies.filter(e => e.priority === 'critical').length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Critical Priority</h3>
          <p className="text-purple-100 text-sm">Highest urgency</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex space-x-2">
            {['all', 'open', 'inProgress', 'resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? 'All' : t(`emergency.status.${status}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Emergency Timeline</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredEmergencies.map((emergency) => (
            <div key={emergency.id} className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-4 h-4 rounded-full mt-2 ${getPriorityColor(emergency.priority)}`} />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{emergency.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(emergency.status)}`}>
                        {t(`emergency.status.${emergency.status}`)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(emergency.priority)}`}>
                        {t(`emergency.priority.${emergency.priority}`)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{emergency.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Reported by: {emergency.reportedBy}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {emergency.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(emergency.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {emergency.updates.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Updates</h4>
                      <div className="space-y-2">
                        {emergency.updates.map((update, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">{update.author}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(update.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{update.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Emergency Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('emergency.reportEmergency')}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option value="">Select emergency type...</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="safety">Safety Hazard</option>
                  <option value="equipment">Equipment Failure</option>
                  <option value="security">Security Incident</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option value="low">{t('emergency.priority.low')}</option>
                  <option value="medium">{t('emergency.priority.medium')}</option>
                  <option value="high">{t('emergency.priority.high')}</option>
                  <option value="critical">{t('emergency.priority.critical')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Specific location of emergency..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
                  rows={4}
                  placeholder="Detailed description of the emergency..."
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Report Emergency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};