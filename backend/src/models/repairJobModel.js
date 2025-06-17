import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

const repairJobSchema = new mongoose.Schema(
  {
    repairStatus: {
      type: String,
      enum: ["pending", "in-progress", "incomplete", "complete", "picked"],
      default: "pending",
    },
    repairJobCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      // required: true,
    },
    deviceModel: { type: String /* required: true, */ },
    deviceIMEI: { type: String },
    issueDescription: { type: String /* required: true, */ },
    repairType: {
      type: String,
      enum: ["Hardware", "Software", "Both"],
      default: "Hardware",
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      filter: { role: "Technician" },
    },
    deviceComponents: {
      type: [String],
      enum: ["Sim Tray", "Screen", "Front Camera", "Back Camera"],
    },
    spareParts: [
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
    ],
    // spareParts: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "SparePartEntry" },
    // ],
    totalSparePartsCost: { type: mongoose.Schema.Types.Decimal128, default: 0 }, // This will be computed in pre-save hook
    repairCost: {
      type: mongoose.Schema.Types.Decimal128 /* required: true, */,
    }, // This is the cost of the repair service itself
    discount: { type: mongoose.Schema.Types.Decimal128, default: 0 }, // This is the discount applied to the total cost
    finalCost: { type: mongoose.Schema.Types.Decimal128 }, // This should be totalCost - discount
    paymentDetails: {
      paymentStatus: {
        type: String,
        enum: ["paid", "unpaid", "partial"],
        default: "unpaid",
      },
      amountPaid: { type: mongoose.Schema.Types.Decimal128, default: 0 }, // Amount paid by the customer
      amountDue: { type: mongoose.Schema.Types.Decimal128, default: 0 }, // Amount still due
    },
    notes: { type: String },
    pickedAt: { type: Date },
  },
  { timestamps: true }
);

repairJobSchema.pre("save", async function (next) {
  try {
    // Ensure repairJobCode is generated if not provided
    if (this.isNew && !this.repairJobCode) {
      this.repairJobCode = await generateModuleId("repairJob", "REP");
    }

    const sparePartsCost = this.spareParts.reduce((total, part) => {
      const partCost = parseFloat(part.unitCost?.toString()) || 0;
      return total + partCost;
    }, 0);
    this.totalSparePartsCost = sparePartsCost;
    const repairCost = parseFloat(this.repairCost?.toString() || "0");
    const discount = parseFloat(this.discount?.toString() || "0");
    this.finalCost = (repairCost - discount).toFixed(2);

    // Ensure pickedAt is set to current date if repairStatus is 'picked'
    if (this.isModified("repairStatus") && this.repairStatus === "picked") {
      this.pickedAt = new Date();
    }
    next();
  } catch (error) {
    next(error);
  }
});

repairJobSchema.virtual("displayName").get(function () {
  return `${this.repairJobCode} - ${this.deviceModel}`;
});

const RepairJob = mongoose.model("RepairJob", repairJobSchema);
export default RepairJob;
