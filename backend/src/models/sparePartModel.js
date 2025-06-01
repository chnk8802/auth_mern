import mongoose from 'mongoose';

const SparePartSchema = new mongoose.Schema({
  name: { type: String, required: true },          // e.g. "Screen"
  brand: { type: String },                         // e.g. "Samsung"
  partType: { type: String },                      // e.g. "Display", "Battery"
  costPrice: { type: Number, required: true },
  sellPrice: { type: Number },
  stockQty: { type: Number, default: 0 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
}, { timestamps: true });

const SparePart = mongoose.model('SparePart', SparePartSchema);

export default SparePart;
