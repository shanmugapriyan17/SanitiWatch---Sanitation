import express from 'express';
import { Report } from '../models/Report.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/metrics', requireAuth(['manager','admin']), async (_req, res) => {
  const total = await Report.countDocuments();
  const resolved = await Report.countDocuments({ status: 'resolved' });
  const assigned = await Report.countDocuments({ status: 'assigned' });
  const inprog = await Report.countDocuments({ status: 'in_progress' });
  const submitted = await Report.countDocuments({ status: 'submitted' });

  const last7 = await Report.aggregate([
    { $match: { createdAt: { $gte: new Date(Date.now() - 7*24*3600*1000) } } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  res.json({ totals: { total, submitted, assigned, in_progress: inprog, resolved }, timeseries: last7 });
});

export default router;
