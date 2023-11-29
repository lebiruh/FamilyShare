import express from 'express';
import { deletePost } from '../controllers/post.js';

const router = express.Router();


// router.get('/:familyId', getPosts);
router.delete('/:postId', deletePost);

export default router;