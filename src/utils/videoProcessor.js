/**
 * Video processing utilities using Canvas API and FFmpeg.wasm
 */

export class VideoProcessor {
  constructor() {
    this.ffmpeg = null;
    this.canvas = null;
    this.ctx = null;
    this.isInitialized = false;
  }

  /**
   * Initialize FFmpeg.wasm
   */
  async initFFmpeg() {
    if (this.isInitialized) return true;

    try {
      const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');
      this.ffmpeg = createFFmpeg({ log: true });
      await this.ffmpeg.load();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize FFmpeg:', error);
      throw new Error('FFmpeg initialization failed. SharedArrayBuffer may not be available.');
    }
  }

  /**
   * Create canvas for video rendering
   */
  createCanvas(width = 1920, height = 1080) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    return this.canvas;
  }

  /**
   * Draw background on canvas
   */
  drawBackground(background) {
    if (!this.ctx || !this.canvas) return;

    if (background.type === 'solid') {
      this.ctx.fillStyle = background.value;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else if (background.type === 'gradient') {
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      // Parse gradient value (simplified)
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else if (background.type === 'image') {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          resolve();
        };
        img.onerror = reject;
        img.src = background.value;
      });
    }
  }

  /**
   * Draw avatar on canvas with basic animation
   */
  drawAvatar(avatar, frame = 0, options = {}) {
    if (!this.ctx || !this.canvas) return;

    const {
      x = this.canvas.width / 2,
      y = this.canvas.height / 2,
      scale = 1,
      emotion = 'neutral',
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Apply subtle animation based on frame
        const bobOffset = Math.sin(frame * 0.1) * 2;
        const blinkScale = frame % 180 < 10 ? 1 : 0.98; // Blink every ~3 seconds
        
        const avatarWidth = img.width * scale;
        const avatarHeight = img.height * scale;
        
        this.ctx.save();
        this.ctx.translate(x, y + bobOffset);
        this.ctx.scale(blinkScale, blinkScale);
        this.ctx.drawImage(
          img,
          -avatarWidth / 2,
          -avatarHeight / 2,
          avatarWidth,
          avatarHeight
        );
        this.ctx.restore();
        resolve();
      };
      
      img.onerror = reject;
      img.src = avatar.image;
    });
  }

  /**
   * Draw text overlay (subtitles)
   */
  drawText(text, options = {}) {
    if (!this.ctx || !this.canvas) return;

    const {
      x = this.canvas.width / 2,
      y = this.canvas.height - 100,
      fontSize = 48,
      fontFamily = 'Inter, sans-serif',
      color = '#FFFFFF',
      backgroundColor = 'rgba(0, 0, 0, 0.7)',
      maxWidth = this.canvas.width - 100,
      align = 'center',
    } = options;

    this.ctx.save();
    
    // Set font properties
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'middle';
    
    // Word wrap
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const lineHeight = fontSize * 1.4;
    
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    
    // Draw background for text
    const totalHeight = lines.length * lineHeight;
    const padding = 20;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.roundRect(
      x - maxWidth / 2 - padding,
      y - totalHeight / 2 - padding,
      maxWidth + padding * 2,
      totalHeight + padding * 2,
      10
    );
    this.ctx.fill();
    
    // Draw text
    this.ctx.fillStyle = color;
    lines.forEach((line, index) => {
      this.ctx.fillText(line, x, y - totalHeight / 2 + lineHeight / 2 + index * lineHeight);
    });
    
    this.ctx.restore();
  }

  /**
   * Generate lip sync animation frames
   */
  generateLipSyncFrames(audioDuration, fps = 30) {
    const totalFrames = Math.ceil(audioDuration * fps);
    const frames = [];
    
    for (let i = 0; i < totalFrames; i++) {
      // Simulate mouth movement based on audio amplitude
      const time = i / fps;
      const mouthOpen = Math.abs(Math.sin(time * Math.PI * 2)) * 0.3 + 0.7;
      
      frames.push({
        frame: i,
        time,
        mouthOpen,
        headRotation: Math.sin(time * 0.5) * 5, // Subtle head rotation
        eyeBlink: Math.random() > 0.95, // Random blinks
      });
    }
    
    return frames;
  }

  /**
   * Render video frames to canvas sequence
   */
  async renderVideoFrames(config, onProgress) {
    const {
      avatar,
      background,
      script,
      duration,
      emotion,
      resolution = { width: 1920, height: 1080 },
    } = config;

    const fps = 30;
    const totalFrames = duration * fps;
    const frames = this.generateLipSyncFrames(duration, fps);
    
    this.createCanvas(resolution.width, resolution.height);
    
    const recordedFrames = [];
    
    for (let i = 0; i < totalFrames; i++) {
      const frameData = frames[i] || { mouthOpen: 1, headRotation: 0, eyeBlink: false };
      
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw background
      await this.drawBackground(background);
      
      // Draw avatar with animation
      await this.drawAvatar(avatar, i, {
        emotion: emotion,
        scale: 0.8 + frameData.mouthOpen * 0.1,
      });
      
      // Draw subtitles (if current word should be shown)
      const words = script.split(' ');
      const wordsPerFrame = words.length / totalFrames;
      const currentWordIndex = Math.floor(i * wordsPerFrame);
      const subtitleText = words.slice(
        Math.max(0, currentWordIndex - 2),
        Math.min(words.length, currentWordIndex + 3)
      ).join(' ');
      
      if (subtitleText) {
        this.drawText(subtitleText);
      }
      
      // Capture frame
      recordedFrames.push(this.canvas.toDataURL('image/png'));
      
      // Report progress
      if (onProgress && i % 30 === 0) {
        onProgress(Math.round((i / totalFrames) * 100));
      }
      
      // Yield to main thread
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    return recordedFrames;
  }

  /**
   * Combine frames and audio into video using FFmpeg
   */
  async createVideo(frames, audioUrl, outputFilename = 'output.mp4') {
    if (!this.ffmpeg) {
      await this.initFFmpeg();
    }

    const { fetchFile } = await import('@ffmpeg/ffmpeg');
    
    // Write frames to FFmpeg FS
    for (let i = 0; i < frames.length; i++) {
      const frameData = frames[i].split(',')[1]; // Remove data URL prefix
      const binaryString = atob(frameData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let j = 0; j < len; j++) {
        bytes[j] = binaryString.charCodeAt(j);
      }
      
      this.ffmpeg.FS('writeFile', `frame${i.toString().padStart(4, '0')}.png`, bytes);
    }

    // Write audio file
    const audioResponse = await fetch(audioUrl);
    const audioBuffer = await audioResponse.arrayBuffer();
    this.ffmpeg.FS('writeFile', 'audio.mp3', new Uint8Array(audioBuffer));

    // Create input list for concat
    const inputList = frames.map((_, i) => 
      `file 'frame${i.toString().padStart(4, '0')}.png'`
    ).join('\n');
    this.ffmpeg.FS('writeFile', 'input.txt', inputList);

    // Run FFmpeg command
    await this.ffmpeg.run(
      '-framerate', '30',
      '-pattern_type', 'glob',
      '-i', '*.png',
      '-i', 'audio.mp3',
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-shortest',
      '-pix_fmt', 'yuv420p',
      outputFilename
    );

    // Read output file
    const data = this.ffmpeg.FS('readFile', outputFilename);
    
    // Create blob URL
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);
    
    // Cleanup
    for (let i = 0; i < frames.length; i++) {
      this.ffmpeg.FS('unlink', `frame${i.toString().padStart(4, '0')}.png`);
    }
    this.ffmpeg.FS('unlink', 'audio.mp3');
    this.ffmpeg.FS('unlink', 'input.txt');
    this.ffmpeg.FS('unlink', outputFilename);

    return videoUrl;
  }

  /**
   * Simple video export without FFmpeg (using MediaRecorder)
   */
  async exportVideoSimple(frames, audioUrl, filename = 'video.webm') {
    const canvas = this.createCanvas();
    const stream = canvas.captureStream(30);
    
    // Add audio track if available
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const dest = audioContext.createMediaStreamDestination();
      source.connect(dest);
      stream.addTrack(dest.stream.getAudioTracks()[0]);
      audio.play();
    }

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5000000,
    });

    const chunks = [];
    
    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        resolve(url);
      };

      mediaRecorder.onerror = reject;
      
      mediaRecorder.start();

      // Play through frames
      let frameIndex = 0;
      const playFrame = () => {
        if (frameIndex >= frames.length) {
          mediaRecorder.stop();
          return;
        }

        const img = new Image();
        img.onload = () => {
          canvas.getContext('2d').drawImage(img, 0, 0);
          frameIndex++;
          setTimeout(playFrame, 1000 / 30);
        };
        img.src = frames[frameIndex];
      };

      playFrame();
    });
  }

  /**
   * Download video file
   */
  downloadVideo(videoUrl, filename = 'birra-video.mp4') {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const videoProcessor = new VideoProcessor();
export default videoProcessor;
