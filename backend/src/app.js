import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import reportRoutes from './routes/reports.js';
import uploadRoutes from './routes/uploads.js';
import dashboardRoutes from './routes/dashboard.js';
import assignmentRoutes from './routes/assignments.js';
import { rateLimiter } from './middleware/rateLimit.js';

dotenv.config();
const app = express();

const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', rateLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assignments', assignmentRoutes);

// Static uploads (disk mode)
import { uploadsDir } from './storage/disk.js';
app.use('/uploads', express.static(uploadsDir));

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

export default app;
