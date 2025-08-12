import React from 'react';
import { ChevronDown } from 'lucide-react';

const SpaceHeader = () => {
  return (
    <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6">
      {/* Left side - Chat title */}
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-xs font-bold">
          📄
        </div>
        <div>
          <h1 className="text-lg font-semibold">New Conversation</h1>
          <p className="text-xs text-gray-400">1 document in space</p>
        </div>
      </div>

      {/* Right side - Mode selector */}
      <div className="flex items-center space-x-4">
        <span className="px-2 py-1 bg-blue-600 text-xs rounded text-white">Beta</span>
        <div className="flex items-center space-x-2 text-sm">
          <span>Mode:</span>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="font-medium">Flash</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceHeader;