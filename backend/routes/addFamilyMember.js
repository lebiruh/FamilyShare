import express from 'express';
import { addFamilyMember } from '../controllers/addFamilyMember.js';

const router = express.Router();


router.post('/:familyId', addFamilyMember);


export default router;