import mongoose from "mongoose";

export const paymentEntrySchema = new mongoose.Schema(
  {
    // filter Based on selected customer
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

const PaymentEntry = mongoose.model("PaymentEntry", paymentEntrySchema);
export default PaymentEntry;
