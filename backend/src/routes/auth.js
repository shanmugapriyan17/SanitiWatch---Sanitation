import express from 'express';
import Joi from 'joi';
import { User } from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('citizen','worker','manager','admin').default('citizen')
    });
    const payload = await schema.validateAsync(req.body);
    const exists = await User.findOne({ email: payload.email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const user = await User.create(payload);
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export default router;
