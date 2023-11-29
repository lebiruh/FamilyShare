import express from 'express';
import { getPosts, addPost } from '../controllers/post.js';

const router = express.Router();


router.get('/:familyId', getPosts);
router.post('/:familyId', addPost);

export default router;