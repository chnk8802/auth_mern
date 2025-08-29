import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import {
  DEVICE_COMPONENTS,
  PAYMENT_STATUS,
  REPAIR_STATUS,
  REPAIR_TYPE,
} from "../constants/enums.js";

const repairJobSchema = new mongoose.Schema(
  {
    repairJobCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    repairStatus: {
      type: String,
      enum: REPAIR_STATUS,
      default: "pending",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    deviceModel: { type: String },
    deviceIMEI: { type: String },
    issueDescription: { type: String },
    repairType: {
      type: String,
      enum: REPAIR_TYPE,
      default: "Hardware",
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    deviceComponents: {
      type: [String],
      enum: DEVICE_COMPONENTS,
    },
    sparePartsEntries: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SparePartEntry" },
    ],
    repairCost: { type: mongoose.Schema.Types.Decimal128 },
    discount: { type: mongoose.Schema.Types.Decimal128 },
    // Tobe auto calculated
    totalSparePartsCost: { type: mongoose.Schema.Types.Decimal128 },
    totalReceivable: { type: mongoose.Schema.Types.Decimal128 },
    profit: { type: mongoose.Schema.Types.Decimal128 },
    paymentDetails: {
      paymentStatus: {
        type: String,
        enum: PAYMENT_STATUS,
        default: "unpaid",
      },
      amountReceived: { type: mongoose.Schema.Types.Decimal128 }, // Amount paid by the customer
      amountDue: { type: mongoose.Schema.Types.Decimal128 }, // Amount still due
    },
    // Tobe auto calculated
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
    this.totalReceivable = (repairCost - discount).toFixed(2);
    this.profit = this.totalReceivable - this.totalSparePartsCost;

    // Ensure pickedAt is set to current date if repairStatus is 'picked'
    if (this.isModified("repairStatus") && this.repairStatus === "picked") {
      this.pickedAt = new Date();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const RepairJob = mongoose.model("RepairJob", repairJobSchema);
export default RepairJob;
