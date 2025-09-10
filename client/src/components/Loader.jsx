import React from 'react';

const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">{message}</p>
  </div>
);

export const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
      ))}
    </div>
  </div>
);

export const ImageGenerationLoader = () => (
  <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-gray-300">
    <div className="relative mb-6">
      <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Generating Your Image</h3>
    <p className="text-gray-600 text-center max-w-md">
      Our AI is creating your masterpiece. This usually takes 10-30 seconds...
    </p>
    <div className="mt-4 flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
      ))}
    </div>
  </div>
);

export default Loader;