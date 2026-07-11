import React from 'react';
import { useVideoStore } from '../store/videoStore';

const VideoHistory = () => {
  const { videoHistory, setGeneratedVideo } = useVideoStore();

  if (videoHistory.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-birra-light mb-4">Recent Videos</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2 opacity-50">📁</div>
          <p className="text-gray-400">No videos generated yet</p>
          <p className="text-xs text-gray-500 mt-1">Your generated videos will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-birra-light">Recent Videos</h3>
        <span className="text-xs text-gray-400">{videoHistory.length} videos</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
        {videoHistory.map((video, index) => (
          <div
            key={video.id || index}
            className="group relative aspect-video bg-birra-dark rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-birra-gold transition-all"
            onClick={() => setGeneratedVideo(video.url)}
          >
            {video.thumbnail ? (
              <img 
                src={video.thumbnail} 
                alt={video.script?.substring(0, 50) || 'Video thumbnail'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-birra-gray to-birra-dark">
                <span className="text-2xl">🎬</span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-8 h-8 text-birra-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Duration badge */}
            {video.duration && (
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white">
                {video.duration}s
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoHistory;
