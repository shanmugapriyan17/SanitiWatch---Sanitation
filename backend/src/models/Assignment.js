import mongoose from 'mongoose';
const assignmentSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});
export const Assignment = mongoose.model('Assignment', assignmentSchema);
