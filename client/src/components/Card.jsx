import React, { useState } from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          className={`w-full h-64 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={photo}
          alt={prompt}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center text-white font-bold text-sm shadow-lg">
            {name[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">Creator</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
          {prompt}
        </p>
        
        <div className="flex items-center justify-between">
          <button 
            type="button" 
            onClick={() => downloadImage(_id, photo)} 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <img src={download} alt="download" className="w-4 h-4" />
            <span className="text-sm font-medium">Download</span>
          </button>
          
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">AI Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

