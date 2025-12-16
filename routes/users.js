const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to favorites
router.post('/favorites/:podcastId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.favorites.includes(req.params.podcastId)) {
      user.favorites.push(req.params.podcastId);
      await user.save();
    }
    
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from favorites
router.delete('/favorites/:podcastId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.podcastId
    );
    await user.save();
    
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;