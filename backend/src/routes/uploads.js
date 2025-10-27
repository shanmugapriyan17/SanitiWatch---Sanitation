import express from 'express';
import { diskUpload } from '../storage/disk.js';
import { cloudUpload } from '../storage/cloudinary.js';

const router = express.Router();
const provider = (process.env.UPLOAD_PROVIDER || 'disk').toLowerCase();

const handler = provider === 'cloudinary' ? cloudUpload.single('file') : diskUpload.single('file');

router.post('/', handler, (req, res) => {
  const url = req.file?.path || (req.file ? `/uploads/${req.file.filename}` : null);
  if (!url) return res.status(400).json({ error: 'Upload failed' });
  res.json({ url });
});

export default router;
