const mongoose = require('mongoose');
const Podcast = require('./models/Podcast');
require('dotenv').config();

const seedPodcasts = [
  {
    name: "Spidey-Verse Concept",
    host: "Marvel Universe Studios",
    genre: "Movies",
    description: "Exploring the Spider-Verse timeline, characters, variants, villains, and multiverse theories.",
    coverImage: "https://i.pinimg.com/1200x/ed/7b/f7/ed7bf7bb5afa2b7a739513643b79b5e8.jpg",
    rating: 4.9,
    popularity: 97,
    episodes: [{
      title: "Understanding the Spider-Verse",
      description: "A deep dive into the multiverse concept.",
      audioUrl: "/audio/spidey1.mp3",
      duration: "42:10"
    }]
  },
  {
    name: "Atomic Habits – Book Insights",
    host: "James Clear (Inspired)",
    genre: "Books",
    description: "Breaking down Atomic Habits with real-life applications and practical self-improvement lessons.",
    coverImage: "https://i.pinimg.com/1200x/39/d9/d6/39d9d620d911c59cddd87302a2810bc3.jpg",
    rating: 4.9,
    popularity: 95,
    episodes: [{
      title: "Identity-Based Habits",
      description: "How to build habits that stick.",
      audioUrl: "/audio/atomic1.mp3",
      duration: "29:55"
    }]
  },
  {
    name: "The Zodiac Killer",
    host: "Dark Chronicles Studio",
    genre: "Crime",
    description: "A deep dive into the unsolved mystery of the Zodiac Killer and the psychological profile behind the crimes.",
    coverImage: "https://i.pinimg.com/736x/c5/40/04/c540049f202108097991be84c82d0e55.jpg",
    rating: 4.8,
    popularity: 92,
    episodes: [{
      title: "The Man Who Solved 26/11, Kasaab & Indrani Mukherjee",
      description: "Crime investigation insights.",
      audioUrl: "/audio/zodiac1.mp3",
      duration: "2:38:00"
    }]
  },
  {
    name: "Cinema Talks",
    host: "Film Buffs",
    genre: "Movies",
    description: "Movie reviews, film breakdowns, actor deep dives, and cinema history.",
    coverImage: "https://i.pinimg.com/1200x/63/8c/34/638c344dd3cbb9e4a8724179bdc7de0c.jpg",
    rating: 4.6,
    popularity: 84,
    episodes: [{
      title: "Top Films of 2024",
      description: "Best movies of the year.",
      audioUrl: "/audio/cinema1.mp3",
      duration: "33:08"
    }]
  },
  {
    name: "Messi – The Greatest",
    host: "Football Central",
    genre: "Sports",
    description: "The journey, legacy, and brilliance of Lionel Messi.",
    coverImage: "https://i.pinimg.com/1200x/25/77/e6/2577e681d628ef876bd54974535dc12f.jpg",
    rating: 4.8,
    popularity: 96,
    episodes: [{
      title: "Rise of the GOAT",
      description: "Messi's incredible journey.",
      audioUrl: "/audio/messi1.mp3",
      duration: "48:20"
    }]
  },
  {
    name: "Daily News Now",
    host: "Global Update Team",
    genre: "News",
    description: "Daily updates on world events.",
    coverImage: "https://i.pinimg.com/736x/d6/36/38/d63638f6ee217688c09e893ee23df24d.jpg",
    rating: 4.4,
    popularity: 87,
    episodes: [{
      title: "Today's Global Headlines",
      description: "Current world events.",
      audioUrl: "/audio/news1.mp3",
      duration: "12:33"
    }]
  },
  {
    name: "Laugh Out Loud",
    host: "Comedy Crew",
    genre: "Comedy",
    description: "Funny stories, jokes, and entertainment.",
    coverImage: "https://i.pinimg.com/1200x/6c/04/b6/6c04b64c6a669f60c538265f43c4ec09.jpg",
    rating: 4.5,
    popularity: 90,
    episodes: [{
      title: "Funniest Stories Ever",
      description: "Hilarious comedy content.",
      audioUrl: "/audio/laugh1.mp3",
      duration: "24:12"
    }]
  },
  {
    name: "Stay Disciplined",
    host: "Peak Living",
    genre: "Self Improvement",
    description: "Build habits, discipline, and consistency.",
    coverImage: "https://i.pinimg.com/736x/80/aa/89/80aa8965d695b26756f8efe64fb98fe3.jpg",
    rating: 4.7,
    popularity: 91,
    episodes: [{
      title: "How Discipline Changes Your Life",
      description: "Building lasting discipline.",
      audioUrl: "/audio/discipline1.mp3",
      duration: "27:40"
    }]
  },
  {
    name: "The Greatest TV Shows",
    host: "Screen Masters",
    genre: "Entertainment",
    description: "Ranking the most iconic TV shows.",
    coverImage: "https://i.pinimg.com/736x/95/05/8c/95058c2634ee3f29c899d396d36c703c.jpg",
    rating: 4.6,
    popularity: 89,
    episodes: [{
      title: "Top 10 Shows Ever",
      description: "Best TV shows of all time.",
      audioUrl: "/audio/tv1.mp3",
      duration: "39:50"
    }]
  },
  {
    name: "Wonders of the World",
    host: "Travel Earth",
    genre: "Travel",
    description: "Exploring ancient wonders and mysteries.",
    coverImage: "https://i.pinimg.com/1200x/4c/59/94/4c5994e64c7f9b289a22785683ea3c6b.jpg",
    rating: 4.7,
    popularity: 93,
    episodes: [{
      title: "The Great Pyramid",
      description: "Ancient world wonders.",
      audioUrl: "/audio/wonder1.mp3",
      duration: "31:18"
    }]
  },
  {
    name: "Mindset Mastery",
    host: "Peak Habits",
    genre: "Self Improvement",
    description: "Mental strategies for success.",
    coverImage: "https://i.pinimg.com/1200x/a4/9d/42/a49d42160420f9cb145457b2739ecace.jpg",
    rating: 4.8,
    popularity: 94,
    episodes: [{
      title: "Master Your Thoughts",
      description: "Mental mastery techniques.",
      audioUrl: "/audio/mind1.mp3",
      duration: "26:45"
    }]
  },
  {
    name: "Tech Today",
    host: "Future Talks",
    genre: "Technology",
    description: "AI, software, and future tech insights.",
    coverImage: "https://i.pinimg.com/736x/5b/75/33/5b753352a793859950c930f9909e8495.jpg",
    rating: 4.4,
    popularity: 86,
    episodes: [{
      title: "The Rise of AI",
      description: "Future of artificial intelligence.",
      audioUrl: "/audio/tech1.mp3",
      duration: "27:40"
    }]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Podcast.deleteMany({});
    console.log('Cleared existing podcasts');
    
    await Podcast.insertMany(seedPodcasts);
    console.log('Seeded podcasts successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();