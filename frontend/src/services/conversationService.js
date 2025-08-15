const API_BASE_URL = '/api';

// Lấy access token từ localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Hàm gọi API để tạo conversation mới
export const createConversation = async (conversationData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/conversations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(conversationData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create conversation');
  }

  return response.json();
};

// Hàm gọi API để lấy danh sách conversations
export const getConversations = async (spaceId = null) => {
  const token = getAccessToken();
  
  // Xây dựng URL với query parameters
  let url;
  if (spaceId) {
    url = `${API_BASE_URL}/conversations/space/${spaceId}`;
  } else {
    url = `${API_BASE_URL}/conversations/`;
  }
  
  console.log('Fetching conversations from URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching conversations:', errorData);
    throw new Error(errorData.detail || 'Failed to fetch conversations');
  }

  const data = await response.json();
  console.log('Fetched conversations:', data);
  return data;
};

// Hàm gọi API để lấy thông tin chi tiết của một conversation
export const getConversation = async (conversationId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch conversation');
  }

  return response.json();
};

// Hàm gọi API để cập nhật conversation
export const updateConversation = async (conversationId, conversationData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(conversationData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update conversation');
  }

  return response.json();
};

// Hàm gọi API để đổi tên conversation
export const renameConversation = async (conversationId, title) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/rename`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to rename conversation');
  }

  return response.json();
};

// Hàm gọi API để xóa conversation
export const deleteConversation = async (conversationId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete conversation');
  }

  return response.json();
};