import React, { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageSquare, Share, Settings, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VideoConsultationProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const VideoConsultation: React.FC<VideoConsultationProps> = ({ userRole }) => {
  const { t } = useTranslation();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState('');

  const chatMessages = [
    { id: 1, sender: 'Dr. Priya Sharma', message: 'Hello! How are you feeling today?', timestamp: '10:30 AM', isDoctor: true },
    { id: 2, sender: 'You', message: 'Hi Doctor, I\'m feeling much better after the last session.', timestamp: '10:31 AM', isDoctor: false },
    { id: 3, sender: 'Dr. Priya Sharma', message: 'That\'s great to hear! Let\'s discuss your progress.', timestamp: '10:32 AM', isDoctor: true }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('consultation.title')}</h1>
          <p className="text-gray-600">{t('consultation.subtitle')}</p>
        </div>
        {!isCallActive && (
          <button
            onClick={startCall}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <Video className="w-5 h-5" />
            <span>{t('consultation.startCall')}</span>
          </button>
        )}
      </div>

      {isCallActive ? (
        /* Active Call Interface */
        <div className="space-y-6">
          {/* Call Duration */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <Clock className="w-4 h-4" />
              <span className="font-medium">{formatDuration(callDuration)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Video Area */}
            <div className={`${showChat ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-4`}>
              {/* Remote Video */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">DS</span>
                    </div>
                    <h3 className="text-xl font-semibold">Dr. Priya Sharma</h3>
                    <p className="text-gray-300">Ayurvedic Practitioner</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  Dr. Priya Sharma
                </div>
              </div>

              {/* Local Video (Picture-in-Picture) */}
              <div className="relative">
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden z-10">
                  <div className="w-full h-full flex items-center justify-center">
                    {isCameraOn ? (
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg font-bold">You</span>
                        </div>
                        <p className="text-sm">Your Video</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <VideoOff className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Camera Off</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-4 rounded-full transition-colors ${
                    isMicOn 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  title={t('consultation.toggleMic')}
                >
                  {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </button>

                <button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-4 rounded-full transition-colors ${
                    isCameraOn 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  title={t('consultation.toggleCamera')}
                >
                  {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </button>

                <button
                  onClick={() => setShowChat(!showChat)}
                  className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  title={t('consultation.chat')}
                >
                  <MessageSquare className="w-6 h-6" />
                </button>

                <button
                  className="p-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  title={t('consultation.shareFile')}
                >
                  <Share className="w-6 h-6" />
                </button>

                <button
                  className="p-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>

                <button
                  onClick={endCall}
                  className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title={t('consultation.endCall')}
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-96">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">{t('consultation.chat')}</h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isDoctor ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.isDoctor
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isDoctor ? 'text-gray-500' : 'text-emerald-100'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Pre-Call Interface */
        <div className="space-y-8">
          {/* Upcoming Consultations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Consultations</h2>
            <div className="space-y-4">
              <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">Dr. Priya Sharma</h3>
                    <p className="text-sm text-gray-600">Follow-up Consultation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">Today, 2:00 PM</p>
                    <p className="text-sm text-gray-500">30 minutes</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Progress Review</span>
                    <span>•</span>
                    <span>Treatment Adjustment</span>
                  </div>
                  <button
                    onClick={startCall}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Now</span>
                  </button>
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">Dr. Rajesh Kumar</h3>
                    <p className="text-sm text-gray-600">Initial Consultation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">Tomorrow, 10:00 AM</p>
                    <p className="text-sm text-gray-500">45 minutes</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Health Assessment</span>
                    <span>•</span>
                    <span>Treatment Planning</span>
                  </div>
                  <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                    Scheduled
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Test Your Setup</h3>
              <p className="text-sm text-gray-600 mb-4">Check your camera and microphone before the call</p>
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Test Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Message Doctor</h3>
              <p className="text-sm text-gray-600 mb-4">Send a message before your consultation</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Files</h3>
              <p className="text-sm text-gray-600 mb-4">Upload reports or documents for review</p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Upload Files
              </button>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Browser</h4>
                <ul className="space-y-1">
                  <li>• Chrome 88+ or Firefox 85+</li>
                  <li>• Safari 14+ (macOS/iOS)</li>
                  <li>• Edge 88+</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Internet Connection</h4>
                <ul className="space-y-1">
                  <li>• Minimum: 1 Mbps upload/download</li>
                  <li>• Recommended: 3+ Mbps for HD video</li>
                  <li>• Stable connection required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};