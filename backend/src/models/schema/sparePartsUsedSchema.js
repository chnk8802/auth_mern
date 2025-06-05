import mongoose from "mongoose";

const sparePartsUsedSchema = new mongoose.Schema(
  {
    sourceType: {
      type: String,
      required: true,
      enum: ["In-house", "External"],
    },
    sparePart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SparePart",
      required: function () {
        return !this.sourceType || this.sourceType === "In-house";
      },
    },
    externalPartName: {
      type: String,
      trim: true,
      required: function () {
        return !this.sourceType || this.sourceType === "External";
      },
    },
    sparePartShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    sparePartUnitCost: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

sparePartsUsedSchema.virtual("sparePartName").get(function () {
  if (this.sourceType === "External") {
    return this.externalPartName || "External Part";
  }
  return `${this.sparePart.brand} ${this.sparePart.model} ${this.sparePart.name}`;
});

export default sparePartsUsedSchema;
