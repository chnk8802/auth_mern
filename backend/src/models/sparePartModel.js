import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { SPARE_PART_TYPES } from "../constants/enums.js";
import { DecimalField } from "../utils/decimalField.js";

const sparePartSchema = new mongoose.Schema(
  {
    partCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true, // Prevent changes to partCode after creation
    },
    brand: { type: String, trim: true, }, // e.g. "Samsung"
    model: { type: String, trim: true, }, // e.g. "Galaxy S21"
    partName: { type: String, trim: true, }, // e.g. "Screen"
    partType: {
      type: String,
      trim: true,
      enum: [...SPARE_PART_TYPES],
    },
    costPrice: DecimalField,
    stockQty: { type: Number, default: 0 }, // Default to 0 if not specified
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  },
  { timestamps: true }
);

sparePartSchema.pre("save", async function (next) {
  try {
    if (!this.partCode) {
      this.partCode = await generateModuleId("sparePart", "SP");
    }
    next();
  } catch (err) {
    next(err);
  }
});

const SparePart = mongoose.model("SparePart", sparePartSchema);
export default SparePart;
