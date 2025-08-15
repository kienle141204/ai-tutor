// UserService.js
import { getAccessToken, getUser, clearAuthData } from './authService';

// Lấy thông tin người dùng hiện tại từ localStorage
export const getCurrentUser = () => {
  const user = getUser();
  if (user) {
    return user;
  }
  
  // Nếu không có thông tin người dùng trong localStorage, trả về null
  return null;
};

// Kiểm tra xem người dùng đã đăng nhập chưa
export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token; // Trả về true nếu có token, false nếu không có
};

// Đăng xuất người dùng
export const logout = () => {
  clearAuthData();
  // Có thể thêm logic để chuyển hướng người dùng đến trang đăng nhập
  // window.location.href = '/login';
};