#!/usr/bin/env python3
"""
YouTube Money Video Production Guide Generator
Generates complete production guides, asset lists, and AI prompts for video creation.
"""

import os
from datetime import datetime

def generate_production_guide():
    guide = """YOUTUBE MONEY VIDEO - COMPLETE PRODUCTION GUIDE
═══════════════════════════════════════════════════════════════
Generated: {date}

PART 1: PRE-PRODUCTION CHECKLIST
───────────────────────────────────────────────────────────────

□ SCRIPT FINALIZED
  - Read through aloud for timing (aim for 140-150 words/minute)
  - Mark where B-roll/graphics needed
  - Add timestamp markers in script

□ VISUAL ASSETS LIST
  See "ASSET_LIST.txt" for complete breakdown

□ RECORDING SETUP
  Audio:
  □ Quiet room (no echo, no background noise)
  □ Microphone test (USB mic or phone with good mic)
  □ Pop filter if available
  □ Record in WAV or high-quality MP3
  
  Video (if on camera):
  □ Good lighting (natural light or ring light)
  □ Clean background or green screen
  □ Camera at eye level
  □ 1080p minimum resolution

□ SOFTWARE NEEDED
  Free Options:
  - Editing: DaVinci Resolve, CapCut, Shotcut
  - Graphics: Canva, Figma
  - Screen Recording: OBS Studio
  - Audio: Audacity
  
  Paid Options:
  - Editing: Premiere Pro, Final Cut Pro
  - Graphics: After Effects, Motion
  - Stock Footage: Storyblocks, Envato Elements

═══════════════════════════════════════════════════════════════

PART 2: STEP-BY-STEP PRODUCTION WORKFLOW
───────────────────────────────────────────────────────────────

STEP 1: RECORD VOICEOVER (2-3 hours)
────────────────────────────────────────
1. Open Audacity or your recording software
2. Set sample rate to 44100 Hz, 16-bit
3. Record entire script in one take if possible
4. Leave 2-second pauses between sections
5. Export as WAV file: "video_name_voiceover.wav"

Pro Tips:
- Drink water before recording
- Stand up while recording for better energy
- Smile while talking (listeners can hear it!)
- Record multiple takes of hook section

STEP 2: CREATE/Collect VISUAL ASSETS (3-5 hours)
────────────────────────────────────────────────
A. Stock Footage Needed:
   - Money counting hands
   - City skyline/time-lapse
   - People working at computers
   - Shopping/grocery scenes
   - Calculator/computer screens
   - Graphs/charts animations
   
   Free Sources: Pexels, Pixabay, Mixkit
   Paid Sources: Storyblocks, Getty Images

B. Graphics to Create (use Canva/Figma):
   - Title card with bold text
   - Statistic overlays (78% etc.)
   - Comparison charts (Poor vs Rich)
   - Pie charts (50/30/20 rule)
   - Progress bars
   - Lower thirds (your name/channel)
   - End screen template

C. Screen Recordings:
   - Investment platform walkthrough
   - Budgeting app demo
   - Compound interest calculator
   Use OBS Studio at 1080p, 30fps

STEP 3: EDIT VIDEO (4-8 hours)
────────────────────────────────
Timeline Structure:
┌─────────────────────────────────────────────────────────┐
│ 0:00-0:15  │ HOOK     │ Bold text + shocking stat B-roll│
│ 0:15-0:30  │ INTRO    │ You on camera or animated logo  │
│ 0:30-1:00  │ PROBLEM  │ Problem visualization           │
│ 1:00-12:00 │ CONTENT  │ Mix of B-roll, graphics, you    │
│ 12:00-13:00│ SUMMARY  │ Recap graphics                  │
│ 13:00-14:00│ CTA      │ End screen + subscribe button   │
└─────────────────────────────────────────────────────────┘

Editing Workflow:
1. Import voiceover as primary audio track
2. Add background music (low volume: -20dB)
3. Place B-roll clips matching voiceover
4. Add text overlays for key points
5. Insert graphics/animations
6. Add transitions (keep simple: cuts, fades)
7. Color correction (consistent look)
8. Audio leveling (voiceover clear over music)
9. Add end screen elements
10. Export at 1080p, H.264, 30fps

Pacing Rule: Change visual every 3-5 seconds!

STEP 4: CREATE THUMBNAIL (30-60 min)
────────────────────────────────────
Thumbnail Formula:
- Your face with emotion (surprised/excited)
- 1-3 bold words max (yellow/white text)
- High contrast background
- Number if applicable ("5 WAYS", "$10K")
- Red arrow or circle pointing to something

Canva Template Size: 1280x720 pixels
Export as PNG for best quality

STEP 5: UPLOAD & OPTIMIZE (30 min)
──────────────────────────────────
Title (under 60 chars):
"How to Build Wealth from $0 (Step-by-Step Guide)"

Description Template:
```
In this video, I break down exactly how to build wealth starting from zero...

⏱️ TIMESTAMPS:
0:00 - The shocking truth about wealth
0:15 - What you'll learn today
0:30 - Why most people stay broke
1:00 - Pillar 1: Income
3:00 - Pillar 2: Expenses
5:00 - Pillar 3: Investments
8:30 - Your 7-day action plan
11:30 - Summary
12:30 - Next steps

📚 RESOURCES MENTIONED:
- Budgeting App: [affiliate link]
- Investment Platform: [affiliate link]
- Free Budget Template: [link]

🔔 SUBSCRIBE for weekly money tips: [channel link]

💬 Join our community: [Discord/FB link]

#personalfinance #investing #wealthbuilding #moneytips #financialfreedom
```

Tags:
personal finance, investing for beginners, how to build wealth, passive income, 
money management, financial freedom, budgeting, compound interest, stock market, 
retirement planning

═══════════════════════════════════════════════════════════════

PART 3: AI PROMPTS FOR VIDEO CREATION
───────────────────────────────────────────────────────────────

Use these prompts with AI video tools (Runway, Pika, HeyGen, etc.)

PROMPT 1: ANIMATED MONEY GROWTH
"Create a 5-second animation showing money growing exponentially. 
Start with a single dollar bill that multiplies into stacks of cash, 
then grows into a mountain of money. Green and gold color scheme, 
smooth motion, clean modern style, 4k quality."

PROMPT 2: PIE CHART ANIMATION
"Animate a pie chart dividing into three sections: 50% blue (Needs), 
30% yellow (Wants), 20% green (Savings). Each section fills smoothly 
with label appearing. Clean corporate style, white background, 4k."

PROMPT 3: COMPOUND INTEREST VISUALIZATION
"Show a line graph with two lines: one linear (flat growth), one 
exponential (curving upward dramatically). Animate the lines drawing 
themselves over 10 years. Add dollar amounts appearing at endpoints. 
Professional financial style, dark background with bright lines."

PROMPT 4: MONEY FLOW ANIMATION
"Animate dollar bills flowing from a paycheck into three buckets 
labeled 'Needs', 'Wants', 'Savings'. Show percentages (50/30/20) 
appearing above each bucket. Smooth motion, isometric view, 
modern flat design style."

PROMPT 5: WEALTH MINDSET COMPARISON
"Split screen animation. Left side shows person working hard at desk 
with thought bubble 'Work More'. Right side shows person relaxed 
while money icons flow in with thought bubble 'Make Money Work'. 
Clean vector style, contrasting colors."

PROMPT 6: PROGRESS BAR CHECKLIST
"Animate a progress bar filling from 0% to 100% with checkmarks 
appearing at 25%, 50%, 75%, 100%. Each checkpoint shows a task: 
'Track Spending', 'Cut Expenses', 'Open Account', 'Start Investing'. 
Modern UI style, green progress bar, white background."

PROMPT 7: SHOCKING STATISTIC REVEAL
"Big bold text appears: '78%'. Shatters effect revealing full text: 
'78% of Americans live paycheck to paycheck'. Dramatic sound effect 
visual, red and black color scheme, impactful typography."

PROMPT 8: PASSIVE INCOME ICONS
"Five icons appear one by one: dividend stock chart, bond certificate, 
rental house, digital product box, affiliate link chain. Each icon 
glows as it appears with label underneath. Clean icon set, blue and 
green color palette, smooth fade-in animation."

PROMPT 9: TIME VALUE OF MONEY
"Show two people: one starts investing at age 25, another at 35. 
Animate their investment accounts growing side-by-side over 40 years. 
Final amounts appear dramatically different. Emotional impact, 
realistic character illustrations."

PROMPT 10: END SCREEN TEMPLATE
"Create YouTube end screen layout: Subscribe button pulsing on left, 
two video thumbnail placeholders on right, notification bell icon 
animated at top. Modern design, channel branding colors, 20-second 
loop animation."

═══════════════════════════════════════════════════════════════

PART 4: B-ROLL SHOT LIST BY VIDEO TOPIC
───────────────────────────────────────────────────────────────

VIDEO 1: BUILD WEALTH FROM ZERO
□ Hands counting cash
□ Person looking stressed at bills
□ Calendar pages flipping
✅ Piggy bank being filled
✅ Graph arrow going up
✅ Person smiling at computer (investing)
✅ Shopping cart with groceries
✅ Cutting coupons/bills
✅ Bank statement close-up
✅ Sunset/sunrise (new beginning metaphor)

VIDEO 2: COMPOUND INTEREST
✅ Clock spinning fast
✅ Snowball rolling downhill getting bigger
✅ Tree growing from seed to large tree
✅ Calculator buttons being pressed
✅ Graph curving upward
✅ Hourglass with sand falling
✅ Child piggy bank to adult investment account
✅ Domino effect

VIDEO 3: 50/30/20 BUDGET
✅ Wallet opening/closing
✅ Three jars/buckets labeled
✅ Person writing in budget notebook
✅ Phone showing budgeting app
✅ Grocery shopping
✅ Restaurant dining
✅ Entertainment (movies, games)
✅ ATM withdrawal
✅ Automatic transfer animation

VIDEO 4: PASSIVE INCOME
✅ Person sleeping while money falls
✅ Stock market ticker scrolling
✅ Rental property exterior
✅ E-book cover design
✅ Computer with affiliate dashboard
✅ Mailbox with check arriving
✅ Dividend payment notification
✅ Real estate keys handoff

VIDEO 5: RICH MINDSET
✅ Chess game (strategic thinking)
✅ Lightbulb turning on
✅ Brain with gears turning
✅ Fork in road (choice metaphor)
✅ Mountain climbing (long-term goal)
✅ Trophy/achievement
✅ Handshake (business deal)
✅ Vision board creation

═══════════════════════════════════════════════════════════════

PART 5: AUDIO & MUSIC RESOURCES
───────────────────────────────────────────────────────────────

FREE MUSIC SOURCES:
- YouTube Audio Library (free with YouTube)
- Bensound.com (free with attribution)
- Incompetech.com (Kevin MacLeod)
- FreeMusicArchive.org
- Pixabay Music

MUSIC STYLES FOR MONEY VIDEOS:
- Upbeat corporate/tech (for intro/hook)
- Calm ambient (for educational sections)
- Inspiring/building (for success stories)
- Minimal piano (for serious topics)

AUDIO SETTINGS:
- Voiceover: -6dB to -3dB
- Background music: -20dB to -25dB
- Sound effects: -10dB to -15dB
- Normalize final export to -1 LUFS

═══════════════════════════════════════════════════════════════

PART 6: EXPORT SETTINGS CHEAT SHEET
───────────────────────────────────────────────────────────────

YOUTUBE OPTIMAL SETTINGS:
Resolution: 1920x1080 (1080p) or 3840x2160 (4K)
Frame Rate: 30fps (or match source footage)
Codec: H.264
Profile: High
Level: 5.1
Bitrate: 
  - 1080p: 12-15 Mbps
  - 4K: 45-60 Mbps
Audio: AAC, 320 kbps, 48kHz
Format: .mp4 or .mov
Aspect Ratio: 16:9
Color Space: Rec. 709

FILE NAMING CONVENTION:
[ChannelName]_[VideoTopic]_[Date]_[Version].mp4
Example: WealthWise_BuildWealthFromZero_2024_v2.mp4

═══════════════════════════════════════════════════════════════

PART 7: UPLOAD DAY CHECKLIST
───────────────────────────────────────────────────────────────

□ Video exported and reviewed (watch full video!)
□ Thumbnail created and saved as PNG
□ Title written (under 60 characters)
□ Description written with timestamps
□ Tags added (10-15 relevant tags)
□ End screen elements added in YouTube Studio
□ Cards added (link to related videos)
□ Subtitles/captions uploaded or auto-generated
□ Category set to "Education"
□ Audience set to "Not made for kids"
□ Comments enabled
□ Monetization enabled (if eligible)
□ Premier date/time scheduled (optional)
□ Community post created to announce video
□ Social media posts prepared

═══════════════════════════════════════════════════════════════

PART 8: POST-UPLOAD PROMOTION
───────────────────────────────────────────────────────────────

Day 1:
□ Share on all social platforms
□ Post in relevant Facebook groups (follow rules!)
□ Share in Discord communities
□ Email newsletter subscribers
□ Respond to every comment in first 2 hours

Week 1:
□ Pin best comment
□ Heart helpful comments
□ Create Shorts from video highlights
□ Make Instagram/TikTok clips
□ Update website/blog with embed

Ongoing:
□ Reference in future videos
□ Add to relevant playlists
□ Include in email signature
□ Use in lead magnets

═══════════════════════════════════════════════════════════════

PRODUCTION TIME ESTIMATES:
───────────────────────────────────────────────────────────────
First Video: 15-25 hours (learning curve)
After 5 Videos: 8-12 hours per video
After 20 Videos: 4-6 hours per video (templates/reuse)

BATCH PRODUCTION TIP:
Record 4 voiceovers in one session
Create all graphics for month in one day
Edit 2-3 videos back-to-back
Schedule uploads weekly

═══════════════════════════════════════════════════════════════
""".format(date=datetime.now().strftime("%Y-%m-%d"))
    
    return guide


