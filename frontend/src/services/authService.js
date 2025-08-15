const API_BASE_URL = '/api';

// Lưu token và thông tin người dùng vào localStorage
export const setAuthData = (data) => {
  localStorage.setItem('accessToken', data.access_token);
  localStorage.setItem('refreshToken', data.refresh_token);
  // Lưu thông tin người dùng nếu có
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
};

// Lấy token từ localStorage
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Lấy thông tin người dùng từ localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Xóa token và thông tin người dùng khỏi localStorage
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Đăng nhập thất bại');
    }

    const data = await response.json();
    
    // Lưu token và thông tin người dùng vào localStorage
    setAuthData(data);
    
    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.');
    }
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Đăng ký thất bại');
    }

    return response.json();
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.');
    }
    throw error;
  }
};

// Làm mới access token
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to refresh token');
  }

  const data = await response.json();
  
  // Cập nhật token trong localStorage
  setAuthData(data);
  
  return data;
};