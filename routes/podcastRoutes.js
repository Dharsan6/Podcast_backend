import express from "express";
import Podcast from "../models/Podcast.js";
import User from "../models/User.js";

const router = express.Router();

// get all podcast
router.get("/", async (req, res) => {
  const podcasts = await Podcast.find();
  res.json(podcasts);
});

// get one podcast
router.get("/:id", async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  res.json(podcast);
});

// adding to favs
router.post("/favorite/add", async (req, res) => {
  const { userId, podcastId } = req.body;

  const user = await User.findById(userId);
  if (!user.favorites.includes(podcastId)) {
    user.favorites.push(podcastId);
  }

  await user.save();
  res.json({ message: "Added to favorites" });
});

// remove fav
router.post("/favorite/remove", async (req, res) => {
  const { userId, podcastId } = req.body;

  const user = await User.findById(userId);

  user.favorites = user.favorites.filter(
    (id) => id.toString() !== podcastId
  );

  await user.save();
  res.json({ message: "Removed from favorites" });
});

// list fav
router.get("/favorites/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("favorites");
  res.json(user.favorites);
});

export default router;
