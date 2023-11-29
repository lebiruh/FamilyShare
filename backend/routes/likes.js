import express from 'express';
import { addLike, getLikes } from '../controllers/like.js';

const router = express.Router();


router.get('/:postId', getLikes);
router.post('/:postId', addLike);

export default router;