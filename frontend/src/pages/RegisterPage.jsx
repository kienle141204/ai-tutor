import React, { useState } from 'react';
import { Eye, EyeOff, User, Briefcase, Lock, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const RegisterPage = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
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

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
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

  const renderStep1 = () => (
    <>
      {/* Name Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Họ và tên *"
          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
            errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white border-opacity-20 focus:ring-emerald-400'
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-300">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
            errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white border-opacity-20 focus:ring-emerald-400'
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-300">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại *"
          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
            errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-white border-opacity-20 focus:ring-emerald-400'
          }`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-300">{errors.phone}</p>
        )}
      </div>

      {/* Job Title Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Briefcase className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Chức danh công việc"
          className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Company Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Briefcase className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Công ty"
          className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Location Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Thành phố"
          className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNextStep}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
      >
        <span>Tiếp tục</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </>
  );

  const renderStep2 = () => (
    <>
      {/* Password Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu *"
          className={`w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
            errors.password ? 'border-red-400 focus:ring-red-400' : 'border-white border-opacity-20 focus:ring-emerald-400'
          }`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-white text-opacity-60 hover:text-white transition-colors" />
          ) : (
            <Eye className="h-5 w-5 text-white text-opacity-60 hover:text-white transition-colors" />
          )}
        </button>
        {errors.password && (
          <p className="mt-1 text-sm text-red-300">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-white text-opacity-60" />
        </div>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Xác nhận mật khẩu *"
          className={`w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
            errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-white border-opacity-20 focus:ring-emerald-400'
          }`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5 text-white text-opacity-60 hover:text-white transition-colors" />
          ) : (
            <Eye className="h-5 w-5 text-white text-opacity-60 hover:text-white transition-colors" />
          )}
        </button>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="mt-1 w-4 h-4 text-emerald-600 bg-white bg-opacity-10 border-white border-opacity-20 rounded focus:ring-emerald-500 focus:ring-2"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-white text-opacity-70">
          Tôi đồng ý với{' '}
          <button type="button" className="text-emerald-300 hover:text-emerald-200 underline">
            Điều khoản sử dụng
          </button>
          {' '}và{' '}
          <button type="button" className="text-emerald-300 hover:text-emerald-200 underline">
            Chính sách bảo mật
          </button>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-300 -mt-4">{errors.agreeToTerms}</p>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex-1 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm text-white font-semibold py-4 rounded-2xl hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5 transform rotate-180" />
          <span>Quay lại</span>
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <span>Hoàn thành</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glass morphism container */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 p-8 transform hover:scale-105 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Tạo tài khoản</h1>
            <p className="text-white text-opacity-70">
              {step === 1 ? 'Thông tin cá nhân' : 'Bảo mật tài khoản'}
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                step >= 1 ? 'bg-emerald-400' : 'bg-white bg-opacity-30'
              }`}></div>
              <div className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                step >= 2 ? 'bg-emerald-400' : 'bg-white bg-opacity-30'
              }`}></div>
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                step >= 2 ? 'bg-emerald-400' : 'bg-white bg-opacity-30'
              }`}></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? renderStep1() : renderStep2()}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white text-opacity-70">
              Đã có tài khoản?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-emerald-300 hover:text-emerald-200 font-semibold hover:underline transition-colors"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;