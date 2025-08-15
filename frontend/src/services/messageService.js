const API_BASE_URL = '/api';

// Lấy access token từ localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Hàm gọi API để tạo message mới
export const createMessage = async (messageData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/messages/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(messageData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create message');
  }

  return response.json();
};

// Hàm gọi API để lấy danh sách messages của một conversation
export const getMessagesByConversation = async (conversationId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/messages/?skip=0&limit=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch messages');
  }

  const allMessages = await response.json();
  
  // Lọc messages theo conversation_id
  return allMessages.filter(msg => msg.conversation_id === conversationId);
};

// Hàm gọi API để lấy thông tin chi tiết của một message
export const getMessage = async (messageId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch message');
  }

  return response.json();
};

// Hàm gọi API để cập nhật message
export const updateMessage = async (messageId, messageData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(messageData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update message');
  }

  return response.json();
};

// Hàm gọi API để xóa message
export const deleteMessage = async (messageId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete message');
  }

  return response.json();
};