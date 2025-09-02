import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { DecimalField } from "../utils/decimalField.js";
import { SPARE_PART_SOURCE_TYPE } from "../constants/enums.js";

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
      enum: [...SPARE_PART_SOURCE_TYPE],
      default: "external",
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
    unitCost: DecimalField,
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
