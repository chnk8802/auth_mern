import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

export const paymentEntrySchema = new mongoose.Schema(
  {
    // filter Based on selected customer
    paymentEntryCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    repairJob: { type: mongoose.Schema.Types.ObjectId, ref: "RepairJob" },
    // filter Based on selected supplier
    sparePartEntry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SparePartEntry",
    },
    /*  1. Repair Job : Receivable = asked - discount 
        2. Spare Part Entry : Unit Cost 
    */
    amountPaid: { type: mongoose.Schema.Types.Decimal128 },
    note: { type: String },
  },
  { timestamps: true }
);

paymentEntrySchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentEntryCode) {
    this.paymentEntryCode = await generateModuleId("paymentEntry", "PAY");
  }
  next();
});

const PaymentEntry = mongoose.model("PaymentEntry", paymentEntrySchema);
export default PaymentEntry;