def generate_asset_list():
    assets = """YOUTUBE MONEY VIDEO - MASTER ASSET LIST
═══════════════════════════════════════════════════════════════

ORGANIZE YOUR FILES LIKE THIS:

📁 Video_Project_Name/
├── 📁 01_Scripts/
│   ├── final_script_v1.txt
│   ├── final_script_v2.txt
│   └── script_notes.txt
│
├── 📁 02_Audio/
│   ├── voiceover_raw.wav
│   ├── voiceover_edited.wav
│   ├── background_music.mp3
│   └── sound_effects/
│       ├── whoosh_01.wav
│       ├── ding_01.wav
│       └── transition_01.wav
│
├── 📁 03_Footage/
│   ├── b_roll/
│   │   ├── money_counting.mp4
│   │   ├── city_timelapse.mp4
│   │   ├── office_work.mp4
│   │   ├── shopping_grocery.mp4
│   │   └── calculator_closeup.mp4
│   ├── screen_recordings/
│   │   ├── investment_platform.mp4
│   │   ├── budget_app_demo.mp4
│   │   └── compound_calculator.mp4
│   └── camera_a_roll/
│       ├── intro_take1.mp4
│       ├── intro_take2.mp4
│       └── outro_final.mp4
│
├── 📁 04_Graphics/
│   ├── title_cards/
│   │   ├── main_title.png
│   │   └── section_dividers.png
│   ├── charts_graphs/
│   │   ├── compound_interest_chart.png
│   │   ├── pie_chart_503020.png
│   │   ├── wealth_comparison.png
│   │   └── growth_timeline.png
│   ├── text_overlays/
│   │   ├── statistic_78percent.png
│   │   ├── key_point_01.png
│   │   ├── key_point_02.png
│   │   └── callout_boxes.png
│   ├── lower_thirds/
│   │   ├── name_title.png
│   │   └── social_handles.png
│   └── end_screen/
│       ├── subscribe_button.png
│       ├── video_placeholder_01.png
│       └── video_placeholder_02.png
│
├── 📁 05_Thumbnails/
│   ├── thumbnail_v1.psd
│   ├── thumbnail_v2.psd
│   ├── thumbnail_final.png
│   └── thumbnail_sources/
│       ├── face_photo.jpg
│       ├── background.jpg
│       └── icons/
│
├── 📁 06_Exports/
│   ├── render_01_draft.mp4
│   ├── render_02_review.mp4
│   └── final_upload.mp4
│
└── 📁 07_Documentation/
    ├── production_checklist.pdf
    ├── asset_log.xlsx
    └── upload_details.txt

═══════════════════════════════════════════════════════════════

STOCK FOOTAGE DOWNLOAD LIST (FREE SOURCES):
───────────────────────────────────────────────────────────────

Search Terms for Pexels/Pixabay/Mixkit:
□ "money counting hands"
□ "cash stacking"
□ "piggy bank"
□ "calculator typing"
□ "stock market graph"
□ "financial charts"
□ "business meeting"
□ "office work computer"
□ "shopping cart grocery"
□ "credit card payment"
□ "bank mobile app"
□ "coins falling"
□ "wallet opening"
□ "receipts bills"
□ "calendar time lapse"
□ "clock spinning"
□ "hourglass"
□ "sunrise sunset"
□ "city skyline timelapse"
□ "people walking busy"
□ "handshake business"
□ "signature signing"
□ "computer trading"
□ "real estate house"
□ "keys handoff"
□ "mailbox check"
□ "sleeping rest"
□ "relaxed happy person"
□ "mountain climbing"
□ "chess game strategy"
□ "lightbulb idea"
□ "brain animation"
□ "growth plant tree"
□ "snowball rolling"
□ "domino effect"
□ "progress bar loading"
□ "checkmark completing"

═══════════════════════════════════════════════════════════════

GRAPHICS TEMPLATES TO CREATE IN CANVA:
───────────────────────────────────────────────────────────────

Template 1: TITLE CARD
Size: 1920x1080
Elements:
- Bold sans-serif font (Montserrat/Bebas Neue)
- Gradient background (blue to purple or dark gradient)
- Main title text (centered, large)
- Subtitle (smaller, below)
- Channel logo (corner)
Save as: title_card_template.canva

Template 2: STATISTIC OVERLAY
Size: 1920x1080
Elements:
- Large number (78%, $10K, etc.)
- Supporting text below
- Icon related to stat
- Animated entrance effect note
Save as: stat_overlay_template.canva

Template 3: COMPARISON CHART
Size: 1920x1080
Elements:
- Split screen (left/right or top/bottom)
- Two columns with headers
- Checkmarks and X marks
- Contrasting colors
Save as: comparison_template.canva

Template 4: PIE CHART
Size: 1080x1080 (square for flexibility)
Elements:
- Three segments (50%, 30%, 20%)
- Labels for each segment
- Icons for each category
- Legend if needed
Save as: pie_chart_template.canva

Template 5: PROGRESS BAR
Size: 1920x1080
Elements:
- Bar outline
- Fill animation note
- Checkpoint markers
- Step labels
Save as: progress_bar_template.canva

Template 6: LOWER THIRD
Size: 1920x1080 (safe area centered)
Elements:
- Name text
- Title/description
- Simple background shape
- Subtle animation note
Save as: lower_third_template.canva

Template 7: KEY POINT CALLOUT
Size: 1920x1080
Elements:
- Numbered badge (1, 2, 3...)
- Point title
- Brief description (1-2 lines)
- Related icon
Save as: key_point_template.canva

Template 8: END SCREEN
Size: 1920x1080
Elements:
- Subscribe button (left side)
- Two video placeholders (right side)
- Notification bell icon
- Social media handles
- Background branding
Save as: end_screen_template.canva

═══════════════════════════════════════════════════════════════

FONT RECOMMENDATIONS:
───────────────────────────────────────────────────────────────

Headlines (Bold, Impactful):
- Bebas Neue (free, Google Fonts)
- Montserrat Black (free, Google Fonts)
- Oswald (free, Google Fonts)
- Anton (free, Google Fonts)

Body Text (Readable):
- Open Sans (free, Google Fonts)
- Roboto (free, Google Fonts)
- Lato (free, Google Fonts)
- Source Sans Pro (free, Google Fonts)

Numbers/Data:
-Roboto Mono (free, Google Fonts)
- IBM Plex Mono (free, Google Fonts)
- Space Mono (free, Google Fonts)

═══════════════════════════════════════════════════════════════

COLOR PALETTE FOR MONEY VIDEOS:
───────────────────────────────────────────────────────────────

Professional Trust Palette:
- Primary: #1E3A8A (Deep Blue)
- Secondary: #10B981 (Green - money/growth)
- Accent: #F59E0B (Gold/Amber - wealth)
- Neutral: #F3F4F6 (Light Gray)
- Dark: #1F2937 (Charcoal)

High Energy Palette:
- Primary: #DC2626 (Red - urgency)
- Secondary: #2563EB (Blue - trust)
- Accent: #FBBF24 (Yellow - attention)
- Neutral: #FFFFFF (White)
- Dark: #000000 (Black)

Minimalist Modern:
- Primary: #000000 (Black)
- Secondary: #FFFFFF (White)
- Accent: #10B981 (Green only accent)
- Grays: #6B7280, #9CA3AF, #D1D5DB

═══════════════════════════════════════════════════════════════

SOFTWARE SHORTCUTS CHEAT SHEET:
───────────────────────────────────────────────────────────────

DaVinci Resolve:
- Cut: B
- Delete: Backspace
- Ripple Delete: Shift+Backspace
- Split: Ctrl/Cmd + \\
- Zoom Timeline: Alt + Scroll
- Snap: N toggle
- Render: Ctrl/Cmd + R

Premiere Pro:
- Cut: C
- Razor: Ctrl/Cmd + K
- Ripple Delete: Shift+Delete
- Zoom: = and -
- Snap: S toggle
- Render Enter: Return

CapCut:
- Split: Ctrl/Cmd + B
- Delete: Delete
- Speed: Ctrl/Cmd + R
- Freeze: Ctrl/Cmd + Alt + F

═══════════════════════════════════════════════════════════════

ASSET TRACKING SPREADSHEET COLUMNS:
───────────────────────────────────────────────────────────────

Create Excel/Google Sheet with these columns:
| Asset Name | Type | Source | Date Added | Used In Videos | License | Notes |
|------------|------|--------|------------|----------------|---------|-------|
| money_hands_01.mp4 | B-roll | Pexels | 2024-01-15 | Video 1, 3 | Free | Good quality |
| compound_chart.png | Graphic | Self-made | 2024-01-16 | Video 2 | Owned | Canva template |
| upbeat_corp.mp3 | Music | YouTube Lib | 2024-01-15 | All videos | Free | Track #12345 |

═══════════════════════════════════════════════════════════════
""".format()
    
    return assets


