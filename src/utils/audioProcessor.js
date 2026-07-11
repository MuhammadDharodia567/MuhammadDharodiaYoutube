/**
 * Audio synthesis utilities using Web Speech API and Tone.js
 */

export class AudioProcessor {
  constructor() {
    this.synth = window.speechSynthesis;
    this.audioContext = null;
    this.currentUtterance = null;
  }

  /**
   * Initialize audio context for advanced processing
   */
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  /**
   * Get available voices from the system
   */
  getVoices() {
    return new Promise((resolve) => {
      const voices = this.synth.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        // Wait for voices to load
        this.synth.onvoiceschanged = () => {
          resolve(this.synth.getVoices());
        };
      }
    });
  }

  /**
   * Generate speech from text using Web Speech API
   */
  async generateSpeech(text, options = {}) {
    const {
      voiceName = null,
      rate = 1.0,
      pitch = 1.0,
      volume = 1.0,
      language = 'en-US',
    } = options;

    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Cancel any ongoing speech
        this.synth.cancel();

        // Set voice parameters
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        utterance.lang = language;

        // Try to find matching voice
        if (voiceName) {
          const voices = this.synth.getVoices();
          const selectedVoice = voices.find(v => 
            v.name.includes(voiceName) || v.lang === language
          );
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }

        this.currentUtterance = utterance;

        // Handle events
        utterance.onstart = () => {
          console.log('Speech started');
        };

        utterance.onend = () => {
          console.log('Speech completed');
          resolve(true);
        };

        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };

        // Start speaking
        this.synth.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Stop current speech
   */
  stopSpeech() {
    this.synth.cancel();
    this.currentUtterance = null;
  }

  /**
   * Pause speech
   */
  pauseSpeech() {
    this.synth.pause();
  }

  /**
   * Resume speech
   */
  resumeSpeech() {
    this.synth.resume();
  }

  /**
   * Convert speech to audio buffer (for recording)
   */
  async captureAudio(text, options = {}) {
    // Note: This is a simplified implementation
    // For production, you'd want to use a proper TTS service
    // like ElevenLabs or Google Cloud TTS
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      
      // Generate speech while recording
      this.generateSpeech(text, options)
        .then(() => {
          setTimeout(() => mediaRecorder.stop(), 1000);
        })
        .catch(reject);
    });
  }

  /**
   * Create audio visualization data
   */
  analyzeAudio(audioElement) {
    const audioContext = this.initAudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    return {
      analyser,
      getDataArray: () => {
        analyser.getByteFrequencyData(dataArray);
        return dataArray;
      },
    };
  }

  /**
   * Estimate duration of speech in seconds
   */
  estimateDuration(text, rate = 1.0) {
    const wordsPerMinute = 150 * rate;
    const wordCount = text.trim().split(/\s+/).length;
    return (wordCount / wordsPerMinute) * 60;
  }
}

export const audioProcessor = new AudioProcessor();
export default audioProcessor;
