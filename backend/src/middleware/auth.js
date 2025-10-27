import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export function requireAuth(roles = []) {
  return async function(req, res, next) {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      if (!token) return res.status(401).json({ error: 'Missing token' });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id);
      if (!user) return res.status(401).json({ error: 'User not found' });
      if (roles.length && !roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    } catch (e) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}
