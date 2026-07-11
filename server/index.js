import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for video history (in production, use a database)
const videoHistory = [];

/**
 * POST /api/generate-video
 * Main endpoint for video generation
 */
app.post('/api/generate-video', async (req, res) => {
  try {
    const { script, avatar, voice, background, duration, emotion } = req.body;

    // Validate required fields
    if (!script || !avatar || !voice || !background) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['script', 'avatar', 'voice', 'background'],
      });
    }

    // In a real implementation, this would:
    // 1. Call Claude API to optimize the script
    // 2. Call ElevenLabs or similar for audio generation
    // 3. Use FFmpeg server-side for video rendering
    // For now, we return a success response and let the client handle generation

    const videoData = {
      id: `video-${Date.now()}`,
      script,
      avatar,
      voice,
      background,
      duration,
      emotion,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    videoHistory.push(videoData);

    res.json({
      success: true,
      message: 'Video generation started',
      videoId: videoData.id,
      estimatedTime: `${duration + 10}s`, // Estimate
    });
  } catch (error) {
    console.error('Generate video error:', error);
    res.status(500).json({
      error: 'Failed to generate video',
      message: error.message,
    });
  }
});

/**
 * GET /api/avatars
 * List available avatars
 */
app.get('/api/avatars', (req, res) => {
  const avatars = [
    { id: 'avatar-1', name: 'Alexandra', gender: 'female', style: 'business' },
    { id: 'avatar-2', name: 'Marcus', gender: 'male', style: 'business' },
    { id: 'avatar-3', name: 'Sofia', gender: 'female', style: 'casual' },
    { id: 'avatar-4', name: 'James', gender: 'male', style: 'formal' },
    { id: 'avatar-5', name: 'Yuki', gender: 'female', style: 'business' },
    { id: 'avatar-6', name: 'David', gender: 'male', style: 'casual' },
    { id: 'avatar-7', name: 'Priya', gender: 'female', style: 'business' },
    { id: 'avatar-8', name: 'Omar', gender: 'male', style: 'formal' },
  ];

  res.json({ avatars });
});

/**
 * GET /api/voices
 * List available voices
 */
app.get('/api/voices', (req, res) => {
  const voices = [
    { id: 'voice-1', name: 'Emma (US)', language: 'en-US', gender: 'female', accent: 'American' },
    { id: 'voice-2', name: 'James (UK)', language: 'en-GB', gender: 'male', accent: 'British' },
    { id: 'voice-3', name: 'Olivia (AU)', language: 'en-AU', gender: 'female', accent: 'Australian' },
    { id: 'voice-4', name: 'Carlos (ES)', language: 'es-ES', gender: 'male', accent: 'Spanish' },
    { id: 'voice-5', name: 'Marie (FR)', language: 'fr-FR', gender: 'female', accent: 'French' },
    { id: 'voice-6', name: 'Wei (CN)', language: 'zh-CN', gender: 'male', accent: 'Mandarin' },
    { id: 'voice-7', name: 'Michael (US)', language: 'en-US', gender: 'male', accent: 'American' },
    { id: 'voice-8', name: 'Sophie (CA)', language: 'en-CA', gender: 'female', accent: 'Canadian' },
  ];

  res.json({ voices });
});

/**
 * POST /api/generate-script
 * Optimize user script using Claude API
 */
app.post('/api/generate-script', async (req, res) => {
  try {
    const { action, baseScript, count = 3, options = {} } = req.body;

    if (!baseScript) {
      return res.status(400).json({ error: 'Script is required' });
    }

    // If Claude API key is configured, use it
    if (process.env.ANTHROPIC_API_KEY && action === 'variations') {
      // Here you would call the actual Claude API
      // For demo purposes, return simple variations
    }

    // Fallback: generate simple variations
    const variations = [];
    const sentences = baseScript.match(/[^\.!\?]+[\.!\?]+/g) || [baseScript];

    for (let i = 0; i < count; i++) {
      let variation = [...sentences];
      if (variation.length > 2) {
        const idx1 = Math.floor(Math.random() * variation.length);
        const idx2 = (idx1 + 1) % variation.length;
        [variation[idx1], variation[idx2]] = [variation[idx2], variation[idx1]];
      }
      variations.push({
        id: `var-${i + 1}`,
        script: variation.join(' ').trim(),
      });
    }

    res.json({ variations });
  } catch (error) {
    console.error('Generate script error:', error);
    res.status(500).json({
      error: 'Failed to generate script variations',
      message: error.message,
    });
  }
});

/**
 * GET /api/video-history
 * Retrieve previous generations
 */
app.get('/api/video-history', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const recentVideos = videoHistory.slice(-limit).reverse();
  
  res.json({ videos: recentVideos });
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BIRRA AI Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/generate-video`);
  console.log(`   GET  /api/avatars`);
  console.log(`   GET  /api/voices`);
  console.log(`   POST /api/generate-script`);
  console.log(`   GET  /api/video-history`);
  console.log(`   GET  /api/health`);
});

export default app;
