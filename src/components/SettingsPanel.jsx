import React, { useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import { resolutions, qualityOptions } from '../data/constants';

const SettingsPanel = () => {
  const { 
    resolution, setResolution,
    quality, setQuality,
  } = useVideoStore();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-birra-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-medium text-birra-light">Settings</h3>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-6 pt-4 border-t border-birra-gold/20">
          {/* Resolution */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-birra-gold">Output Resolution</label>
            <div className="grid grid-cols-2 gap-2">
              {resolutions.map((res) => (
                <button
                  key={res.id}
                  onClick={() => setResolution(res.id)}
                  className={`py-2 px-3 rounded-lg border transition-all duration-300 ${
                    resolution === res.id
                      ? 'bg-birra-gold text-birra-dark border-birra-gold'
                      : 'bg-birra-gray border-birra-gold/30 text-birra-light hover:border-birra-gold/50'
                  }`}
                >
                  <span className="text-sm font-medium">{res.label}</span>
                  <span className="block text-xs opacity-70">{res.width}x{res.height}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Quality */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-birra-gold">Video Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {qualityOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuality(opt.id)}
                  className={`py-2 px-2 rounded-lg border transition-all duration-300 ${
                    quality === opt.id
                      ? 'bg-birra-gold text-birra-dark border-birra-gold'
                      : 'bg-birra-gray border-birra-gold/30 text-birra-light hover:border-birra-gold/50'
                  }`}
                >
                  <span className="text-xs font-medium block">{opt.label}</span>
                  <span className="text-xs opacity-70">{opt.bitrate}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div className="p-3 bg-birra-dark/50 rounded-lg">
            <p className="text-xs text-gray-400">
              <strong className="text-birra-gold">Note:</strong> Higher resolution and quality settings will increase generation time and file size.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
