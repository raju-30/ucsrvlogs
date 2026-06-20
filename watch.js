// Watch Page Controller

// Function to add a video to the Continue Watching list in localStorage
function addToContinueWatching(videoId) {
  let continueList = JSON.parse(localStorage.getItem('continueWatching')) || [];
  
  // Remove if already exists to move to the front of the list
  continueList = continueList.filter(id => id !== videoId);
  
  // Add to the beginning
  continueList.unshift(videoId);
  
  // Limit to 10 items
  if (continueList.length > 10) {
    continueList.pop();
  }
  
  localStorage.setItem('continueWatching', JSON.stringify(continueList));
}

document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Parse URL ID
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = parseInt(urlParams.get('id'));

  if (isNaN(videoId)) {
    // If invalid ID, redirect to home
    window.location.href = 'index.html';
    return;
  }

  // Find video in videos data
  const currentVideo = videos.find(v => v.id === videoId);

  if (!currentVideo) {
    // If video not found, redirect to home
    window.location.href = 'index.html';
    return;
  }

  // Add immediately to Continue Watching
  addToContinueWatching(currentVideo.id);

  // Update Page Title
  document.title = `${currentVideo.title} - Watch Vlog | UCSR Vlogs`;

  // Hydrate Player Simulator
  const playerContainer = document.getElementById('player-container');
  if (playerContainer) {
    playerContainer.innerHTML = `
      <div class="player-simulator" id="play-trigger">
        <img src="${currentVideo.thumbnail}" alt="${currentVideo.title}" class="player-poster">
        <div class="player-overlay">
          <div class="player-play-btn">
            <i class="fas fa-play"></i>
          </div>
        </div>
      </div>
    `;

    document.getElementById('play-trigger').addEventListener('click', () => {
      window.open(currentVideo.youtube, '_blank');
    });
  }

  // Hydrate Details Information
  const detailsContainer = document.getElementById('details-container');
  if (detailsContainer) {
    const seriesLabel = currentVideo.series 
      ? `<div class="video-series-title">${currentVideo.series}</div>`
      : `<div class="video-series-title">${currentVideo.category} Vlog</div>`;
    
    const episodeBadge = currentVideo.episode 
      ? `<span class="meta-badge">Episode ${currentVideo.episode} of ${currentVideo.totalEpisodes}</span>`
      : '';

    detailsContainer.innerHTML = `
      <div class="watch-info">
        ${seriesLabel}
        <h1 class="video-detail-title">${currentVideo.title}</h1>
        <div class="video-detail-meta">
          <span class="meta-badge">${currentVideo.category}</span>
          ${episodeBadge}
          <span><i class="far fa-eye"></i> ${currentVideo.views} views</span>
          <span><i class="far fa-clock"></i> ${currentVideo.duration}</span>
          <span><i class="far fa-calendar-alt"></i> ${currentVideo.dateAdded}</span>
        </div>
        <p class="video-detail-desc">${currentVideo.description}</p>
        <div class="watch-actions">
          <button class="btn btn-primary" id="watch-now-btn" style="padding: 14px 35px; font-size: 16px;">
            <i class="fas fa-external-link-alt"></i> Watch on YouTube
          </button>
        </div>
      </div>
    `;

    document.getElementById('watch-now-btn').addEventListener('click', () => {
      window.open(currentVideo.youtube, '_blank');
    });
  }

  // Hydrate Episodes List if series is present
  const episodesSection = document.getElementById('episodes-section');
  const episodesList = document.getElementById('episodes-list');

  if (currentVideo.series && episodesSection && episodesList) {
    // Find all episodes in this series
    const seriesEpisodes = videos
      .filter(v => v.series === currentVideo.series)
      .sort((a, b) => a.episode - b.episode);

    if (seriesEpisodes.length > 1) {
      episodesSection.style.display = 'block';
      episodesList.innerHTML = seriesEpisodes.map(ep => {
        const isActive = ep.id === currentVideo.id ? 'active' : '';
        const playBtnHTML = ep.id === currentVideo.id 
          ? `<i class="fas fa-volume-up" style="color: var(--accent-color);"></i>`
          : `<i class="fas fa-play"></i>`;

        return `
          <div class="episode-item ${isActive}" onclick="location.href='watch.html?id=${ep.id}'">
            <div class="episode-num">
              ${ep.id === currentVideo.id ? 'NOW PLAYING' : 'EPISODE ' + ep.episode}
            </div>
            <div class="episode-thumbnail">
              <img src="${ep.thumbnail}" alt="${ep.title}">
              <div class="episode-play-icon">${playBtnHTML}</div>
            </div>
            <div class="episode-title">${ep.title}</div>
            <div class="episode-duration">
              <i class="far fa-clock"></i> ${ep.duration}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Generate Card HTML helper for recommendations
  const generateCardHTML = (video) => {
    const badgeText = video.episode ? `E${video.episode}` : '';
    const badgeHTML = badgeText ? `<span class="card-badge">${badgeText}</span>` : '';
    
    return `
      <div class="video-card" onclick="location.href='watch.html?id=${video.id}'">
        <div class="video-card-inner">
          <div class="card-img-wrapper">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
          </div>
          <div class="card-play-btn">
            <i class="fas fa-play"></i>
          </div>
          ${badgeHTML}
          <div class="card-info-overlay">
            <h3 class="card-title">${video.title}</h3>
            <div class="card-meta">
              <span class="card-meta-category">${video.category}</span>
              <span class="card-meta-views"><i class="far fa-eye"></i> ${video.views}</span>
              <span class="card-meta-duration"><i class="far fa-clock"></i> ${video.duration}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Hydrate "More Like This" Recommendations (same category, excluding current)
  const moreLikeThisGrid = document.getElementById('more-like-this-grid');
  if (moreLikeThisGrid) {
    const matchingVideos = videos.filter(v => v.category === currentVideo.category && v.id !== currentVideo.id);

    if (matchingVideos.length > 0) {
      moreLikeThisGrid.innerHTML = matchingVideos
        .slice(0, 4) // Show maximum of 4
        .map(v => generateCardHTML(v))
        .join('');
    } else {
      document.getElementById('more-like-this-section').style.display = 'none';
    }
  }

  // Hydrate "Watch More" Recommendations (randomised from other categories)
  const watchMoreGrid = document.getElementById('watch-more-grid');
  if (watchMoreGrid) {
    const otherVideos = videos.filter(v => v.category !== currentVideo.category && v.id !== currentVideo.id);

    if (otherVideos.length > 0) {
      // Shuffle otherVideos using Fisher-Yates algorithm
      const shuffled = [...otherVideos];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      watchMoreGrid.innerHTML = shuffled
        .slice(0, 4) // Show 4 random ones
        .map(v => generateCardHTML(v))
        .join('');
    } else {
      document.getElementById('watch-more-section').style.display = 'none';
    }
  }

  // Hide loader spinner
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 400);
    }, 400);
  }
});
