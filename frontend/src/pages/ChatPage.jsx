import React, { useState } from 'react';
import { Send, HelpCircle, Search, Zap, FileText, ChevronDown } from 'lucide-react';
import Sidebar from '../components/SideBar';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setHasStartedChat(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: "Tôi đã nhận được tin nhắn của bạn. Tôi có thể giúp gì cho bạn?",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action) => {
    setMessage(`Tôi muốn ${action}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out`}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6">
            {/* Left side - Document and Chat title */}
            <div className="flex items-center space-x-6">
                {/* Tên tài liệu */}
                <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-xs font-bold">
                    📄
                </div>
                <span className="font-medium">Tên tài liệu</span>
                </div>

                {/* Dấu gạch dọc */}
                <div className="h-6 w-px bg-gray-600"></div>

                {/* Tên đoạn chat */}
                <div className="flex items-center space-x-2">
                    <span className="font-medium">Tên đoạn chat</span>
                </div>

                <div className="h-6 w-px bg-gray-600"></div>

                <span className="text-sm text-gray-400">
                    1 document in space
                </span>
                
            </div>
            </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col">
          {!hasStartedChat ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="max-w-2xl w-full text-center">
                {/* Welcome Icon */}
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✨</span>
                </div>
                
                {/* Welcome Text */}
                <h1 className="text-2xl font-semibold mb-6 text-white">
                  Hi kienle, how are you?
                </h1>
                
                {/* Quick Actions - Subtle */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button 
                    onClick={() => handleQuickAction('đặt câu hỏi')}
                    className="bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-lg p-3 text-left transition-colors flex items-center space-x-2"
                  >
                    <HelpCircle className="w-5 h-5 mb-2 text-blue-400/70" />
                    <span className="text-xs font-medium text-gray-300">Ask Questions</span>
                  </button>
                  
                  <button 
                    onClick={() => handleQuickAction('tìm thông tin')}
                    className="bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-lg p-3 text-left transition-colors flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5 mb-2 text-orange-400/70" />
                    <span className="text-xs font-medium text-gray-300">Find Information</span>
                  </button>
                  
                  <button 
                    onClick={() => handleQuickAction('tìm kiếm nhanh')}
                    className="bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-lg p-3 text-left transition-colors flex items-center space-x-2"
                  >
                    <Zap className="w-5 h-5 mb-2 text-purple-400/70" />
                    <span className="text-xs font-medium text-gray-300">Quick Search</span>
                  </button>
                </div>
                
                {/* Document Status */}
                <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-400/80 px-3 py-1.5 rounded-lg border border-green-500/20">
                  <FileText size={14} />
                  <span className="text-xs">All 1 source indexed. Ready to chat!</span>
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white ml-12' 
                        : 'bg-gray-700 text-gray-100 mr-12'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-6 border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="How can I help you today?"
                  rows="3"
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-4 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`absolute right-4 bottom-4 p-2 rounded-lg transition-colors ${
                    message.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              
              {/* Helper Text */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;