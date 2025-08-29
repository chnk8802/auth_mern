import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

const sparePartEntrySchema = new mongoose.Schema(
  {
    sparePartEntryCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    repairJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RepairJob",
    },
    sourceType: {
      type: String,
      enum: ["In-house", "External"],
    },
    sparePart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SparePart",
    },
    externalPartName: {
      type: String,
      trim: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    unitCost: {
      type: mongoose.Schema.Types.Decimal128,
    },
    isPaid: { type: Boolean },
  },
  { timestamps: true }
);

sparePartEntrySchema.pre("save", async function (next) {
  if (this.isNew && !this.sparePartEntryCode) {
    this.sparePartEntryCode = await generateModuleId("sparePartEntry", "SPE");
  }
  if (this.sourceType === "External") {
    return this.externalPartName || "External Part";
  }
  next();
});

const SparePartEntry = mongoose.model("SparePartEntry", sparePartEntrySchema);

export default SparePartEntry;