def generate_ai_prompts_file():
    prompts = """AI VIDEO GENERATION PROMPTS - COMPLETE COLLECTION
═══════════════════════════════════════════════════════════════

HOW TO USE THESE PROMPTS:
Copy and paste into AI video tools like:
- Runway ML (runwayml.com)
- Pika Labs (pika.art)
- HeyGen (heygen.com)
- Synthesia (synthesia.io)
- D-ID (d-id.com)
- Kaiber (kaiber.ai)
- Stable Video Diffusion

═══════════════════════════════════════════════════════════════

CATEGORY 1: MONEY & WEALTH ANIMATIONS
───────────────────────────────────────────────────────────────

PROMPT 001: Compound Interest Growth
"Create a photorealistic 10-second animation showing compound 
interest. Start with a single $100 bill on a table. Watch as it 
slowly duplicates, then those duplicates duplicate again. The pile 
grows slowly at first, then accelerates rapidly into a massive stack 
reaching toward the ceiling. Warm golden lighting, cinematic depth 
of field, smooth exponential growth visualization, 4k quality."

PROMPT 002: Money Flow Buckets
"Animate an isometric view of money flowing from a central source 
into three transparent buckets. First bucket (largest, 50%) labeled 
'NEEDS' fills with blue coins. Second bucket (medium, 30%) labeled 
'WANTS' fills with yellow coins. Third bucket (smallest, 20%) 
labeled 'SAVINGS' fills with green coins. Percentages appear above 
each bucket as they fill. Clean 3D render, pastel colors, smooth 
fluid simulation, corporate Memphis style."

PROMPT 003: Cash to Investment Transformation
"Morph animation: A stack of cash dollars transforms into stock 
certificates, which then transform into a growing line graph, which 
finally transforms into a luxurious retirement scene (beach house, 
relaxing couple). Seamless transitions, magical particle effects 
during transformations, inspiring and aspirational mood, warm 
color grading, 8 second loop."

PROMPT 004: Debt Snowball Visualization
"Show multiple snowballs at the top of a hill, each labeled with 
different debts ($500, $2000, $5000). As they roll down, they merge 
together, growing larger and faster. At the bottom, the massive 
snowball crashes through a wall labeled 'DEBT FREE'. Dynamic camera 
follows the action, dramatic slow motion at impact, realistic snow 
physics mixed with financial graphics."

PROMPT 005: Passive Income Machine
"Steampunk-style machine animation. Coins drop into a funnel at 
top, travel through complex gears and pipes labeled 'Dividends', 
'Rental Income', 'Digital Products', 'Affiliate Commissions'. 
Coins multiply as they travel through each section. Machine outputs 
a continuous stream of coins into a treasure chest. Intricate 
mechanical details, brass and copper materials, glowing elements, 
magical realism style."

═══════════════════════════════════════════════════════════════

CATEGORY 2: DATA VISUALIZATION & GRAPHS
───────────────────────────────────────────────────────────────

PROMPT 006: Exponential vs Linear Growth Chart
"Create a sleek animated line graph on dark background. Two lines 
draw themselves simultaneously. Line A (red) goes up steadily in 
straight diagonal - label 'Linear Income'. Line B (green) starts 
flat then curves dramatically upward - label 'Exponential Growth'. 
Grid lines subtly pulse. Numbers animate at endpoints showing 
stark difference. Modern fintech aesthetic, neon accents, smooth 
easing functions, 4k resolution."

PROMPT 007: Age Comparison Investment Results
"Split screen comparison. Left side: 'Started at 25' shows a 
character icon, timeline of 40 years, ending with '$500,000' in 
large gold numbers. Right side: 'Started at 35' shows same 
character, timeline of 30 years, ending with '$200,000' in smaller 
silver numbers. A giant red arrow points to the difference. Clean 
infographic style, subtle animations, professional color scheme."

PROMPT 008: 50/30/20 Pie Chart Animation
"Watch a circle divide itself into three perfect segments. First 
segment (50%) slides out in blue with icon of house/car/groceries. 
Second segment (30%) slides out in yellow with restaurant/movie 
icons. Third segment (20%) slides out in green with piggy bank 
and graph icons. Each segment pulses gently. Labels rotate into 
place. White background, soft shadows, Apple keynote style 
animation."

PROMPT 009: Wealth Gap Bar Chart
"Animated horizontal bar chart comparing wealth percentiles. Bars 
grow from left to right at different speeds. Bottom 50% bar barely 
moves (label: '$8,000 net worth'). Middle 40% grows moderately 
(label: '$150,000'). Top 10% shoots across screen (label: 
'$1,200,000+'). Color gradient from gray to gold as wealth 
increases. Subtle particle effects on richest bar. Data 
visualization masterpiece, Bloomberg terminal aesthetic."

PROMPT 010: Inflation Eating Savings
"Metaphorical animation: A pile of cash sits on a table. Invisible 
force (representing inflation) slowly makes the bills shrink in 
size while price tags on items around them grow larger. A graph 
in background shows purchasing power line declining. Slightly 
ominous mood but still professional. Clever visual metaphor, 
smooth morphing effects."

═══════════════════════════════════════════════════════════════

CATEGORY 3: LIFESTYLE & ASPIRATIONAL SCENES
───────────────────────────────────────────────────────────────

PROMPT 011: Financial Freedom Lifestyle
"Cinematic montage: Couple waking up naturally (no alarm), drinking 
coffee on balcony overlooking ocean, checking investment portfolio 
on tablet with smile, playing with kids in park during weekday 
afternoon, traveling to exotic location. Warm golden hour lighting 
throughout, dreamy atmosphere, aspirational but achievable vibe, 
shot on ARRI Alexa aesthetic, 4k HDR."

PROMPT 012: Stress vs Peace Contrast
"Split screen transformation. Left side: Person stressed at desk, 
piles of bills, clock showing late night, rubbing temples, dark 
cool lighting. Right side: Same person relaxed, organized finances 
on tablet, clock showing reasonable hour, smiling, warm natural 
lighting. Split screen dissolves to full screen of peaceful scene. 
Emotional storytelling, relatable transformation."

PROMPT 013: Journey from Broke to Wealthy
"Time-lapse style journey. Character starts in small apartment 
counting change. Seasons change outside window. Character learns 
(reads books, watches tutorials), starts side hustle (working on 
laptop), makes first investment (clicking button on phone). Time 
passes, character moves to nicer home, checks growing portfolio, 
finally relaxes in comfortable retirement setting. Pixar-style 
character animation, heartwarming story arc."

PROMPT 014: Emergency Fund Security Blanket
"Metaphorical animation: Family sleeping peacefully under a giant 
blanket. Camera pulls back to reveal blanket is made of dollar 
bills woven together, labeled 'Emergency Fund - 6 Months Expenses'. 
Storm clouds gather outside but family remains safe and dry inside. 
Cozy warm interior lighting vs stormy exterior. Comfort and 
security visualized."

PROMPT 015: Multiple Income Streams Orchestra
"Conductor (you) leading an orchestra. Each section represents 
income stream: Strings = Salary, Brass = Side Hustle, Woodwinds = 
Dividends, Percussion = Rental Income. As each section plays, 
musical notes transform into coins that flow into a collection 
basket. Harmonious and beautiful, creative metaphor, vibrant 
colors, Disney animation style."

═══════════════════════════════════════════════════════════════

CATEGORY 4: EXPLAINER & EDUCATIONAL ANIMATIONS
───────────────────────────────────────────────────────────────

PROMPT 016: How Credit Score Works
"Floating 3D credit score meter (300-850 scale). Various factors 
orbit around it like planets: Payment History (largest orbit, 
35%), Credit Utilization (30%), Length of History (15%), New 
Credit (10%), Credit Mix (10%). Each planet pulses when mentioned. 
Score needle moves as positive behaviors are shown. Educational 
solar system metaphor, clean 3D renders, NASA infographic style."

PROMPT 017: Tax Bracket Explanation
"Animated staircase with 7 steps (tax brackets). A character 
earning money climbs the stairs. Only the money on each new step 
is taxed at that step's rate, not all previous money. Clear 
visual showing marginal vs effective tax rate. Helpful friendly 
guide character explains. Bright colors, approachable educational 
style, Khan Academy meets Pixar."

PROMPT 018: Dollar Cost Averaging Demo
"Calendar flips through months. Each month, same dollar amount 
buys shares of a fluctuating stock. When price is high, fewer 
shares. When price is low, more shares. At end, show average cost 
per share vs lump sum timing risk. Smooth graph overlay showing 
the strategy's benefit. Clean motion graphics, financial education 
aesthetic."

PROMPT 019: Asset vs Liability Explanation
"Two columns appear. Left column 'ASSETS': arrows point inward 
bringing money (rental property, dividend stocks, bonds). Right 
column 'LIABILITIES': arrows point outward taking money (car loan, 
credit card debt, expensive subscriptions). Character moves items 
between columns making smart choices. Robert Kiyosaki Rich Dad 
concept visualized clearly. Simple bold graphics."

PROMPT 020: Inflation Explained Simply
"Grocery cart animation. Year 2020: Cart full of groceries costs 
$100. Fast forward to 2024: Same cart, fewer items, costs $120. 
Fast forward to 2030: Even fewer items, costs $150. Graph in 
background shows purchasing power declining. Gentle educational 
tone, not fear-mongering. Clear visual metaphor everyone 
understands."

═══════════════════════════════════════════════════════════════

CATEGORY 5: HOOKS & ATTENTION GRABBERS
───────────────────────────────────────────────────────────────

PROMPT 021: Shocking Statistic Reveal
"Dark screen. Single spotlight hits center. Giant red numbers 
'78%' slam onto screen with impact shockwave. Numbers crack and 
shatter, revealing full text: '78% of Americans live paycheck to 
paycheck'. Camera pushes in dramatically. Ominous music sting. 
Michael Bay meets financial education. High impact, impossible 
to scroll past."

PROMPT 022: Before/After Money Mindset
"Quick cut montage. BEFORE (rapid cuts): Alarm blaring, traffic 
jam, stressed face, pile of bills, declined credit card, arguing 
couple. AFTER (smooth slow motion): Peaceful wake up, calm commute, 
confident smile, organized finances, approved transaction, happy 
couple. Sharp contrast in pacing and color grading. Powerful 
emotional hook."

PROMPT 023: Time Running Out Urgency
"Hourglass with sand running out fast. Each grain of sand is a 
tiny dollar sign. As sand runs out, text appears: 'Every year you 
wait to invest costs you $XX,XXX'. Clock ticking sound visualized 
as ripples. Urgent but not panic-inducing. Motivational push to 
action. Christopher Nolan time manipulation aesthetic."

PROMPT 024: Secret Revealed Teaser
"Shadowy figure holds glowing orb labeled 'Wealth Secret'. Figure 
slowly reveals: 'It's not what you think...' Orb opens to show 
simple concept (compound interest icon). Light bursts forth 
illuminating everything. Mysterious to enlightening journey. 
Movie trailer quality, dramatic lighting."

PROMPT 025: Pattern Interrupt Hook
"Normal office scene suddenly freezes. Everything turns black and 
white except one element (stack of money) which stays in color. 
Text appears: 'Everything you know about money is wrong.' Freeze 
frame shatters like glass, revealing new colorful world. Creative 
pattern interrupt, Matrix-style reality shift."

═══════════════════════════════════════════════════════════════

CATEGORY 6: CALL TO ACTION & END SCREENS
───────────────────────────────────────────────────────────────

PROMPT 026: Subscribe Button Animation
"Giant red YouTube subscribe button floats in space. Cursor clicks 
it. Button transforms to gray 'Subscribed' with checkmark. Bell 
icon appears next to it, cursor clicks bell, bell animates ringing 
with visible sound waves. Confetti explosion. Text: 'Join 100K+ 
smart investors!' Clean 3D render, satisfying click animations, 
ASMR-worthy feedback."

PROMPT 027: Next Video Teaser
"Film strip unrolls showing quick 1-second clips from next video: 
someone gasping in surprise, money raining down, dramatic graph 
spike, 'YOU WON'T BELIEVE THIS' text flash. Film strip burns away 
to reveal premiere date/time. Movie trailer aesthetic, building 
anticipation."

PROMPT 028: Resource Link Highlight
"Laptop screen shows description box. Mouse scrolls to links 
section. Each link glows as mouse hovers: 'Free Budget Template', 
'Investment Platform', 'Recommended Books'. Click animation on 
each. Clean screen recording style with enhanced UI elements."

PROMPT 029: Community Invitation
"Door opens to reveal bustling community space. People helping 
each other, sharing wins, celebrating milestones. Text: 'Join our 
free community of 50,000+ members building wealth together.' Warm 
inviting atmosphere, diverse group, supportive vibes. 3D animation 
style."

PROMPT 030: Series Continuity
"Recap montage of previous episodes in series (quick 0.5 second 
clips each). Then preview of upcoming episodes (mysterious silhouettes 
with titles). Timeline graphic showing viewer is on a journey. 
Text: 'This is just the beginning.' Epic series feel, Marvel 
cinematic universe style."

═══════════════════════════════════════════════════════════════

CATEGORY 7: B-ROLL ENHANCEMENTS
───────────────────────────────────────────────────────────────

PROMPT 031: Money Counting Cinematic
"Extreme close-up macro shot of hands counting hundred dollar 
bills. Slow motion. Each bill flip creates subtle sparkle. Shallow 
depth of field. Warm golden lighting. Satisfying tactile quality. 
Shot on RED camera, luxury commercial aesthetic."

PROMPT 032: City Timelapse Prosperity
"Hyper-lapse through major financial district (NYC, London, Tokyo). 
Skyscrapers gleaming, traffic flowing, people moving purposefully. 
Sunrise to sunset transition showing opportunity. Tilt-shift effect 
for miniature feel. Inspiring and ambitious mood."

PROMPT 033: Technology Finance Interface
"Futuristic holographic interface showing portfolio performance. 
Finger swipes through charts, taps to drill down, pinches to zoom. 
Data flows like water. Sci-fi meets practical finance. Minority 
Report style but usable today. Blue and green data colors."

PROMPT 034: Coffee Shop Productivity
"Aesthetic overhead shot of productive workspace: laptop showing 
investment research, notebook with financial goals, coffee cup, 
plant. Hands typing, writing, calculating. Cozy productive vibe. 
Instagram-worthy flatlay, warm natural lighting."

PROMPT 035: Celebration Win Moment
"Person receives notification on phone, eyes go wide, huge smile, 
fist pump. Quick cut to telling partner/family, group celebration. 
Genuine joy and relief. Authentic emotional moment, documentary 
style cinematography."

═══════════════════════════════════════════════════════════════

ADVANCED PROMPT ENGINEERING TIPS:
───────────────────────────────────────────────────────────────

1. BE SPECIFIC ABOUT STYLE:
   Instead of "make a graph"
   Say: "Create a sleek animated line graph on dark background 
   with neon accents, modern fintech aesthetic, 4k resolution"

2. DEFINE CAMERA MOVEMENT:
   Add: "Slow push-in", "Orbiting shot", "Top-down view", 
   "Tracking shot following the action"

3. SET THE MOOD:
   Include: "Inspiring and aspirational", "Urgent but not 
   panic-inducing", "Warm and inviting", "Professional and 
   trustworthy"

4. SPECIFY LIGHTING:
   Mention: "Golden hour lighting", "Dramatic chiaroscuro", 
   "Soft diffused light", "Neon cyberpunk glow"

5. REFERENCE KNOWN STYLES:
   Compare to: "Pixar animation style", "Bloomberg terminal 
   aesthetic", "Apple keynote presentation", "Netflix documentary 
   cinematography"

6. INCLUDE TECHNICAL SPECS:
   Request: "4k resolution", "60fps smooth motion", "HDR color", 
   "10 second duration", "Seamless loop"

7. ITERATE AND REFINE:
   First prompt rarely perfect. Generate, review, adjust specifics, 
   regenerate. Keep what works, modify what doesn't.

═══════════════════════════════════════════════════════════════

NEGATIVE PROMPTS (WHAT TO AVOID):
───────────────────────────────────────────────────────────────

Add these to avoid common AI video issues:
"no distorted faces, no morphing artifacts, no flickering, 
no inconsistent lighting, no blurry text, no warped objects, 
no sudden jumps, no low resolution, no cartoonish unless specified, 
no copyright logos, no brand names unless requested"

═══════════════════════════════════════════════════════════════
"""
    return prompts


