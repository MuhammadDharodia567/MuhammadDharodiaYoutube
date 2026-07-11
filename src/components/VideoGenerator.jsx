import React, { useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import ScriptInput from './ScriptInput';
import AvatarSelector from './AvatarSelector';
import VoiceSelector from './VoiceSelector';
import EffectsPanel from './EffectsPanel';
import SettingsPanel from './SettingsPanel';
import VideoPreview from './VideoPreview';
import VideoHistory from './VideoHistory';
import useVideoGeneration from '../hooks/useVideoGeneration';

const VideoGenerator = () => {
  const { 
    script, selectedAvatar, selectedVoice, background, error, resetForm 
  } = useVideoStore();
  const { generateVideo } = useVideoGeneration();
  const [activeTab, setActiveTab] = useState('script');

  const handleGenerate = async () => {
    const success = await generateVideo();
    if (success) {
      // Optionally reset form or keep settings for another generation
    }
  };

  const isFormValid = script && selectedAvatar && selectedVoice && background;

  return (
    <div className="min-h-screen bg-birra-dark">
      {/* Header */}
      <header className="border-b border-birra-gold/20 bg-birra-gray/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-birra-gold to-birra-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-birra-dark">B</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gradient">BIRRA AI</h1>
                <p className="text-xs text-gray-400">Professional Video Generator</p>
              </div>
            </div>
            
            <button
              onClick={resetForm}
              className="btn-secondary text-sm"
            >
              Reset All
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="card p-2">
              <div className="flex gap-2">
                {[
                  { id: 'script', label: 'Script', icon: '📝' },
                  { id: 'avatar', label: 'Avatar', icon: '👤' },
                  { id: 'voice', label: 'Voice', icon: '🎙️' },
                  { id: 'effects', label: 'Effects', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-birra-gold text-birra-dark'
                        : 'text-birra-light hover:bg-birra-gold/20'
                    }`}
                  >
                    <span className="mr-1">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="card">
              {activeTab === 'script' && <ScriptInput />}
              {activeTab === 'avatar' && <AvatarSelector />}
              {activeTab === 'voice' && <VoiceSelector />}
              {activeTab === 'effects' && <EffectsPanel />}
            </div>

            {/* Settings */}
            <SettingsPanel />

            {/* Error Message */}
            {error && (
              <div className="card border-red-500/50 bg-red-500/10">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-red-400 font-medium">Error</p>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!isFormValid}
              className="btn-primary w-full py-4 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Generate Video
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-birra-accent to-birra-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {!isFormValid && (
              <p className="text-center text-xs text-gray-500">
                Please complete all fields to generate your video
              </p>
            )}
          </div>

          {/* Right Column - Preview & History */}
          <div className="space-y-6">
            <VideoPreview />
            <VideoHistory />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-birra-gold/20 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2024 BIRRA AI. Professional AI Video Generation Platform.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Powered by Claude AI</span>
              <span>•</span>
              <span>FFmpeg.wasm</span>
              <span>•</span>
              <span>Web Speech API</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoGenerator;
