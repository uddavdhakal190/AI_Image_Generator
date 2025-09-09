// server/routes/postRoutes.js
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import Post from '../models/Post.js';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// POST a new post → generates image via OpenAI + saves to DB
router.post('/', async (req, res) => {
  try {
    const { name, prompt } = req.body;

    if (!name || !prompt) {
      return res.status(400).json({ success: false, message: 'Name and prompt are required' });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ success: false, message: 'OPENAI_API_KEY missing in server config' });
    }

    const result = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const b64 = result?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ success: false, message: 'No image returned from OpenAI' });
    }

    const base64Photo = `data:image/png;base64,${b64}`;

    const newPost = await Post.create({ name, prompt, photo: base64Photo });

    return res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Error creating post:', err?.response?.data || err?.message || err);
    const status = err?.status || err?.response?.status || 500;
    res.status(status).json({ success: false, message: 'Unable to create a post', detail: err?.response?.data || err?.message || 'Unknown error' });
  }
});

export default router;