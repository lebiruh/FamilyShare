import express from 'express';
import { getFamily } from '../controllers/getFamily.js';

const router = express.Router();


router.get('/:userId', getFamily);


export default router;