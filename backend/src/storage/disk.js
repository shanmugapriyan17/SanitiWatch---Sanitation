import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'_'))
});

export const diskUpload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
