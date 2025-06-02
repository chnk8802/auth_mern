import mongoose from 'mongoose';
import { generateModuleId } from '../utils/generateModuleId.js';

const sparePartSchema = new mongoose.Schema({
  partCode: {
    type: String,
    trim: true,
    unique: true,
    immutable: true, // Prevent changes to partCode after creation
  },
  name: { type: String, required: true },          // e.g. "Screen"
  brand: { type: String },                         // e.g. "Samsung"
  partType: { type: String },                      // e.g. "Display", "Battery"
  costPrice: { type: Number, required: true },
  sellPrice: { type: Number },
  stockQty: { type: Number, default: 0 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
}, { timestamps: true });

// Pre-save hook to generate partCode if not provided
sparePartSchema.pre('save', async function (next) {
  try {
    if (this.isNew && !this.partCode) {
      this.partCode = await generateModuleId('sparePart', 'SP');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const SparePart = mongoose.model('SparePart', sparePartSchema);
export default SparePart;