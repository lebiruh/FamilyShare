import express from 'express';

const router = express.Router();


router.get('/test', (req, res) => {
  res.send("Hello, world from comments!");
});

export default router;