import React from 'react';
import { useVideoStore } from '../store/videoStore';
import { avatars } from '../data/constants';

const AvatarSelector = () => {
  const { selectedAvatar, setSelectedAvatar } = useVideoStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-birra-gold">Select Avatar</label>
        <span className="text-xs text-gray-400">{avatars.length} options</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar)}
            className={`relative group card hover:border-birra-gold/50 transition-all duration-300 ${
              selectedAvatar?.id === avatar.id 
                ? 'border-birra-gold ring-2 ring-birra-gold/30' 
                : 'border-birra-gold/20'
            }`}
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-birra-dark/50">
              {/* Placeholder avatar - in production, use actual images */}
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {avatar.gender === 'female' ? '👩' : '👨'}
              </div>
            </div>
            
            <div className="text-left">
              <h4 className="font-medium text-sm text-birra-light">{avatar.name}</h4>
              <p className="text-xs text-gray-400 truncate">{avatar.description}</p>
            </div>
            
            {selectedAvatar?.id === avatar.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-birra-gold rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-birra-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-birra-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
