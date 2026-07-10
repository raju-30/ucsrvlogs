// Main Landing Page Controller

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
  // Hide loader
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 400);
    }, 400);
  }

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

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Ripple Effect on Buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
      const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
      
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      
      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');
      
      const ripple = button.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
    }
  });

  // Helper: Extract YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return '';
    let id = '';
    if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      id = url.split('v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      id = url.split('embed/')[1].split('?')[0];
    }
    return id;
  };

  // Load Hero Banner (Featured Video)
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    const featuredVideo = videos.find(v => v.featured) || videos[0];
    if (featuredVideo) {
      const isYoutube = featuredVideo.youtube && (featuredVideo.youtube.includes('youtube.com') || featuredVideo.youtube.includes('youtu.be'));
      const ytId = isYoutube ? getYoutubeId(featuredVideo.youtube) : '';
      
      const heroBgHTML = isYoutube
        ? `<iframe 
            src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&enablejsapi=1" 
            frameborder="0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen
            style="width: 100%; height: 100%; object-fit: cover; border: none; transform: scale(1.15); pointer-events: none;">
           </iframe>`
        : `<img src="${featuredVideo.thumbnail}" alt="${featuredVideo.title}">`;

      heroSection.innerHTML = `
        <div class="hero-bg">
          ${heroBgHTML}
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="hero-badge"><i class="fas fa-crown"></i> Featured vlog</span>
          <h1 class="hero-title">${featuredVideo.title}</h1>
          <div class="hero-meta">
            <span class="hero-meta-category"><i class="fas fa-folder"></i> ${featuredVideo.category}</span>
            <span><i class="far fa-eye"></i> ${featuredVideo.views} views</span>
            <span><i class="far fa-clock"></i> ${featuredVideo.duration}</span>
          </div>
          <p class="hero-desc">${featuredVideo.description}</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" id="hero-play-btn">
              <i class="fas fa-play"></i> Watch Now
            </button>
            <button class="btn btn-secondary" onclick="location.href='watch.html?id=${featuredVideo.id}'">
              <i class="fas fa-info-circle"></i> More Info
            </button>
          </div>
        </div>
      `;

      // Set up Play action on Hero (Open YouTube in new tab & record in Continue Watching)
      document.getElementById('hero-play-btn').addEventListener('click', () => {
        addToContinueWatching(featuredVideo.id);
        window.open(featuredVideo.youtube, '_blank');
      });
    }
  }

  // Helper: Card Generator
  const generateCardHTML = (video) => {
    const isUploadingSoon = video.views === 'Uploading Soon';
    const badgeText = isUploadingSoon ? 'Soon' : (video.episode ? `E${video.episode}` : '');
    const badgeHTML = badgeText ? `<span class="card-badge" style="${isUploadingSoon ? 'background-color: #f39c12;' : ''}">${badgeText}</span>` : '';
    const playBtnHTML = isUploadingSoon ? '<i class="fas fa-clock"></i>' : '<i class="fas fa-play"></i>';
    const viewsHTML = isUploadingSoon 
      ? `<span><i class="fas fa-clock"></i> Uploading Soon</span>`
      : `<span class="card-meta-views"><i class="far fa-eye"></i> ${video.views}</span>`;
    const durationHTML = (isUploadingSoon || !video.duration)
      ? ''
      : `<span class="card-meta-duration"><i class="far fa-clock"></i> ${video.duration}</span>`;
    
    return `
      <div class="video-card ${isUploadingSoon ? 'soon-card' : ''}" onclick="location.href='watch.html?id=${video.id}'">
        <div class="video-card-inner">
          <div class="card-img-wrapper">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
          </div>
          <div class="card-play-btn">
            ${playBtnHTML}
          </div>
          ${badgeHTML}
          <div class="card-info-overlay">
            <h3 class="card-title">${video.title}</h3>
            <div class="card-meta">
              <span class="card-meta-category">${video.category}</span>
              ${viewsHTML}
              ${durationHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Helper: Row Generator
  const renderRow = (sectionId, title, icon, videoList) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement || videoList.length === 0) {
      if (targetElement) targetElement.style.display = 'none';
      return;
    }

    targetElement.style.display = 'block';
    targetElement.innerHTML = `
      <div class="category-header">
        <h2 class="category-title">${icon ? icon + ' ' : ''}${title}</h2>
      </div>
      <div class="slider-container-wrapper">
        <button class="slider-arrow slider-arrow-left"><i class="fas fa-chevron-left"></i></button>
        <div class="slider-container">
          ${videoList.map(v => generateCardHTML(v)).join('')}
        </div>
        <button class="slider-arrow slider-arrow-right"><i class="fas fa-chevron-right"></i></button>
      </div>
    `;
  };

  // Render Rows
  
  // Newly Uploaded (from newlyUploadedVideos array if defined)
  if (typeof newlyUploadedVideos !== 'undefined') {
    renderRow('newly-uploaded-section', 'Newly Uploaded', '', newlyUploadedVideos);
  }

  // 1. Most Watched (mostViewed: true)
  const mostWatched = videos.filter(v => v.mostViewed);
  renderRow('most-watched-section', 'Most Watched', '', mostWatched);

  // 2. Devotional
  const devotional = videos.filter(v => v.category === 'Devotional');
  renderRow('devotional-section', 'Devotional', '', devotional);

  // 3. Adventure
  const adventure = videos.filter(v => v.category === 'Adventure');
  renderRow('adventure-section', 'Adventure', '', adventure);

  // 4. Short Films
  const shortFilms = videos.filter(v => v.category === 'Short Films');
  renderRow('short-films-section', 'Short Films', '', shortFilms);

  // 5. Timepass
  const timepass = videos.filter(v => v.category === 'Timepass');
  renderRow('timepass-section', 'Timepass', '', timepass);

  // Initialize Sliders Scroll controls
  if (typeof window.initSliders === 'function') {
    window.initSliders();
  }

  // Scroll Fade-in Intersection Observer
  const fadeSections = document.querySelectorAll('.fade-in-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeSections.forEach(section => {
      observer.observe(section);
    });
  } else {
    // Fallback for older browsers
    fadeSections.forEach(section => section.classList.add('is-visible'));
  }
});
