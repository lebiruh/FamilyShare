import express from 'express';
import { addComment, getComments } from '../controllers/comment.js';

const router = express.Router();


router.get('/:postId', getComments);
router.post('/:postId', addComment);

export default router;