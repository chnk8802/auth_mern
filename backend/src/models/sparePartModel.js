import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

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
    name: { type: String, trim: true, }, // e.g. "Screen"
    partType: {
      type: String,
      trim: true,
      enum: ["Display", "Battery", "IC", "Camera", "Storage", "Other"],
    },
    costPrice: { type: mongoose.Schema.Types.Decimal128},
    stockQty: { type: Number, default: 0 }, // Default to 0 if not specified
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  },
  { timestamps: true }
);

// Pre-save hook to generate partCode if not provided
sparePartSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.partCode) {
      this.partCode = await generateModuleId("sparePart", "SP");
    }
    next();
  } catch (error) {
    next(error);
  }
});

sparePartSchema.virtual("partName").get(function () {
  return `${this.brand} ${this.model} ${this.name}`;
});

sparePartSchema.virtual("displayName").get(function () {
  return `${this.partCode} - ${this.brand} ${this.model} ${this.name}`;
});
const SparePart = mongoose.model("SparePart", sparePartSchema);
export default SparePart;
