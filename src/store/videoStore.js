import { create } from 'zustand';

export const useVideoStore = create((set, get) => ({
  // Input state
  script: '',
  selectedAvatar: null,
  selectedVoice: null,
  background: 'gradient-1',
  duration: 30,
  emotion: 'professional',
  
  // Generation state
  isGenerating: false,
  progress: 0,
  generatedVideo: null,
  error: null,
  
  // History
  videoHistory: [],
  
  // Settings
  resolution: '1080p',
  quality: 'high',
  
  // Actions
  setScript: (script) => set({ script }),
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  setBackground: (background) => set({ background }),
  setDuration: (duration) => set({ duration }),
  setEmotion: (emotion) => set({ emotion }),
  setResolution: (resolution) => set({ resolution }),
  setQuality: (quality) => set({ quality }),
  
  setGenerating: (isGenerating) => set({ isGenerating }),
  setProgress: (progress) => set({ progress }),
  setGeneratedVideo: (video) => set({ generatedVideo: video }),
  setError: (error) => set({ error }),
  
  addToHistory: (video) => set((state) => ({
    videoHistory: [video, ...state.videoHistory].slice(0, 20)
  })),
  
  clearHistory: () => set({ videoHistory: [] }),
  
  resetForm: () => set({
    script: '',
    selectedAvatar: null,
    selectedVoice: null,
    background: 'gradient-1',
    duration: 30,
    emotion: 'professional',
    generatedVideo: null,
    error: null,
    progress: 0,
  }),
}));
