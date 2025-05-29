
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-2 text-textSecondary">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
    