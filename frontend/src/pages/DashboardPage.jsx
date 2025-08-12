import React, { useState } from 'react';
import { Plus, MessageSquare, Book, FolderOpen, Calendar } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import CreateSpaceModal from '../components/CreateSpaceModal';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  const handleOpenChatClick = () => {
    // setActiveSpace(activeSpace === space.id ? null : space.id);
    navigate('/chat');
  };


  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  // Mock data cho spaces
  const spaces = [
    {
      id: 1,
      name: 'test',
      date: 'Aug 12, 2025',
      documents: 1,
      conversations: 2,
      color: 'orange'
    },
    {
      id: 2,
      name: 'Project Alpha',
      date: 'Aug 10, 2025',
      documents: 5,
      conversations: 8,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Research Notes',
      date: 'Aug 8, 2025',
      documents: 12,
      conversations: 3,
      color: 'green'
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Dashboard Header */}
      <DashboardHeader isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Main Dashboard Content */}
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen w-full`}>
      {/* Main content */}
      <div className="px-6 py-8 w-full max-w-none">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Welcome back, kienle!</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your document spaces and conversations</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Spaces */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Total Spaces</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Documents</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>18</p>
              </div>
            </div>
          </div>

          {/* Conversations */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Conversations</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>13</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Spaces section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Spaces</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-white' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-900'} px-4 py-2 rounded-lg flex items-center space-x-2 border shadow-sm transition-colors`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Space</span>
            </button>
          </div>

          {/* Spaces grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div key={space.id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Folder icon */}
                    <div className={`w-12 h-12 ${getColorClass(space.color)} rounded-xl flex items-center justify-center`}>
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{space.name}</h4>
                      <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                        <Calendar className="w-4 h-4" />
                        <span>{space.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-xs text-white">
                        {space.documents}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{space.conversations}</span>
                    </div>
                  </div>
                </div>

                {/* Open chat button */}
                <button 
                  onClick={handleOpenChatClick}
                  className={`flex items-center space-x-2 w-full justify-end transition-all duration-200 px-3 py-2 rounded-lg ${
                    activeSpace === space.id
                      ? isDark 
                        ? 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/40' 
                        : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                      : isDark 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {activeSpace === space.id ? 'Close chat' : 'Open chat'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeSpace === space.id ? 'rotate-90' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Space Modal */}
      <CreateSpaceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />
    </div>
  </div>
  );
};

export default DashboardPage;