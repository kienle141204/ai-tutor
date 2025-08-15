const API_BASE_URL = '/api';

// Lấy access token từ localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Hàm gọi API để tạo document mới
export const createDocument = async (documentData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/documents/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(documentData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create document');
  }

  return response.json();
};

// Hàm gọi API để lấy danh sách documents
export const getDocuments = async () => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/documents/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch documents');
  }

  return response.json();
};

// Hàm gọi API để lấy thông tin chi tiết của một document
export const getDocument = async (documentId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch document');
  }

  return response.json();
};

// Hàm gọi API để cập nhật document
export const updateDocument = async (documentId, documentData) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(documentData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update document');
  }

  return response.json();
};

// Hàm gọi API để xóa document
export const deleteDocument = async (documentId) => {
  const token = getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete document');
  }

  return response.json();
};