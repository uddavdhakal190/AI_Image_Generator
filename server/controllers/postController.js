import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const newPost = await Post.create({ name, prompt, photo });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
