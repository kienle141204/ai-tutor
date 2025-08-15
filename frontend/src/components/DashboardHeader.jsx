import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { getCurrentUser } from '../services/UserService';
import { clearAuthData } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ isDark, toggleTheme }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ UserService
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hiển thị thông tin người dùng thực sự từ response của API
  const displayName = user ? user.name : 'User';
  const displayRole = user ? (user.job_title || 'User') : 'User';
  const displayEmail = user ? user.email : '';

  const handleLogout = () => {
    // Xóa thông tin xác thực khỏi localStorage
    clearAuthData();
    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-6 py-4 w-full`}>
      <div className="flex items-center justify-between w-full max-w-none">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
          </div>
          <h1 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>DogPic</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className={`${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} p-2 rounded-lg transition-colors`}
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Beta badge */}
          {/* <span className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
            Beta
          </span> */}

          {/* User profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className={`text-left ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="font-medium text-sm">{displayName}</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{displayRole}</div>
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              } py-1 z-50`}>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {displayName}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {displayEmail}
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Xử lý khi nhấn vào Profile
                    // Có thể chuyển hướng đến trang profile
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    // Xử lý khi nhấn vào Settings
                    // Có thể chuyển hướng đến trang settings
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    isDark 
                      ? 'text-red-400 hover:bg-gray-700 hover:text-red-300' 
                      : 'text-red-600 hover:bg-gray-100 hover:text-red-800'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;