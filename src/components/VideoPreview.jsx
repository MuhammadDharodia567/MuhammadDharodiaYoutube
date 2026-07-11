import React, { useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import videoProcessor from '../utils/videoProcessor';
import audioProcessor from '../utils/audioProcessor';

const VideoPreview = () => {
  const { 
    generatedVideo, 
    script, 
    selectedAvatar, 
    selectedVoice,
    background,
    isGenerating,
    progress,
  } = useVideoStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (generatedVideo) {
      videoProcessor.downloadVideo(generatedVideo, `birra-video-${Date.now()}.mp4`);
    }
  };

  // Preview placeholder when no video generated
  if (!generatedVideo && !isGenerating) {
    return (
      <div className="card h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-6xl mb-4 opacity-50">🎬</div>
        <h3 className="text-xl font-medium text-birra-light mb-2">No Video Generated Yet</h3>
        <p className="text-gray-400 text-center max-w-md">
          Configure your avatar, voice, and script, then click Generate to create your AI video
        </p>
        
        {/* Quick preview of selected options */}
        {(selectedAvatar || selectedVoice || background) && (
          <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
            {selectedAvatar && (
              <div className="text-center">
                <div className="text-2xl mb-1">👤</div>
                <p className="text-xs text-gray-400">{selectedAvatar.name}</p>
              </div>
            )}
            {selectedVoice && (
              <div className="text-center">
                <div className="text-2xl mb-1">🎙️</div>
                <p className="text-xs text-gray-400">{selectedVoice.name}</p>
              </div>
            )}
            {background && (
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <p className="text-xs text-gray-400">{background.name}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Loading state
  if (isGenerating) {
    return (
      <div className="card h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-birra-gold/20 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-birra-gold rounded-full border-t-transparent animate-spin"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-birra-gold">{progress}%</span>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-birra-light mb-2">Generating Your Video</h3>
        <p className="text-gray-400 text-center max-w-md mb-4">
          Creating frames, synthesizing audio, and rendering your professional video...
        </p>
        
        {/* Progress bar */}
        <div className="w-full max-w-md bg-birra-gray rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-birra-gold to-birra-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Estimated time remaining: {Math.max(0, Math.round((100 - progress) / 10))}s
        </p>
      </div>
    );
  }

  // Video player
  return (
    <div className="card h-full overflow-hidden">
      <div className="relative aspect-video bg-birra-dark rounded-lg overflow-hidden group">
        <video
          ref={videoRef}
          src={generatedVideo}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Play/Pause overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-16 h-16 bg-birra-gold/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            {isPlaying ? (
              <svg className="w-8 h-8 text-birra-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm5-1a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-birra-dark ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
        
        {/* Video info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-sm text-white line-clamp-2">{script}</p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="btn-secondary py-2 px-4"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsPlaying(true);
              }
            }}
            className="btn-secondary py-2 px-4"
          >
            Replay
          </button>
        </div>
        
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download MP4
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;
