import express from 'express';
import { generateImage } from '../controllers/dalleController.js';

const router = express.Router();

router.post('/generate-image', generateImage);

router.get('/', (req, res) => res.send('Dalle route accessible'));

export default router;
