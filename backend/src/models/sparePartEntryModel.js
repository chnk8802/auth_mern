import mongoose from "mongoose";

const sparePartEntrySchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

sparePartEntrySchema.virtual("sparePartName").get(function () {
  if (this.sourceType === "External") {
    return this.externalPartName || "External Part";
  }
  return `${this.sparePart.brand} ${this.sparePart.model} ${this.sparePart.name}`;
});

const SparePartEntry = mongoose.model("SparePartEntry", sparePartEntrySchema);

export default SparePartEntry;
