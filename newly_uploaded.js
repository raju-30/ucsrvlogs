const newlyUploadedVideos = [
  {
    id: 6,
    title: "KERALA VLOG-2",
    category: "Adventure",
    series: "KERALA VLOG",
    episode: 2,
    totalEpisodes: 2,
    featured: false,
    mostViewed: false,
    views: "103",
    duration: "35:58",
    thumbnail: "https://res.cloudinary.com/dbo0t5d3t/image/upload/v1781935226/KERALA-THUMBNAIL-2_ethwnm.png",
    youtube: "https://youtu.be/7c3cawnp8QY",
    description: `For the first time, our entire CSE branch went on a trip outside the state.
It was filled with laughter, memories, fights, photos, unexpected moments, and beautiful places that amazed everyone.
Every moment became a memory.
And when the trip finally came to an end...
We realized that some journeys are never forgotten.
`,
    dateAdded: "2026-03-07"
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
