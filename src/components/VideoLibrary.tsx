import React, { useState } from 'react';
import { Play, FileText, Settings, Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VideoLibraryProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

interface Video {
  id: string;
  title: string;
  description: string;
  category: 'exercise' | 'awareness' | 'diet';
  duration: string;
  thumbnail: string;
  transcript: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  views: number;
}

export const VideoLibrary: React.FC<VideoLibraryProps> = ({ userRole }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'exercise' | 'awareness' | 'diet'>('exercise');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [videoQuality, setVideoQuality] = useState('720p');

  const videos: Video[] = [
    {
      id: 'ex-001',
      title: 'Morning Yoga for Vata Balance',
      description: 'Gentle yoga sequence to balance Vata dosha and start your day with energy.',
      category: 'exercise',
      duration: '15:30',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'Welcome to this morning yoga practice designed specifically for balancing Vata dosha. We will begin with gentle breathing exercises...',
      instructor: 'Dr. Anjali Mehta',
      level: 'beginner',
      views: 1250
    },
    {
      id: 'ex-002',
      title: 'Pranayama for Stress Relief',
      description: 'Learn powerful breathing techniques to reduce stress and anxiety.',
      category: 'exercise',
      duration: '12:45',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'In this session, we will explore three fundamental pranayama techniques that help calm the nervous system...',
      instructor: 'Yogi Ramesh',
      level: 'intermediate',
      views: 890
    },
    {
      id: 'aw-001',
      title: 'Understanding Your Dosha',
      description: 'Comprehensive guide to identifying and understanding your unique constitution.',
      category: 'awareness',
      duration: '25:20',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'Ayurveda teaches us that each person has a unique constitution called Prakriti. This is determined by the combination of three doshas...',
      instructor: 'Dr. Priya Sharma',
      level: 'beginner',
      views: 2100
    },
    {
      id: 'aw-002',
      title: 'Seasonal Living According to Ayurveda',
      description: 'How to adapt your lifestyle and diet according to seasonal changes.',
      category: 'awareness',
      duration: '18:15',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'Ayurveda emphasizes living in harmony with nature and seasonal cycles. Each season brings different qualities...',
      instructor: 'Dr. Rajesh Kumar',
      level: 'intermediate',
      views: 1560
    },
    {
      id: 'dt-001',
      title: 'Ayurvedic Cooking Basics',
      description: 'Learn the fundamentals of cooking according to Ayurvedic principles.',
      category: 'diet',
      duration: '22:30',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'Ayurvedic cooking is not just about ingredients, but about how we prepare and consume our food. We will start with the six tastes...',
      instructor: 'Chef Lakshmi',
      level: 'beginner',
      views: 1780
    },
    {
      id: 'dt-002',
      title: 'Detox Foods and Recipes',
      description: 'Discover foods that support natural detoxification and learn simple recipes.',
      category: 'diet',
      duration: '16:45',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      transcript: 'Natural detoxification is supported by specific foods and spices. Today we will explore kitchari, the perfect detox meal...',
      instructor: 'Nutritionist Kavya',
      level: 'intermediate',
      views: 1340
    }
  ];

  const filteredVideos = videos.filter(video => video.category === activeTab);

  const tabs = [
    { id: 'exercise', label: t('videoLibrary.exercise'), count: videos.filter(v => v.category === 'exercise').length },
    { id: 'awareness', label: t('videoLibrary.awareness'), count: videos.filter(v => v.category === 'awareness').length },
    { id: 'diet', label: t('videoLibrary.diet'), count: videos.filter(v => v.category === 'diet').length }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('videoLibrary.title')}</h1>
          <p className="text-gray-600">{t('videoLibrary.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  video.level === 'beginner' ? 'bg-green-100 text-green-700' :
                  video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {video.level}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{video.instructor}</span>
                <span>{video.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{selectedVideo.title}</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded text-sm"
                >
                  <option value="144p">144p</option>
                  <option value="360p">360p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('videoLibrary.transcript')}</span>
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex">
              <div className={`${showTranscript ? 'w-2/3' : 'w-full'} bg-black`}>
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Video Player ({videoQuality})</p>
                    <p className="text-sm text-gray-300">Duration: {selectedVideo.duration}</p>
                  </div>
                </div>
              </div>
              
              {showTranscript && (
                <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto max-h-96">
                  <h3 className="font-semibold text-gray-900 mb-3">{t('videoLibrary.transcript')}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedVideo.transcript}</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedVideo.title}</h3>
                  <p className="text-sm text-gray-600">by {selectedVideo.instructor}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedVideo.views.toLocaleString()} views
                </div>
              </div>
              <p className="text-gray-700 mt-2">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};