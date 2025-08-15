import React, { useState, useEffect } from 'react';
import { Send, HelpCircle, Search, Zap, FileText, ChevronDown } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import { getMessagesByConversation, createMessage } from '../services/messageService';
import { getConversation, createConversation } from '../services/conversationService';
import { getSpace } from '../services/spaceService';
import { getDocuments } from '../services/documentService';
import { useConversations } from '../contexts/ConversationContext';

const ChatPage = () => {
  const { conversationId, spaceId } = useParams();
  const navigate = useNavigate();
  const { conversations, createConversation: createConversationContext, saveConversationIfHasUserMessages, loadConversations } = useConversations();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [currentSpace, setCurrentSpace] = useState(null);
  const [spaceDocuments, setSpaceDocuments] = useState([]);
  const [spaceConversations, setSpaceConversations] = useState([]);

  // Load conversation và messages khi component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        let conv;
        if (conversationId && !isNaN(parseInt(conversationId))) {
          // Nếu có conversationId hợp lệ trong URL, load conversation đó
          try {
            conv = await getConversation(parseInt(conversationId));
            setCurrentConversation(conv);
            setCurrentConversationId(parseInt(conversationId));
            // Load messages cho conversation này
            await loadMessages();
          } catch (err) {
            // Nếu conversation không tồn tại, tạo conversation mới
            console.warn('Conversation not found, creating new one');
            const currentSpaceId = spaceId ? parseInt(spaceId) : 1;
            
            conv = {
              title: "New Chat",
              model: "Flash",
              space_id: currentSpaceId,
              id: null, // id null để chỉ ra đây là conversation tạm thời
              created_at: new Date().toISOString()
            };
            setCurrentConversation(conv);
            setCurrentConversationId(null); // null id để chỉ ra đây là conversation tạm thời
            
            // Reset messages để hiển thị màn hình chào mừng
            setMessages([]);
            setHasStartedChat(false);
            
            // Load conversations của space hiện tại
            loadConversations(currentSpaceId);
          }
        } else {
          // Nếu không có conversationId hợp lệ, tạo conversation tạm thời (chưa lưu vào DB)
          // Xác định space_id từ URL hoặc mặc định là 1
          const currentSpaceId = spaceId ? parseInt(spaceId) : 1;
          
          conv = {
            title: "New Chat",
            model: "Flash",
            space_id: currentSpaceId,
            id: null, // id null để chỉ ra đây là conversation tạm thời
            created_at: new Date().toISOString()
          };
          setCurrentConversation(conv);
          setCurrentConversationId(null); // null id để chỉ ra đây là conversation tạm thời
          
          // Reset messages để hiển thị màn hình chào mừng
          setMessages([]);
          setHasStartedChat(false);
          
          // Load conversations của space hiện tại
          loadConversations(currentSpaceId);
        }
        
        // Load thông tin space và documents
        if (conv && conv.space_id) {
          const space = await getSpace(conv.space_id);
          setCurrentSpace(space);
          
          const documents = await getDocuments();
          const spaceDocs = documents.filter(doc => doc.space_id === conv.space_id);
          setSpaceDocuments(spaceDocs);
          
          // Load conversations của space hiện tại nếu chưa được load
          if (conv.id !== null) {
            loadConversations(conv.space_id);
          }
        }
      } catch (err) {
        console.error('Error initializing chat:', err);
        setError('Failed to initialize chat');
      }
    };

    initializeChat();
  }, [conversationId, spaceId, loadConversations]);

  // Load messages khi currentConversationId thay đổi
  useEffect(() => {
    if (currentConversationId) {
      loadMessages();
    }
  }, [currentConversationId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const messagesData = await getMessagesByConversation(currentConversationId);
      setMessages(messagesData);
      setHasStartedChat(messagesData.length > 0);
      setError(null);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật spaceConversations khi conversations từ context thay đổi
  useEffect(() => {
    if (currentConversation && currentConversation.space_id) {
      const spaceConvs = conversations.filter(c => c.space_id === currentConversation.space_id);
      setSpaceConversations(spaceConvs);
    }
  }, [conversations, currentConversation]);

  const handleSend = async () => {
    if (message.trim() && currentConversation) {
      try {
        // Nếu là conversation tạm thời, tạo conversation mới trong DB
        let conversationId = currentConversationId;
        let conv = currentConversation;
        
        if (currentConversationId === null) {
          // Tạo conversation mới trong DB với tiêu đề là tin nhắn đầu tiên
          const newConv = await createConversationContext({
            title: message.trim().substring(0, 50) + (message.trim().length > 50 ? '...' : ''),
            model: "Flash",
            space_id: currentConversation.space_id
          });
          
          conv = newConv;
          conversationId = newConv.id;
          setCurrentConversation(newConv);
          setCurrentConversationId(newConv.id);
          
          // Cập nhật danh sách conversations trong state
          setSpaceConversations(prev => [newConv, ...prev]);
          
          // Cập nhật URL với spaceId và conversationId mới
          navigate(`/chat/${newConv.space_id}/${newConv.id}`, { replace: true });
        }
        
        // Tạo message từ người dùng
        const userMessage = {
          content: message,
          sender: 'user',
          conversation_id: conversationId
        };
        
        // Gửi message đến API
        const newMessage = await createMessage(userMessage);
        
        // Thêm message vào state
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setMessage('');
        setHasStartedChat(true);
        
        // Cập nhật conversation trong context
        saveConversationIfHasUserMessages(conv, updatedMessages);
        
        // TODO: Gửi message đến AI và nhận phản hồi
        // Đây là nơi bạn sẽ gọi API để nhận phản hồi từ AI
        // Ví dụ:
        // const aiResponse = await getAIResponse(message);
        // await createMessage(aiResponse);
        // setMessages(prev => [...prev, aiResponse]);
        
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message');
      }
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
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
          documents={spaceDocuments} 
          currentSpaceId={currentSpace?.id}
        />
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
                <span className="font-medium">{currentSpace?.name || 'Untitled Space'}</span>
                </div>

                {/* Dấu gạch dọc */}
                <div className="h-6 w-px bg-gray-600"></div>

                {/* Tên đoạn chat */}
                <div className="flex items-center space-x-2">
                    <span className="font-medium">{currentConversation?.title || 'New Chat'}</span>
                </div>

                <div className="h-6 w-px bg-gray-600"></div>

                <span className="text-sm text-gray-400">
                    {spaceDocuments.length} document{spaceDocuments.length !== 1 ? 's' : ''} in space
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
                  <span className="text-xs">All {spaceDocuments.length} source{spaceDocuments.length !== 1 ? 's' : ''} indexed. Ready to chat!</span>
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
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
                  disabled={!message.trim() || !currentConversationId}
                  className={`absolute right-4 bottom-4 p-2 rounded-lg transition-colors ${
                    message.trim() && currentConversationId
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