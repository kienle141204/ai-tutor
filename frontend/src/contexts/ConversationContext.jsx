import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getConversations, createConversation as createConversationAPI } from '../services/conversationService';

// Tạo Context
const ConversationContext = createContext();

// Provider component
export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load tất cả conversations
  const loadConversations = useCallback(async (spaceId = null) => {
    try {
      setLoading(true);
      const data = await getConversations(spaceId);
      setConversations(data);
      setError(null);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo conversation mới
  const createConversation = useCallback(async (conversationData) => {
    try {
      const newConversation = await createConversationAPI(conversationData);
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (err) {
      console.error('Error creating conversation:', err);
      throw err;
    }
  }, []);

  // Cập nhật conversation
  const updateConversation = useCallback((updatedConversation) => {
    setConversations(prev => 
      prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
    );
  }, []);

  // Xóa conversation
  const deleteConversation = useCallback((conversationId) => {
    console.log('Deleting conversation from context with ID:', conversationId);
    setConversations(prev => {
      const updated = prev.filter(conv => conv.id !== conversationId);
      console.log('Conversations after deletion:', updated);
      return updated;
    });
  }, []);

  // Chỉ lưu conversation khi có tin nhắn từ người dùng
  const saveConversationIfHasUserMessages = useCallback((conversation, messages) => {
    const hasUserMessages = messages.some(msg => msg.sender === 'user');
    if (hasUserMessages) {
      // Nếu conversation chưa có trong danh sách, thêm vào
      // Nếu đã có, cập nhật nó
      setConversations(prev => {
        const existingIndex = prev.findIndex(conv => conv.id === conversation.id);
        if (existingIndex >= 0) {
          // Cập nhật conversation đã tồn tại
          const updated = [...prev];
          updated[existingIndex] = conversation;
          return updated;
        } else {
          // Thêm conversation mới
          return [conversation, ...prev];
        }
      });
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <ConversationContext.Provider value={{
      conversations,
      loading,
      error,
      loadConversations,
      createConversation,
      updateConversation,
      deleteConversation,
      saveConversationIfHasUserMessages
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

// Hook để sử dụng context
export const useConversations = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationProvider');
  }
  return context;
};