import express from 'express';
import { html } from '../utils/html';
const router = express.Router();

router.route('/').get((req: any, res: any) => {
  res.type('html').send(html);
});

export default router;
