// server/controllers/postController.js
import Post from '../models/Post.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return res.status(400).json({
        success: false,
        message: 'Name, prompt, and photo are required'
      });
    }

    const newPost = await Post.create({ name, prompt, photo });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to create post',
      error: error.message
    });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch posts',
      error: error.message
    });
  }
};
