# UCSR Vlogs - Premium Netflix-Inspired Vlogs OTT Website

UCSR Vlogs is a premium, modern, production-quality video streaming website styled in a dark Netflix-inspired layout. Designed for high fidelity and visual wow factor, the platform is built from scratch using only vanilla HTML, CSS, and JavaScript.

## 🚀 Key Features

* **Premium Theme**: Dark HSL tailored color palette (`#0f0f0f` background, `#181818` card background, and `#E50914` Netflix accent) with smooth transitions, modern typography (Outfit + Inter), and custom responsive typography.
* **Glassmorphic Navigation Bar**: Translucent top menu bar that blends smoothly with the backdrop and transitions to solid opaque with blur filter detection on scroll. Fully responsive menu toggle on mobile devices.
* **Cinematic Featured Hero**: Auto-hydrates the featured banner with animated zoom keyframes, views counts, metadata badges, and prominent watch links.
* **Continue Watching Row**: Uses browser `localStorage` to check previously opened vlogs and dynamically renders them in a continuation row, which hides itself if no history exists.
* **Dynamic Horizontal Sliders**: Touch-swipe scroll snaps for mobile/tablets and custom smooth scrolling button controls on desktop. Auto-hides arrows when content fits.
* **Premium Hover Cards**: Video cards scale up, glow with accent outlines, and fade in hover details (including a custom Play icon, category text, view counters, and durations) smoothly on cursor focus.
* **Instant Live Search Overlay**: Opens full-screen glassmorphic search overlay focusing keyboard input immediately. Filters titles, descriptions, and categories dynamically as the user types.
* **Watch details page (`watch.html`)**: Focuses on video metadata, YouTube play triggers, and custom dynamic components:
  * *Series Episode Picker*: Renders a list of all episodes in a series, highlights the active episode, and updates the watch frame upon selection.
  * *More Like This*: Relies on category classification to automatically match and suggest related content.
  * *Watch More*: Suggests randomized, shuffled selections from alternate categories to increase user engagement.
* **Production Polish**: Section scroll fade-ins via the Intersection Observer API, CSS button ripple effect listeners, lazy-loading thumbnail attributes, and global CSS parameters.

---

## 📁 Project Structure

```text
/
├── index.html          # Main landing / browse page
├── watch.html          # Video detail page with series & recommendation modules
├── README.md           # Documentation
├── style.css           # Core layout styles, variables, transitions, and overlays
├── watch.css           # Watch page layout, episode listings, and grids
├── responsive.css      # Mobile and tablet screen size overrides
├── videos.js           # Central static data repository for the vlogs collection
├── newly_uploaded.js   # Dynamic newly uploaded videos registry
├── app.js              # Controller for index.html (dynamic data injection, headers, local storage)
├── watch.js            # Controller for watch.html (parameters parsing, recommendations)
├── search.js           # Live search query overlay engine
└── slider.js           # Horizontal row slider and arrow control handler
```

---

## 🛠️ Data Scheme

Vlog items inside [videos.js](file:///t:/UCSR%20CODES/HTML/vlogs-2/videos.js) adhere to the following schema:
```javascript
{
  id: 1,
  title: "Chasing the Himalayan Sun",
  category: "Adventure",
  series: "Himalayan Quest",
  episode: 1,
  totalEpisodes: 3,
  featured: true,
  mostViewed: true,
  views: "2.8M",
  duration: "18:45",
  thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  youtube: "https://www.youtube.com/watch?v=nOpl71sY_C8",
  description: "Embark on an epic journey...",
  dateAdded: "2026-06-18"
}
```

---

## 💻 Running the Project Locally

The website does not require heavy build setups or node package installations. Simply run a local development web server to handle local storage parameters and relative watch queries:

### Option A: Python HTTP Server (Recommended)
From the root workspace directory, run:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option B: Node.js (http-server)
Install and run a static server:
```bash
npx http-server ./ -p 8000
```
Then navigate to `http://localhost:8000` in your web browser.
