import React from 'react';
import { useVideoStore } from '../store/videoStore';
import { backgrounds, emotions, durations } from '../data/constants';

const EffectsPanel = () => {
  const { 
    background, setBackground, 
    emotion, setEmotion,
    duration, setDuration 
  } = useVideoStore();

  return (
    <div className="space-y-6">
      {/* Duration Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-birra-gold">Video Duration</label>
        <div className="grid grid-cols-3 gap-2">
          {durations.map((dur) => (
            <button
              key={dur.id}
              onClick={() => setDuration(dur.id)}
              className={`py-2 px-3 rounded-lg border transition-all duration-300 ${
                duration === dur.id
                  ? 'bg-birra-gold text-birra-dark border-birra-gold'
                  : 'bg-birra-gray border-birra-gold/30 text-birra-light hover:border-birra-gold/50'
              }`}
            >
              <span className="text-sm font-medium">{dur.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emotion Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-birra-gold">Emotion / Tone</label>
        <div className="grid grid-cols-3 gap-2">
          {emotions.map((emo) => (
            <button
              key={emo.id}
              onClick={() => setEmotion(emo.id)}
              className={`py-3 px-2 rounded-lg border transition-all duration-300 ${
                emotion === emo.id
                  ? 'bg-birra-gold text-birra-dark border-birra-gold'
                  : 'bg-birra-gray border-birra-gold/30 text-birra-light hover:border-birra-gold/50'
              }`}
            >
              <span className="text-xl block mb-1">{emo.icon}</span>
              <span className="text-xs font-medium">{emo.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-birra-gold">Background</label>
        <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-2">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setBackground(bg)}
              className={`relative aspect-square rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                background?.id === bg.id
                  ? 'border-birra-gold ring-2 ring-birra-gold/30'
                  : 'border-birra-gold/30 hover:border-birra-gold/60'
              }`}
              title={bg.name}
            >
              <div className={`w-full h-full ${bg.preview}`} />
              {background?.id === bg.id && (
                <div className="absolute inset-0 bg-birra-gold/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-birra-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        {background && (
          <p className="text-xs text-gray-400">Selected: {background.name}</p>
        )}
      </div>
    </div>
  );
};

export default EffectsPanel;
