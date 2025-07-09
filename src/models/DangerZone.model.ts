
import mongoose from 'mongoose';

const dangerZoneSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
 enum: ['حفرة', 'منطقة مقطوعة', 'منطقة محظورة','ممر جمال','طريق وعر '],
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  imageUrl: String, 
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

dangerZoneSchema.index({ location: '2dsphere' });

export const DangerZone = mongoose.model('DangerZone', dangerZoneSchema);


