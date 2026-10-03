const newlyUploadedVideos = [
  {
    id: 14,
    title: "BANANA JUICE VLOG",
    category: "Food",
    series: "FOOD VLOGS",
    episode: 1,
    totalEpisodes: 1,
    featured: false,
    mostViewed: false,
    views: "20",
    duration: "09:00",
    thumbnail: "https://res.cloudinary.com/dbo0t5d3t/image/upload/v1789656255/BANANA_JUICE_THUBMAAIL_mwtu0k.png",
    youtube: "https://youtu.be/NQQ7vah3CGM?si=BbZ9h5skIsGH6Cnm",
    description: `Prapancha yatrikudu into food vlogs`,
    dateAdded: "2026-09-17"
  },
  {
    id: 15,
    title: "PARADISE REVIEW",
    category: "Reviews",
    series: "MOVIE REVIEWS",
    episode: 1,
    totalEpisodes: 1,
    featured: false,
    mostViewed: false,
    views: "40",
    duration: "5:20",
    thumbnail: "https://res.cloudinary.com/dbo0t5d3t/image/upload/v1791006507/Paradise_review_kgvmqn.png",
    youtube: "https://youtu.be/FMMexZdyPuk?si=mKvEkiClkVAVWBtV",
    description: `Prapancha Yatrikudu gives an in-depth review of the movie Paradise.
Unpacking the storyline, performances, and key cinematic highlights in this engaging video review.
Join the journey as we share honest insights and thoughts on Paradise.`,
    dateAdded: "2026-10-02"
  }
];

// Automatically merge into global videos list if available
if (typeof videos !== 'undefined' && Array.isArray(videos)) {
  videos.push(...newlyUploadedVideos);
}

// Export standard for both ES Modules and script tag inclusion
if (typeof module !== 'undefined' && module.exports) {
  module.exports = newlyUploadedVideos;
}
