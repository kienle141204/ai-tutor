import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { isAuthenticated } from './services/UserService';
import { ConversationProvider } from './contexts/ConversationContext';

// Component để bảo vệ các route yêu cầu xác thực
const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      setIsAuth(auth);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    // Hiển thị loading hoặc null trong khi kiểm tra xác thực
    return null;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ConversationProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/chat/:spaceId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/chat/:spaceId/:conversationId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </ConversationProvider>
  );
}

export default App;
