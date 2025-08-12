import React, { useState } from 'react';
import { X, FolderOpen, Palette, FileText, Briefcase, Target, Lightbulb, Rocket, Zap, BarChart3, Building, Wrench } from 'lucide-react';

const CreateSpaceModal = ({ isOpen, onClose, isDark }) => {
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');

  const iconOptions = [
    { id: 'folder', icon: FolderOpen, color: 'bg-yellow-500' },
    { id: 'palette', icon: Palette, color: 'bg-pink-500' },
    { id: 'file', icon: FileText, color: 'bg-orange-500' },
    { id: 'briefcase', icon: Briefcase, color: 'bg-gray-600' },
    { id: 'target', icon: Target, color: 'bg-red-500' },
    { id: 'lightbulb', icon: Lightbulb, color: 'bg-yellow-400' },
    { id: 'rocket', icon: Rocket, color: 'bg-purple-500' },
    { id: 'zap', icon: Zap, color: 'bg-blue-500' },
    { id: 'chart', icon: BarChart3, color: 'bg-green-500' },
    { id: 'building', icon: Building, color: 'bg-indigo-500' },
    { id: 'wrench', icon: Wrench, color: 'bg-gray-500' },
    { id: 'sun', icon: Lightbulb, color: 'bg-orange-400' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ spaceName, description, selectedIcon });
    onClose();
  };

  const handleCancel = () => {
    setSpaceName('');
    setDescription('');
    setSelectedIcon('folder');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-lg`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create a New Space</h2>
          <button
            onClick={handleCancel}
            className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} p-1 rounded-lg hover:bg-gray-700 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-6`}>
            A space is where you store and chat about your documents. Start by giving it a name.
          </p>

          {/* Name field */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Name
            </label>
            <input
              type="text"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="Enter space name"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                isDark 
                  ? 'bg-gray-700 border-blue-500 text-white placeholder-gray-400 focus:border-blue-400' 
                  : 'bg-white border-blue-500 text-gray-900 placeholder-gray-500 focus:border-blue-600'
              } focus:outline-none transition-colors`}
              required
            />
          </div>

          {/* Description field */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter space description (optional)"
              rows={2}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none resize-none transition-colors`}
            />
          </div>

          {/* Icon selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
              Icon
            </label>
            <div className="grid grid-cols-4 gap-3">
              {iconOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedIcon(option.id)}
                    className={`w-15 h-15 rounded-lg flex items-center justify-center transition-all ${
                      selectedIcon === option.id
                        ? `ring-2 ring-blue-500 ${isDark ? 'ring-offset-2 ring-offset-gray-800' : 'ring-offset-2 ring-offset-white'}`
                        : 'hover:scale-105'
                    } ${option.color}`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!spaceName.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                spaceName.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSpaceModal;