import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SimpleLoginPage = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email, formData.password);
      console.log('Đăng nhập thành công:', result);
      // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-xl font-bold text-blue-500 mb-1">DocPixie</h1>
            <p className="text-gray-400 text-xs mb-4">Chat with your documents</p>
            
            <h2 className="text-lg font-semibold text-white mb-1">Welcome back</h2>
            <p className="text-gray-400 text-xs">Sign in to your DocPixie account</p>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gray-800 text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 pr-10 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-xs">{error}</div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mt-4"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-4 text-center space-y-1">
            <button className="text-gray-400 hover:text-gray-300 text-xs hover:underline transition-colors">
              Forgot your password?
            </button>
            <p className="text-gray-400 text-xs">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoginPage;