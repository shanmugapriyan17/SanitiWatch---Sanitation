import express from 'express';
import Joi from 'joi';
import { Assignment } from '../models/Assignment.js';
import { Report } from '../models/Report.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth(['manager','admin']), async (req, res) => {
  const schema = Joi.object({
    reportId: Joi.string().required(),
    workerId: Joi.string().required()
  });
  const payload = await schema.validateAsync(req.body);
  const a = await Assignment.create(payload);
  const r = await Report.findById(payload.reportId);
  if (r) {
    r.assignedTo = payload.workerId;
    r.status = 'assigned';
    r.history.push({ status: 'assigned', actor: req.user.email });
    await r.save();
  }
  res.json(a);
});

router.get('/mine', requireAuth(['worker']), async (req, res) => {
  const items = await Assignment.find({ workerId: req.user._id }).sort({ assignedAt: -1 });
  res.json({ items });
});

export default router;
