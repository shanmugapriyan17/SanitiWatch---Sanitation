import express from 'express';
import Joi from 'joi';
import { Report } from '../models/Report.js';
import { requireAuth } from '../middleware/auth.js';
import { scoreUrgency } from '../ml/urgency.js';

const router = express.Router();

router.post('/', requireAuth(['citizen','worker','manager','admin']), async (req, res) => {
  const schema = Joi.object({
    description: Joi.string().allow(''),
    category: Joi.string().valid('overflow','illegal_dump','stagnant_water','e_waste','other').default('other'),
    anonymous: Joi.boolean().default(false),
    location: Joi.object({ lat: Joi.number(), lng: Joi.number(), address: Joi.string().allow('') }),
    mediaUrls: Joi.array().items(Joi.string().uri())
  });
  try {
    const payload = await schema.validateAsync(req.body, { allowUnknown: true });
    const urgencyScore = scoreUrgency({ category: payload.category, createdAt: new Date(), location: payload.location });
    const report = await Report.create({
      ...payload,
      userId: req.user._id,
      urgencyScore,
      history: [{ status: 'submitted', actor: req.user.email }]
    });
    res.json({ reportId: report._id, report });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', requireAuth(['worker','manager','admin']), async (req, res) => {
  const { status, category, page = 1, limit = 20 } = req.query;
  const q = {};
  if (status) q.status = status;
  if (category) q.category = category;
  const skip = (parseInt(page)-1) * parseInt(limit);
  const items = await Report.find(q).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  const count = await Report.countDocuments(q);
  res.json({ items, total: count });
});

router.get('/:id', requireAuth(['citizen','worker','manager','admin']), async (req, res) => {
  const r = await Report.findById(req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  if (req.user.role === 'citizen' && String(r.userId) !== String(req.user._id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(r);
});

router.put('/:id/status', requireAuth(['worker','manager','admin']), async (req, res) => {
  const schema = Joi.object({
    status: Joi.string().valid('assigned','in_progress','resolved','rejected').required(),
    assignedTo: Joi.string().optional()
  });
  try {
    const payload = await schema.validateAsync(req.body);
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Not found' });
    if (payload.assignedTo) r.assignedTo = payload.assignedTo;
    r.status = payload.status;
    r.history.push({ status: payload.status, actor: req.user.email });
    if (payload.status === 'resolved') r.resolvedAt = new Date();
    await r.save();
    res.json(r);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
