import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, ThumbsUp, Eye, Shield, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CommunityForumProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'patient' | 'practitioner' | 'admin';
  isDoctorVerified: boolean;
  category: string;
  replies: Reply[];
  views: number;
  likes: number;
  timestamp: string;
  tags: string[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  authorRole: 'patient' | 'practitioner' | 'admin';
  isDoctorVerified: boolean;
  timestamp: string;
  likes: number;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ userRole }) => {
  const { t } = useTranslation();
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const threads: Thread[] = [
    {
      id: 'thread-001',
      title: 'Best practices for post-Abhyanga care?',
      content: 'I just completed my first Abhyanga massage session and feeling amazing! However, I want to make sure I\'m following the right post-treatment care. What should I be doing in the hours after the session?',
      author: 'Sarah Johnson',
      authorRole: 'patient',
      isDoctorVerified: false,
      category: 'Treatment Care',
      replies: [
        {
          id: 'reply-001',
          content: 'Great question! After Abhyanga, it\'s important to rest for at least 30 minutes. Drink warm water, avoid cold foods, and take a warm shower after 2-3 hours. The oils need time to penetrate deeply.',
          author: 'Dr. Priya Sharma',
          authorRole: 'practitioner',
          isDoctorVerified: true,
          timestamp: '2025-01-08T10:30:00Z',
          likes: 15
        },
        {
          id: 'reply-002',
          content: 'I always feel so relaxed after Abhyanga! Dr. Sharma\'s advice is spot on. I also avoid heavy meals for a few hours and stick to light, warm foods.',
          author: 'Michael Chen',
          authorRole: 'patient',
          isDoctorVerified: false,
          timestamp: '2025-01-08T11:15:00Z',
          likes: 8
        }
      ],
      views: 234,
      likes: 23,
      timestamp: '2025-01-08T09:15:00Z',
      tags: ['abhyanga', 'post-care', 'massage']
    },
    {
      id: 'thread-002',
      title: 'Dietary recommendations during Panchakarma',
      content: 'I\'m starting my 21-day Panchakarma program next week. Can someone share what foods I should focus on and what to avoid? I have a Vata-Pitta constitution.',
      author: 'Lisa Williams',
      authorRole: 'patient',
      isDoctorVerified: false,
      category: 'Diet & Nutrition',
      replies: [
        {
          id: 'reply-003',
          content: 'For Vata-Pitta constitution during Panchakarma, focus on warm, cooked foods. Kitchari is excellent - it\'s easy to digest and supports detox. Avoid raw foods, cold drinks, and spicy foods. Include ghee, warm milk, and sweet fruits.',
          author: 'Dr. Rajesh Kumar',
          authorRole: 'practitioner',
          isDoctorVerified: true,
          timestamp: '2025-01-07T14:20:00Z',
          likes: 28
        }
      ],
      views: 189,
      likes: 31,
      timestamp: '2025-01-07T13:45:00Z',
      tags: ['diet', 'panchakarma', 'vata-pitta', 'nutrition']
    },
    {
      id: 'thread-003',
      title: 'Managing anxiety during treatment',
      content: 'This is my first time doing Panchakarma and I\'m feeling a bit anxious about some of the treatments. Is this normal? How do others cope with treatment anxiety?',
      author: 'David Kumar',
      authorRole: 'patient',
      isDoctorVerified: false,
      category: 'Mental Health',
      replies: [
        {
          id: 'reply-004',
          content: 'It\'s completely normal to feel anxious before new treatments! I recommend practicing deep breathing exercises and communicating openly with your practitioner about your concerns. They can explain each step and help you feel more comfortable.',
          author: 'Dr. Anjali Mehta',
          authorRole: 'practitioner',
          isDoctorVerified: true,
          timestamp: '2025-01-06T16:30:00Z',
          likes: 19
        },
        {
          id: 'reply-005',
          content: 'I felt the same way! What helped me was asking lots of questions and remembering that the practitioners are there to help. The treatments are actually very relaxing once you get used to them.',
          author: 'Emma Thompson',
          authorRole: 'patient',
          isDoctorVerified: false,
          timestamp: '2025-01-06T17:15:00Z',
          likes: 12
        }
      ],
      views: 156,
      likes: 18,
      timestamp: '2025-01-06T15:20:00Z',
      tags: ['anxiety', 'mental-health', 'first-time', 'support']
    }
  ];

  const categories = ['All', 'Treatment Care', 'Diet & Nutrition', 'Mental Health', 'Exercise', 'General Discussion'];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'practitioner': return 'text-emerald-600';
      case 'admin': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'practitioner': return 'bg-emerald-100 text-emerald-700';
      case 'admin': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('forum.title')}</h1>
          <p className="text-gray-600">{t('forum.subtitle')}</p>
        </div>
        <button
          onClick={() => setShowNewThreadModal(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t('forum.newThread')}</span>
        </button>
      </div>

      {selectedThread ? (
        /* Thread Detail View */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-2"
          >
            <span>← Back to forum</span>
          </button>

          {/* Thread Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedThread.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className={getRoleColor(selectedThread.authorRole)}>{selectedThread.author}</span>
                    {selectedThread.isDoctorVerified && (
                      <Shield className="w-4 h-4 text-emerald-600" title={t('forum.doctorVerified')} />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(selectedThread.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{selectedThread.views} {t('forum.views')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{selectedThread.likes}</span>
                </button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700">{selectedThread.content}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedThread.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedThread.replies.length} {t('forum.replies')}
            </h2>
            
            {selectedThread.replies.map((reply) => (
              <div key={reply.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getRoleColor(reply.authorRole)}`}>
                          {reply.author}
                        </span>
                        {reply.isDoctorVerified && (
                          <Shield className="w-4 h-4 text-emerald-600" title={t('forum.doctorVerified')} />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadge(reply.authorRole)}`}>
                          {reply.authorRole}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(reply.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{reply.likes}</span>
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('forum.reply')}</h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={4}
              placeholder="Share your thoughts or ask a follow-up question..."
            />
            <div className="flex justify-end mt-4">
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Thread List View */
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Thread List */}
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedThread(thread)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        {thread.category}
                      </span>
                      {thread.isDoctorVerified && (
                        <Shield className="w-4 h-4 text-emerald-600" title={t('forum.doctorVerified')} />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                      {thread.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{thread.content}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className={getRoleColor(thread.authorRole)}>{thread.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{thread.replies.length} {t('forum.replies')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>{thread.views} {t('forum.views')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{thread.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(thread.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('forum.newThread')}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="What's your question or topic?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={6}
                  placeholder="Share your question, experience, or start a discussion..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add tags separated by commas (e.g., abhyanga, diet, anxiety)"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};