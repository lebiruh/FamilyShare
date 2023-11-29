import express from 'express';
import { searchUser } from '../controllers/user.js';


const router = express.Router();


router.get('/', searchUser);

export default router;