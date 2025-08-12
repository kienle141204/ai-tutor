import React, { useState } from 'react';
import { Home, Sun, PanelLeftClose, PanelLeftOpen, Search, Plus, MessageSquare, FileText, File, Image, Video, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('conversations');

  const conversations = [
    { id: 1, title: 'New Chat', model: 'Flash', time: '06:47', isActive: true },
    { id: 2, title: 'xin chào bạn, tôi có thể', model: 'Flash', time: '06:35', isActive: false },
    { id: 3, title: 'xin chào bạn, tôi có thể', model: 'Flash', time: '06:35', isActive: false }
  ];

  const documents = [
    { 
      id: 1, 
      name: 'Báo cáo tài chính Q4.pdf', 
      type: 'pdf', 
      size: '2.4 MB', 
      modified: '2 hours ago',
      isActive: false 
    },
    { 
      id: 2, 
      name: 'Kế hoạch marketing 2024.docx', 
      type: 'docx', 
      size: '1.8 MB', 
      modified: '1 day ago',
      isActive: true 
    },
    { 
      id: 3, 
      name: 'Presentation.pptx', 
      type: 'pptx', 
      size: '5.2 MB', 
      modified: '3 days ago',
      isActive: false 
    },
    { 
      id: 4, 
      name: 'Data analysis.xlsx', 
      type: 'xlsx', 
      size: '892 KB', 
      modified: '1 week ago',
      isActive: false 
    },
    { 
      id: 5, 
      name: 'design-mockup.png', 
      type: 'image', 
      size: '3.1 MB', 
      modified: '2 weeks ago',
      isActive: false 
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText size={16} className="text-red-400" />;
      case 'docx':
        return <FileText size={16} className="text-blue-400" />;
      case 'pptx':
        return <FileText size={16} className="text-orange-400" />;
      case 'xlsx':
        return <FileText size={16} className="text-green-400" />;
      case 'image':
        return <Image size={16} className="text-purple-400" />;
      case 'video':
        return <Video size={16} className="text-pink-400" />;
      case 'audio':
        return <Music size={16} className="text-yellow-400" />;
      default:
        return <File size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top Navigation + Tab Navigation */}
      <div className="p-4 border-b border-gray-700">
        {isOpen ? (
          // Expanded view
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 cursor-pointer transition-transform active:scale-95 hover:text-blue-500"
                >
                <Home size={20} />
                <span className="font-medium">Dashboard</span>
                </Link>
              <div className="cursor-pointer p-1 hover:bg-gray-700 rounded">
                <Sun size={20} />
              </div>
            </div>
            <div className="cursor-pointer p-1 hover:bg-gray-700 rounded" onClick={onToggle}>
              <PanelLeftClose size={20} />
            </div>
          </div>
        ) : (
          // Collapsed view
          <div className="flex flex-col items-center space-y-3">
            <Link to="/" className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                <Home size={20} />
            </Link>
            <div className="cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={onToggle}>
              <PanelLeftOpen size={20} />
            </div>
            <div
              className="cursor-pointer p-2 hover:bg-gray-700 rounded bg-blue-600 hover:bg-blue-700"
              title="New Conversation"
            >
              <Plus size={20} />
            </div>
          </div>
        )}

        {/* Tab Navigation - only when open */}
        {isOpen && (
          <div className="mt-4 flex bg-gray-700 rounded-lg p-1 transition-opacity duration-300 ease-in-out">
            <button
              className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                activeTab === 'conversations'
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('conversations')}
            >
              Conversations
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                activeTab === 'documents'
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {isOpen ? (
          // Expanded view
          <div className="p-4 transition-opacity duration-300 ease-in-out">
            {activeTab === 'conversations' ? (
              // Conversations content
              <>
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare size={16} />
                  <span className="font-medium">Conversations</span>
                  <span className="text-xs text-gray-400">{conversations.length} chats</span>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* New Conversation Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 mb-4 flex items-center justify-center space-x-2 transition-colors">
                  <Plus size={16} />
                  <span>New Conversation</span>
                </button>

                {/* Conversation List */}
                <div className="px-0 space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        conv.isActive
                          ? 'bg-blue-600/20 border border-blue-600/30'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{conv.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{conv.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Documents content
              <>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText size={16} />
                  <span className="font-medium">Documents</span>
                  <span className="text-xs text-gray-400">{documents.length} files</span>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Upload Document Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 px-4 mb-4 flex items-center justify-center space-x-2 transition-colors">
                  <Plus size={16} />
                  <span>Upload Document</span>
                </button>

                {/* Document List */}
                <div className="px-0 space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        doc.isActive
                          ? 'bg-green-600/20 border border-green-600/30'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate" title={doc.name}>
                            {doc.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{doc.size}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{doc.modified}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          // Collapsed view - icons only
          <div className="p-2 space-y-2 mt-4 transition-opacity duration-300 ease-in-out">
            {activeTab === 'conversations' 
              ? conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`w-12 h-12 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                      conv.isActive
                        ? 'bg-blue-600/20 border border-blue-600/30'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title={conv.title}
                  >
                    <MessageSquare size={16} />
                  </div>
                ))
              : documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`w-12 h-12 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                      doc.isActive
                        ? 'bg-green-600/20 border border-green-600/30'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title={doc.name}
                  >
                    {getFileIcon(doc.type)}
                  </div>
                ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;