import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import {
  DEVICE_COMPONENTS,
  PAYMENT_STATUS,
  REPAIR_STATUS,
  REPAIR_TYPE,
} from "../constants/enums.js";
import { DecimalField } from "../utils/decimalField.js";

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
      default: "hardware",
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deviceComponents: {
      type: [String],
      enum: DEVICE_COMPONENTS,
    },
    sparePartsEntries: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SparePartEntry" },
    ],
    repairCost: DecimalField,
    discount: DecimalField,
    // Tobe auto calculated
    totalSparePartsCost: DecimalField,
    totalReceivable: DecimalField,
    profit: DecimalField,
    paymentDetails: {
      paymentStatus: {
        type: String,
        enum: PAYMENT_STATUS,
        default: "unpaid",
      },
      amountReceived: DecimalField,
      amountDue: DecimalField,
      
    },
    // Tobe auto calculated
    notes: { type: String },
    pickedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

// Pre-save hook: runs before each RepairJob is saved
repairJobSchema.pre("save", async function (next) {
  try {
    /**
     * 1. Auto-generate repairJobCode if this is a new record
     */
    if (this.isNew && !this.repairJobCode) {
      this.repairJobCode = await generateModuleId("repairJob", "REP");
    }

    /**
     * 2. Calculate total spare parts cost
     *
     * NOTE: this.sparePartsEntries might contain only ObjectIds if not populated.
     * For correct calculation, ensure `sparePartsEntries` is populated with `unitCost`.
     */
    const sparePartsCost = this.sparePartsEntries.reduce((total, part) => {
      // Safely extract cost (part may be populated doc or plain ID)
      const partCost =
        part && part.unitCost ? parseFloat(part.unitCost.toString()) : 0;
      return total + partCost;
    }, 0);

    // Store back as Decimal128
    this.totalSparePartsCost = sparePartsCost

    /**
     * 3. Calculate totals (repair cost, discount, receivable, profit)
     */
    const repairCost = this.repairCost
    const discount = this.discount

    // Total Receivable = repair cost - discount
    const totalReceivable = repairCost - discount;
    this.totalReceivable = totalReceivable;

    // Profit = receivable - spare parts cost
    const profit = totalReceivable - sparePartsCost;
    this.profit = profit;

    /**
     * 4. Continue saving
     */
    next();
  } catch (error) {
    next(error);
  }
});

const RepairJob = mongoose.model("RepairJob", repairJobSchema);
export default RepairJob;