def main():
    # Generate all files
    production_guide = generate_production_guide()
    asset_list = generate_asset_list()
    ai_prompts = generate_ai_prompts_file()
    
    # Write files
    with open("production_guide.txt", "w", encoding="utf-8") as f:
        f.write(production_guide)
    print("✓ Created: production_guide.txt")
    
    with open("asset_list.txt", "w", encoding="utf-8") as f:
        f.write(asset_list)
    print("✓ Created: asset_list.txt")
    
    with open("ai_video_prompts.txt", "w", encoding="utf-8") as f:
        f.write(ai_prompts)
    print("✓ Created: ai_video_prompts.txt")
    
    print("\n" + "="*60)
    print("ALL PRODUCTION FILES GENERATED SUCCESSFULLY!")
    print("="*60)
    print("\nFiles created:")
    print("  1. production_guide.txt - Complete workflow & checklist")
    print("  2. asset_list.txt - File organization & resources")
    print("  3. ai_video_prompts.txt - 30+ AI video generation prompts")
    print("\nNext steps:")
    print("  - Review production_guide.txt for step-by-step workflow")
    print("  - Organize your folders using asset_list.txt structure")
    print("  - Use ai_video_prompts.txt with Runway, Pika, or HeyGen")
    print("  - Start with Template #1 from the scripts file")
    print("="*60)


if __name__ == "__main__":
    main()
