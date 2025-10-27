// Very simple urgency scorer (low accuracy by design).
// Combines category, time of day, and historical naive weights.
// If dataset model.json is present, it will use those weights.
import fs from 'fs';
import path from 'path';

const modelPath = path.join(process.cwd(), 'ml', 'model.json');
let weights = { base: 0.2, overflow: 0.6, illegal_dump: 0.8, stagnant_water: 0.7, e_waste: 0.5, other: 0.3, nightBoost: 0.1 };

if (fs.existsSync(modelPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));
    weights = { ...weights, ...data };
    console.log('ML model weights loaded');
  } catch {}
}

export function scoreUrgency({ category = 'other', createdAt = new Date(), location }) {
  const hour = new Date(createdAt).getHours();
  const catW = weights[category] ?? weights.other;
  const night = (hour >= 22 || hour <= 5) ? weights.nightBoost : 0;
  const locAdj = location && location.lat && location.lng ? 0.05 : 0; // slight bonus if geo present
  let s = weights.base + catW + night + locAdj;
  // clamp 0..1
  s = Math.max(0, Math.min(1, s));
  return s;
}
