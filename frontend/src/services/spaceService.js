const API_BASE_URL = '/api';

// Lấy access token từ localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Hàm gọi API để tạo space mới
export const createSpace = async (spaceData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/spaces/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(spaceData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create space');
  }

  return response.json();
};

// Hàm gọi API để lấy danh sách spaces
export const getSpaces = async () => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/spaces/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch spaces');
  }

  return response.json();
};

// Hàm gọi API để lấy thông tin chi tiết của một space
export const getSpace = async (spaceId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/spaces/${spaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch space');
  }

  return response.json();
};

// Hàm gọi API để cập nhật space
export const updateSpace = async (spaceId, spaceData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/spaces/${spaceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(spaceData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update space');
  }

  return response.json();
};

// Hàm gọi API để xóa space
export const deleteSpace = async (spaceId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/spaces/${spaceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete space');
  }

  return response.json();
};