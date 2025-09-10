import React from 'react';

const ErrorMessage = ({ message, onRetry, showRetry = true }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-2xl">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
    <p className="text-red-600 text-center mb-4 max-w-md">{message}</p>
    {showRetry && onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
      >
        Try Again
      </button>
    )}
  </div>
);

const SuccessMessage = ({ message, onClose }) => (
  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl mb-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-green-800 font-medium">{message}</p>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-green-600 hover:text-green-800 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

const InfoMessage = ({ message, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  const icons = {
    info: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    warning: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    ),
    success: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    )
  };

  return (
    <div className={`flex items-center gap-3 p-4 border rounded-xl ${colors[type]}`}>
      <div className="w-6 h-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icons[type]}
        </svg>
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export { ErrorMessage, SuccessMessage, InfoMessage };
