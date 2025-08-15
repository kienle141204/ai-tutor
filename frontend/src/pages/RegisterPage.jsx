import React, { useState } from 'react';
import { Eye, EyeOff, User, Briefcase, Lock, Mail } from 'lucide-react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SimpleRegisterPage = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    job_title: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.job_title.trim()) {
      newErrors.job_title = 'Vui lòng nhập chức danh công việc';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Vui lòng đồng ý với điều khoản sử dụng';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    
    try {
      // Prepare data for API call (exclude confirmPassword and agreeToTerms)
      const { confirmPassword, agreeToTerms, ...registerData } = formData;
      const result = await register(registerData);
      console.log('Đăng ký thành công:', result);
      alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      navigate('/login');
    } catch (err) {
      // Handle API errors
      setErrors({
        api: err.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleGoogleRegister = () => {
    console.log('Google register clicked');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-xl font-bold text-blue-500 mb-1">DocPixie</h1>
            <p className="text-gray-400 text-xs mb-4">Chat with your documents</p>
            
            <h2 className="text-lg font-semibold text-white mb-1">Create account</h2>
            <p className="text-gray-400 text-xs">Sign up for your DocPixie account</p>
          </div>

          {/* Google Register Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
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
            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-3 py-2.5 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                required
              />
              {errors.name && (
                <p className="mt-0.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

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
                className={`w-full px-3 py-2.5 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                required
              />
              {errors.email && (
                <p className="mt-0.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Job Title Field */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                placeholder="Enter your job title"
                className={`w-full px-3 py-2.5 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.job_title ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                required
              />
              {errors.job_title && (
                <p className="mt-0.5 text-xs text-red-400">{errors.job_title}</p>
              )}
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
                  placeholder="Create a password"
                  className={`w-full px-3 py-2.5 pr-10 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
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
              {errors.password && (
                <p className="mt-0.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full px-3 py-2.5 pr-10 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-0.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 pt-1">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-0.5 w-3.5 h-3.5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-400 leading-tight">
                I agree to the{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-400">{errors.agreeToTerms}</p>
            )}

            {/* API Error Message */}
            {errors.api && (
              <div className="text-red-400 text-xs text-center">{errors.api}</div>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-xs">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegisterPage;