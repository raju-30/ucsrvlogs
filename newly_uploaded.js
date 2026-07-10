const newlyUploadedVideos = [
  {
    id: 12,
    title: "MAHANANDI AND AHOBILAM - PART 1",
    category: "Devotional",
    series: "MAHANANDI AND AHOBILAM",
    episode: 1,
    totalEpisodes: 2,
    featured: false,
    mostViewed: false,
    views: "65",
    duration: "32:00",
    thumbnail: "https://res.cloudinary.com/dbo0t5d3t/image/upload/v1783421103/MAHANANDI_AHOBILAM_urmx95.jpg",
    youtube: "https://youtu.be/8Z9sj4VZcRE?si=iRU1J5yVCwBAXwEr",
    description: `A group of friends set out on a journey to one of the most sacred places after almost four months since their last trip, which was their industrial tour. This time, the adventure was even more exciting as they visited not one but two beautiful destinations. After weeks of intensive placement training, this trip turned out to be the perfect stress-free getaway, giving everyone a chance to relax, recharge, and create unforgettable memories together.
`,
    dateAdded: "2026-07-07"
  },
  {
    id: 13,
    title: "THE LEGENDARY UGRA STAMBHAM...",
    category: "Adventure",
    series: "MAHANANDI AND AHOBILAM",
    episode: 2,
    totalEpisodes: 2,
    featured: false,
    mostViewed: false,
    views: "2",
    duration: "44:25",
    thumbnail: "https://res.cloudinary.com/dbo0t5d3t/image/upload/v1783422332/TREK-AHOBILAM_n49meu.png",
    youtube: "https://youtu.be/4rvbVtdYRgU?si=U-i-6EHGo3UIG8jc",
    description: `After conquering Kondaveedu on their very first trek, a group of students takes on an even greater challenge—the legendary Ugra Stambham in Ahobilam. As they venture deeper into the rugged Nallamala forests, every step tests their endurance, courage, and friendship. What begins as a second trek transforms into an unforgettable journey of discovery, breathtaking landscapes, and spiritual wonder. More than an adventure, this is the next chapter in their mission to explore the hidden treasures of Ahobilam.`,
    dateAdded: "2026-07-10"
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
