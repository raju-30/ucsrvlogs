// Live Search Feature Overlay
function initSearch() {
  const searchBtn = document.querySelector('.search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');

  if (!searchBtn || !searchOverlay || !searchCloseBtn || !searchInput || !searchResultsGrid) return;

  // Open search overlay
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll behind
    setTimeout(() => searchInput.focus(), 100);
  });

  // Close search overlay
  const closeSearch = () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scroll
    searchInput.value = '';
    searchResultsGrid.innerHTML = '';
  };

  searchCloseBtn.addEventListener('click', closeSearch);

  // Close search on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Helper function to build a video card HTML string
  const createVideoCardHTML = (video) => {
    const isUploadingSoon = video.views === 'Uploading Soon';
    const badgeText = isUploadingSoon ? 'Soon' : (video.episode ? `E${video.episode}/${video.totalEpisodes || ''}` : '');
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

  // Perform search
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
      searchResultsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
          Type to search vlogs by title, category, or description...
        </div>
      `;
      return;
    }

    // Filter videos by title, category, or description
    const filteredVideos = videos.filter(video => {
      return (
        video.title.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
    });

    if (filteredVideos.length === 0) {
      searchResultsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
          No matches found for "${e.target.value}"
        </div>
      `;
      return;
    }

    // Render results
    searchResultsGrid.innerHTML = filteredVideos.map(video => createVideoCardHTML(video)).join('');
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initSearch);
