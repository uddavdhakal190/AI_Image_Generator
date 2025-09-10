import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Surprise me
        </button>
      )}
    </div>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      {type === 'text' && value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  </div>
);

export default FormField;