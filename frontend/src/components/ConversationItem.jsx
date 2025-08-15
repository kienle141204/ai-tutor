import React, { useState } from 'react';
import { useConversations } from '../contexts/ConversationContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { renameConversation, deleteConversation as deleteConversationAPI } from '../services/conversationService';

const ConversationItem = ({ conversation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);
  const { deleteConversation, updateConversation } = useConversations();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy conversationId từ URL
  const currentConversationId = location.pathname.split('/').pop();

  const handleRename = async () => {
    if (editTitle.trim() && editTitle !== conversation.title) {
      try {
        // Gọi API để đổi tên conversation
        const updatedConversation = await renameConversation(conversation.id, editTitle.trim());
        // Cập nhật context
        updateConversation(updatedConversation);
      } catch (error) {
        console.error('Failed to rename conversation:', error);
        // TODO: Hiển thị thông báo lỗi cho người dùng
      }
    }
    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      console.log('Deleting conversation with ID:', conversation.id);
      // Gọi API để xóa conversation
      await deleteConversationAPI(conversation.id);
      console.log('Successfully deleted conversation from API');
      // Cập nhật context
      deleteConversation(conversation.id);
      console.log('Successfully removed conversation from context');
      
      // Nếu đang xóa conversation hiện tại, chuyển hướng về chat mới
      if (parseInt(currentConversationId) === conversation.id) {
        console.log('Navigating to new chat page');
        // Chuyển hướng về trang chat với space_id
        navigate(`/chat/${conversation.space_id}`);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      // TODO: Hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleOpenConversation = () => {
    // Mở đoạn chat cũ với cấu trúc URL mới
    navigate(`/chat/${conversation.space_id}/${conversation.id}`);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(conversation.title);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-colors relative group ${
        parseInt(currentConversationId) === conversation.id
          ? 'bg-blue-600/20 border border-blue-500'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      onDoubleClick={handleDoubleClick}
      onClick={handleOpenConversation}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full bg-gray-600 text-white rounded px-2 py-1 text-sm"
            />
          ) : (
            <>
              <h3 className="font-medium text-sm truncate">{conversation.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-400">
                  {new Date(conversation.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </>
          )}
        </div>
        {/* Delete button - chỉ hiện khi hover */}
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-500"
          onClick={handleDelete}
          title="Delete conversation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConversationItem;