import React from 'react';
import { User } from 'lucide-react';

const DashboardHeader = ({ isDark, toggleTheme }) => {
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
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className={isDark ? 'text-white' : 'text-gray-900'}>
              <div className="font-medium">Name</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Software Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;