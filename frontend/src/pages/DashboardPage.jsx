import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, Book, FolderOpen, Calendar, Loader2, Palette, FileText, Briefcase, Target, Lightbulb, Rocket, Zap, BarChart3, Building, Wrench, MoreVertical } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import CreateSpaceModal from '../components/CreateSpaceModal';
import EditSpaceModal from '../components/EditSpaceModal';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/UserService';
import { getDashboardData } from '../services/dashboardService';
import { deleteSpace } from '../services/spaceService';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [spaces, setSpaces] = useState([]);
  const [stats, setStats] = useState({
    totalSpaces: 0,
    totalDocuments: 0,
    totalConversations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingSpace, setEditingSpace] = useState(null);
  const navigate = useNavigate();

  // Hàm để tải dữ liệu dashboard
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardData();
      setSpaces(data.spaces);
      setStats(data.stats);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleOpenChatClick = (spaceId) => {
    // setActiveSpace(activeSpace === space.id ? null : space.id);
    navigate(`/chat/${spaceId}`);
  };

  // Hàm xử lý click outside để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.space-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  // Hàm xử lý chỉnh sửa space
  const handleEditSpace = (space) => {
    setEditingSpace(space);
    setIsEditModalOpen(true);
    setOpenMenuId(null);
  };

  // Hàm xử lý xóa space
  const handleDeleteSpace = async (spaceId) => {
    try {
      await deleteSpace(spaceId);
      // Reload dashboard data after deletion
      await loadDashboardData();
    } catch (err) {
      console.error('Error deleting space:', err);
      // TODO: Show error message to user
    }
    setOpenMenuId(null);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Hàm để lấy màu tương ứng với icon
  const getIconColorClass = (iconId) => {
    const iconColors = {
      folder: 'bg-yellow-500',
      palette: 'bg-pink-500',
      file: 'bg-orange-500',
      briefcase: 'bg-gray-600',
      target: 'bg-red-500',
      lightbulb: 'bg-yellow-400',
      rocket: 'bg-purple-500',
      zap: 'bg-blue-500',
      chart: 'bg-green-500',
      building: 'bg-indigo-500',
      wrench: 'bg-gray-500',
      sun: 'bg-orange-400'
    };
    return iconColors[iconId] || 'bg-yellow-500';
  };

  // Thêm màu cho các spaces (dựa trên icon nếu không có màu)
  const spacesWithColors = spaces.map(space => ({
    ...space,
    color: space.color || getIconColorClass(space.icon)
  }));

  // Mapping giữa ID icon và component icon tương ứng
  const iconComponents = {
    folder: FolderOpen,
    palette: Palette,
    file: FileText,
    briefcase: Briefcase,
    target: Target,
    lightbulb: Lightbulb,
    rocket: Rocket,
    zap: Zap,
    chart: BarChart3,
    building: Building,
    wrench: Wrench,
    sun: Lightbulb
  };

  // Xử lý trạng thái loading
  if (loading) {
    return (
      <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-4" />
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Xử lý trạng thái error
  if (error) {
    return (
      <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Welcome back, {getCurrentUser()?.name || 'User'}!</h2>
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
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalSpaces}</p>
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
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalDocuments}</p>
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
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalConversations}</p>
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
            {spacesWithColors.map((space) => (
              <div 
                key={space.id} 
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm transition-all duration-200 relative group hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]`}
              >
                {/* Action menu (3 dots) - top right corner, only visible on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === space.id ? null : space.id)}
                      className={`${isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      } p-1 rounded-full transition-colors bg-transparent`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {/* Dropdown menu */}
                    {openMenuId === space.id && (
                      <div
                        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                          isDark
                            ? 'bg-transparent ring-1 ring-black ring-opacity-5'
                            : 'bg-transparent ring-1 ring-black ring-opacity-5'
                        } z-10 space-menu`}
                      >
                        <div className="py-1">
                          <button
                            className={`block px-4 py-2 text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            } w-full text-left bg-transparent hover:bg-transparent`}
                            onClick={() => handleEditSpace(space)}
                          >
                            Edit
                          </button>
                          <button
                            className={`block px-4 py-2 text-sm ${
                              isDark ? 'text-red-400' : 'text-red-600'
                            } w-full text-left bg-transparent hover:bg-transparent`}
                            onClick={() => handleDeleteSpace(space.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Folder icon */}
                    <div className={`w-12 h-12 ${getIconColorClass(space.icon)} rounded-xl flex items-center justify-center`}>
                      {React.createElement(iconComponents[space.icon] || FolderOpen, { className: "w-6 h-6 text-white" })}
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

                {/* Description */}
                {space.description && (
                  <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-2`}>
                    {space.description}
                  </div>
                )}

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
                  onClick={() => handleOpenChatClick(space.id)}
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
        onSpaceCreated={loadDashboardData}
      />
      
      {/* Edit Space Modal */}
      <EditSpaceModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSpace(null);
        }}
        isDark={isDark}
        space={editingSpace}
        onSpaceUpdated={loadDashboardData}
      />
    </div>
  </div>
  );
};

export default DashboardPage;