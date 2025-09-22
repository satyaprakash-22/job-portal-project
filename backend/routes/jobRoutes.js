import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.jobs);
});

export default router;
