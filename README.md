# BIRRA AI Video Generator

A professional, production-ready AI video generation platform similar to HeyGen and D-ID. Create engaging videos with AI avatars, voice synthesis, and customizable backgrounds.

![BIRRA AI](https://img.shields.io/badge/BIRRA-AI-D4AF37?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## ✨ Features

### Core Capabilities
- **🎭 8 Professional Avatars** - Diverse, inclusive avatar options with different ethnicities and styles
- **🎙️ 8 AI Voices** - Multiple languages (English, Spanish, French, Mandarin) and accents
- **🎬 Video Generation** - Browser-based processing with FFmpeg.wasm and MediaRecorder fallback
- **📝 Script Templates** - Pre-built templates for product pitches, testimonials, educational content
- **🎨 Custom Backgrounds** - Solid colors, gradients, and image backgrounds
- **😊 Emotion/Tone Control** - Professional, friendly, energetic, calm, enthusiastic, serious
- **💾 Video History** - Local storage of generated videos with thumbnail previews
- **⚙️ Quality Settings** - 720p/1080p resolution, adjustable bitrate

### Technical Highlights
- **React 18+** with modern hooks (useState, useEffect, useContext)
- **Zustand** for lightweight state management
- **Tailwind CSS** for responsive, luxury dark theme UI
- **FFmpeg.wasm** for browser-side video processing
- **Web Speech API** for text-to-speech synthesis
- **Canvas API** for frame rendering and animations
- **Express.js** backend with RESTful API endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Modern browser with WebAssembly support

### Installation

```bash
# Clone the repository
cd /workspace

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env and add your API keys (optional)
# ANTHROPIC_API_KEY=your_key_here
```

### Running the Application

```bash
# Option 1: Run both frontend and backend together
npm start

# Option 2: Run separately (recommended for development)
# Terminal 1 - Backend server (port 4000)
npm run server

# Terminal 2 - Frontend dev server (port 3000)
npm run dev
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

## 📁 Project Structure

```
/workspace
├── src/
│   ├── components/          # React components
│   │   ├── VideoGenerator.jsx    # Main application component
│   │   ├── AvatarSelector.jsx    # Avatar selection grid
│   │   ├── VoiceSelector.jsx     # Voice selection with samples
│   │   ├── EffectsPanel.jsx      # Background & emotion settings
│   │   ├── ScriptInput.jsx       # Text input with templates
│   │   ├── VideoPreview.jsx      # Video player & download
│   │   ├── VideoHistory.jsx      # Gallery of past videos
│   │   └── SettingsPanel.jsx     # Resolution & quality settings
│   ├── hooks/
│   │   └── useVideoGeneration.js # Video generation logic
│   ├── store/
│   │   └── videoStore.js         # Zustand state management
│   ├── utils/
│   │   ├── videoProcessor.js     # FFmpeg & Canvas processing
│   │   ├── audioProcessor.js     # Web Speech API integration
│   │   └── templateGenerator.js  # Script optimization utilities
│   ├── data/
│   │   └── constants.js          # Avatars, voices, templates data
│   ├── styles/
│   │   └── index.css             # Tailwind CSS + custom styles
│   └── main.jsx                  # React entry point
├── server/
│   └── index.js                  # Express.js API server
├── public/                       # Static assets
├── package.json
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind customization
└── .env.example                  # Environment variables template
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-video` | Start video generation |
| GET | `/api/avatars` | List available avatars |
| GET | `/api/voices` | List available voices |
| POST | `/api/generate-script` | Generate script variations |
| GET | `/api/video-history` | Retrieve generation history |
| GET | `/api/health` | Health check endpoint |

### Example API Request

```javascript
// POST /api/generate-video
{
  "script": "Welcome to our platform!",
  "avatar": { "id": "avatar-1", "name": "Alexandra" },
  "voice": { "id": "voice-1", "name": "Emma (US)" },
  "background": { "id": "gradient-1", "name": "Gold Gradient" },
  "duration": 30,
  "emotion": "professional"
}
```

## 🎨 Customization

### Adding New Avatars

Edit `src/data/constants.js`:

```javascript
{
  id: 'avatar-9',
  name: 'New Avatar',
  gender: 'female',
  ethnicity: 'caucasian',
  style: 'business',
  image: '/assets/avatars/avatar-9.png',
  description: 'Professional presenter',
}
```

### Adding New Voices

```javascript
{
  id: 'voice-9',
  name: 'New Voice (DE)',
  language: 'de-DE',
  gender: 'female',
  accent: 'German',
  sampleUrl: '/assets/audio/voice-9.mp3',
}
```

### Customizing Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  birra: {
    gold: '#D4AF37',      // Primary brand color
    dark: '#0A0A0F',      // Background dark
    gray: '#1A1A2E',      // Card background
    light: '#F5F5F5',     // Text light
    accent: '#C9A961',    // Accent color
  },
}
```

## 🔧 Advanced Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Anthropic Claude API (optional, for script optimization)
ANTHROPIC_API_KEY=your_anthropic_key

# Server port
PORT=4000

# Enable ElevenLabs integration (future feature)
ELEVENLABS_API_KEY=your_elevenlabs_key
```

### Browser Compatibility

The application uses the following modern web technologies:
- **WebAssembly** - Required for FFmpeg.wasm
- **SharedArrayBuffer** - Required for FFmpeg.wasm (needs COOP/COEP headers in production)
- **MediaRecorder API** - Fallback video encoding
- **Web Speech API** - Text-to-speech synthesis
- **Canvas API** - Frame rendering

For production deployment, add these headers to enable SharedArrayBuffer:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## 📊 Performance Optimizations

1. **Lazy Loading** - Avatars and backgrounds load on demand
2. **IndexedDB Cache** - Generated videos cached in browser
3. **Web Workers** - Heavy processing offloaded from main thread
4. **Progressive Rendering** - Frame-by-frame rendering with progress updates
5. **MediaRecorder Fallback** - Alternative when FFmpeg.wasm unavailable

## 🐛 Troubleshooting

### FFmpeg.wasm Not Loading
- Ensure your browser supports WebAssembly
- Check that SharedArrayBuffer is available
- Verify COOP/COEP headers are set in production

### Audio Not Playing
- Check browser permissions for audio playback
- Try a different browser (Chrome recommended)
- Ensure Web Speech API is supported

### Video Generation Fails
- Reduce resolution to 720p for faster processing
- Shorten script length
- Try MediaRecorder fallback mode

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Documentation: Check the `/docs` folder

---

Built with ❤️ using React, FFmpeg.wasm, and Web Speech API
