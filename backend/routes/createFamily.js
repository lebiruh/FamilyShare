import express from 'express';
import { createFamily } from '../controllers/createFamily.js';

const router = express.Router();

router.post('/:userId', createFamily);

export default router;