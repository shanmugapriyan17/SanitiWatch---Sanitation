import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing');
  await mongoose.connect(uri, { dbName: 'sanitiwatch' });
  console.log('MongoDB connected');
}

export async function ensureSeedAdmin() {
  const count = await User.countDocuments({ role: 'admin' });
  if (count === 0) {
    await User.create({
      name: 'City Admin',
      email: 'admin@city.gov',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Seeded default admin: admin@city.gov / admin123');
  }
}
