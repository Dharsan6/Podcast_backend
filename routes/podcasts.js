const express = require('express');
const Podcast = require('../models/Podcast');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all podcasts
router.get('/', async (req, res) => {
  try {
    const { search, genre, sortBy } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { host: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    let podcasts = await Podcast.find(query);

    // Sort
    if (sortBy === 'rating') {
      podcasts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      podcasts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'newest') {
      podcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single podcast
router.get('/:id', async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create podcast (protected)
router.post('/', auth, async (req, res) => {
  try {
    const podcast = new Podcast(req.body);
    await podcast.save();
    res.status(201).json(podcast);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;