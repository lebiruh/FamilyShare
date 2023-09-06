import express from 'express';
import { removeLike } from '../controllers/like.js';

const router = express.Router();

router.post('/:postId', removeLike);

export default router;