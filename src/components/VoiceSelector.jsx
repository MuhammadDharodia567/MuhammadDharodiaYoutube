import React, { useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import { voices } from '../data/constants';

const VoiceSelector = () => {
  const { selectedVoice, setSelectedVoice } = useVideoStore();
  const [playingSample, setPlayingSample] = useState(null);

  const handlePlaySample = (voice, e) => {
    e.stopPropagation();
    
    if (playingSample === voice.id) {
      window.speechSynthesis.cancel();
      setPlayingSample(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance('Hello, this is a sample of my voice.');
    utterance.lang = voice.language;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find matching voice
    const availableVoices = window.speechSynthesis.getVoices();
    const matchedVoice = availableVoices.find(v => 
      v.lang === voice.language || v.name.includes(voice.accent)
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setPlayingSample(null);
    utterance.onerror = () => setPlayingSample(null);
    
    setPlayingSample(voice.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-birra-gold">Select Voice</label>
        <span className="text-xs text-gray-400">{voices.length} options</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
        {voices.map((voice) => (
          <button
            key={voice.id}
            onClick={() => setSelectedVoice(voice)}
            className={`relative group card hover:border-birra-gold/50 transition-all duration-300 text-left ${
              selectedVoice?.id === voice.id 
                ? 'border-birra-gold ring-2 ring-birra-gold/30' 
                : 'border-birra-gold/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-birra-light">{voice.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-birra-dark rounded-full text-gray-400">
                    {voice.accent}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-birra-dark rounded-full text-gray-400">
                    {voice.gender}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => handlePlaySample(voice, e)}
                className="w-10 h-10 rounded-full bg-birra-gold/20 hover:bg-birra-gold/40 flex items-center justify-center transition-colors"
                title="Play sample"
              >
                {playingSample === voice.id ? (
                  <svg className="w-5 h-5 text-birra-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-birra-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            
            {selectedVoice?.id === voice.id && (
              <div className="absolute top-0 right-0 w-8 h-8 bg-birra-gold rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-birra-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoiceSelector;
