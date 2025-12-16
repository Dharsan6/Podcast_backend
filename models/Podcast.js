const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  audioUrl: String,
  duration: String,
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  coverImage: String,
  rating: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    default: 0
  },
  episodes: [episodeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Podcast', podcastSchema);