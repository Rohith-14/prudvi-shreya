# 💒 Prudvi & Shreya Wedding Invitation

A beautiful, interactive wedding invitation website with animations, countdown timer, and event details.

## ✨ Features

- **Elegant Envelope Animation** - Interactive opening animation to reveal the invitation
- **Countdown Timer** - Live countdown with flip animation to the wedding day (Feb 26, 2026)
- **Wedding Events** - Complete schedule of all wedding ceremonies with locations
- **Photo Gallery** - Lightbox gallery showcasing beautiful moments
- **Background Music** - Ambient music player with mute/unmute option
- **Photo Sharing** - Guests can upload their photos to a shared Google Drive album
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Google Calendar Integration** - One-click "Save the Date" functionality

## 🎨 Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Animations and styling (with media queries for responsiveness)
- **JavaScript** - Interactive features
- **Vercel** - Hosting and continuous deployment

## 🚀 Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Rohith-14/prudvi-shreya.git

# Navigate to project directory
cd prudvi-shreya

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## 📦 Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

This project is deployed on Vercel with automatic deployments enabled. Every push to the `main` branch triggers a new deployment.

**Live Site:** [prudvi-shreya.vercel.app](https://prudvi-shreya.vercel.app)

## 📂 Project Structure

```
prudvi-shreya/
├── public/
│   ├── images/              # Wedding photos
│   └── The Walkmen - Heaven.mp3  # Background music
├── src/
│   ├── App.jsx             # Main component
│   ├── App.css             # Styling
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Components

- **Envelope Animation** - Interactive mail opening effect
- **FlipUnit Component** - Countdown timer with flip animation
- **Hero Section** - Main invitation with floating particles
- **Gallery Section** - Photo lightbox
- **Events Section** - Wedding schedule with map links
- **Share Photos Section** - Google Drive integration
- **Audio Player** - Background music with controls

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 481px - 1024px
- Mobile: < 480px
- Small Mobile: < 360px
- Landscape: Height < 700px

## 🎵 Features in Detail

### Background Music
- Auto-plays when content loads (starts at 0:15)
- Loops continuously
- Mute/unmute button in top-right corner
- Graceful fallback if autoplay is blocked by browser

### Countdown Timer
- Counts down to Feb 26, 2026 at 11:38 AM IST
- Smooth flip animation on number changes
- Shows "Happily ever after begins now!" when countdown ends
- Confetti animation on completion

### Photo Sharing
- Direct link to Google Drive shared folder
- Guests can upload photos from their devices
- Mobile-optimized upload experience

## 👨‍💻 Developer

Developed with ♥ by [Rohith Neralla](https://www.linkedin.com/in/rohith-neralla)

## 📄 License

This project is created for personal use for Prudvi & Shreya's wedding.

---

Made with love for Prudvi & Shreya's special day 💕
