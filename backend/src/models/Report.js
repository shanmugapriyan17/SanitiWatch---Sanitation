import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  status: String,
  timestamp: { type: Date, default: Date.now },
  actor: String
}, { _id: false });

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  category: { type: String, enum: ['overflow','illegal_dump','stagnant_water','e_waste','other'], default: 'other' },
  anonymous: { type: Boolean, default: false },
  status: { type: String, enum: ['submitted','assigned','in_progress','resolved','rejected'], default: 'submitted' },
  location: {
    lat: Number, lng: Number, address: String
  },
  mediaUrls: [String],
  createdAt: { type: Date, default: Date.now },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [historySchema],
  urgencyScore: { type: Number, default: 0 }
});

reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ 'location.lat': 1, 'location.lng': 1 });

export const Report = mongoose.model('Report', reportSchema);
