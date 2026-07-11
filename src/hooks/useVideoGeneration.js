import React, { useCallback } from 'react';
import { useVideoStore } from '../store/videoStore';
import videoProcessor from '../utils/videoProcessor';
import audioProcessor from '../utils/audioProcessor';
import templateGenerator from '../utils/templateGenerator';

const useVideoGeneration = () => {
  const {
    script,
    selectedAvatar,
    selectedVoice,
    background,
    duration,
    emotion,
    resolution,
    quality,
    isGenerating,
    setGenerating,
    setProgress,
    setGeneratedVideo,
    setError,
    addToHistory,
  } = useVideoStore();

  const generateVideo = useCallback(async () => {
    // Validation
    if (!script || !script.trim()) {
      setError('Please enter a script');
      return false;
    }
    
    if (!selectedAvatar) {
      setError('Please select an avatar');
      return false;
    }
    
    if (!selectedVoice) {
      setError('Please select a voice');
      return false;
    }
    
    if (!background) {
      setError('Please select a background');
      return false;
    }

    try {
      setGenerating(true);
      setProgress(0);
      setError(null);

      // Step 1: Generate audio from script
      setProgress(10);
      
      // Estimate audio duration
      const estimatedDuration = templateGenerator.estimateReadingTime(script);
      const actualDuration = Math.min(duration, estimatedDuration.estimatedSeconds + 2);
      
      // For demo purposes, we'll create a simple audio visualization
      // In production, you'd use ElevenLabs or similar API
      const audioBlob = await generateAudioDemo(script, selectedVoice);
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Step 2: Render video frames
      setProgress(30);
      
      const resolutionMap = {
        '720p': { width: 1280, height: 720 },
        '1080p': { width: 1920, height: 1080 },
      };
      
      const frames = await videoProcessor.renderVideoFrames(
        {
          avatar: selectedAvatar,
          background,
          script,
          duration: actualDuration,
          emotion,
          resolution: resolutionMap[resolution] || resolutionMap['1080p'],
        },
        (progress) => {
          setProgress(30 + Math.round(progress * 0.5)); // 30-80%
        }
      );
      
      // Step 3: Create video file
      setProgress(80);
      
      // Try FFmpeg first, fall back to MediaRecorder
      let videoUrl;
      try {
        videoUrl = await videoProcessor.createVideo(frames, audioUrl);
      } catch (ffmpegError) {
        console.warn('FFmpeg failed, using MediaRecorder fallback:', ffmpegError);
        videoUrl = await videoProcessor.exportVideoSimple(frames, audioUrl);
      }
      
      setProgress(100);
      
      // Step 4: Save to history
      const videoData = {
        id: `video-${Date.now()}`,
        url: videoUrl,
        script,
        avatar: selectedAvatar,
        voice: selectedVoice,
        background,
        duration: actualDuration,
        emotion,
        createdAt: new Date().toISOString(),
        thumbnail: frames[Math.floor(frames.length / 2)],
      };
      
      addToHistory(videoData);
      setGeneratedVideo(videoUrl);
      
      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(audioUrl);
      }, 60000);
      
      setGenerating(false);
      return true;
      
    } catch (error) {
      console.error('Video generation error:', error);
      setError(error.message || 'Failed to generate video. Please try again.');
      setGenerating(false);
      setProgress(0);
      return false;
    }
  }, [
    script,
    selectedAvatar,
    selectedVoice,
    background,
    duration,
    emotion,
    resolution,
    quality,
    setGenerating,
    setProgress,
    setGeneratedVideo,
    setError,
    addToHistory,
  ]);

  // Demo audio generation (creates a silent audio file for demo)
  const generateAudioDemo = async (text, voice) => {
    // Create a simple audio context and generate a tone
    const audioContext = new AudioContext();
    const sampleRate = audioContext.sampleRate;
    const duration = Math.max(5, text.length / 20); // Rough estimate
    
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);
    const oscillator = offlineContext.createOscillator();
    const gainNode = offlineContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(offlineContext.destination);
    
    oscillator.frequency.value = 440; // A4 note
    oscillator.type = 'sine';
    
    // Simple envelope
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.3, 0.1);
    gainNode.gain.linearRampToValueAtTime(0.2, duration - 0.1);
    gainNode.gain.linearRampToValueAtTime(0, duration);
    
    oscillator.start(0);
    oscillator.stop(duration);
    
    const audioBuffer = await offlineContext.startRendering();
    
    // Convert to WAV
    const wavBlob = audioBufferToWav(audioBuffer);
    return wavBlob;
  };

  // Helper function to convert AudioBuffer to WAV blob
  const audioBufferToWav = (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    
    const data = [];
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const intSample = Math.max(-1, Math.min(1, sample));
        data.push(intSample < 0 ? intSample * 0x8000 : intSample * 0x7FFF);
      }
    }
    
    const dataLength = data.length * bytesPerSample;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
    
    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, bufferLength - 8, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);
    
    // Write audio data
    let offset = 44;
    for (const sample of data) {
      view.setInt16(offset, sample, true);
      offset += 2;
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return { generateVideo };
};

export default useVideoGeneration;
