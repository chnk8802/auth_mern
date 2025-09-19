import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { PAYMENT_METHODS, PAYMENT_TYPE, PAYMENT_STATUSES } from "../constants/enums.js";

const paymentSchema = new mongoose.Schema(
  {
    paymentCode: { type: String, trim: true, unique: true, immutable: true },

    // Receivable (incoming) or Payable (outgoing)
    paymentType: { type: String, enum: PAYMENT_TYPE, required: true },

    // Dynamic reference (RepairJob, Customer, SparePartEntry, Supplier)
    sourceModule: {
      type: String,
      enum: ["RepairJob", "Customer", "SparePartEntry", "Supplier"],
      required: true,
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "sourceModule",
      required: true,
    },

    // Amount handling
    amountDue: { type: mongoose.Types.Decimal128, required: true }, // fetched from source
    paymentAmount: { type: mongoose.Types.Decimal128, required: true }, // amount paid now
    balanceAfter: { type: mongoose.Types.Decimal128 }, // auto-calc after payment

    // Status (unpaid, partial, paid)
    status: {
      type: String,
      enum: PAYMENT_STATUSES.map((s) => s.value),
      default: "unpaid",
    },

    // Payment method
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },

    // Optional note
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// Auto-generate payment code
paymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentCode) {
    this.paymentCode = await generateModuleId("payment", "PAY");
  }

  // Auto-calc balance + status
  if (this.isModified("paymentAmount") || this.isModified("amountDue")) {
    const due = parseFloat(this.amountDue.toString());
    const paid = parseFloat(this.paymentAmount.toString());
    const balance = due - paid;

    this.balanceAfter = balance;

    if (balance <= 0) this.status = "paid";
    else if (paid > 0 && balance > 0) this.status = "partial";
    else this.status = "unpaid";
  }

  next();
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;


// import mongoose from "mongoose";
// import { generateModuleId } from "../utils/generateModuleId.js";
// import { PAYMENT_METHODS, PAYMENT_TYPE } from "../constants/enums.js";
// import PaymentEntry from "../models/paymentEntryModel.js";
// import { paymentEntrySchema } from "../models/paymentEntryModel.js";

// const paymentSchema = new mongoose.Schema(
//   {
//     paymentCode: { type: String, trim: true, unique: true, immutable: true },
//     paymentType: { type: String, enum: PAYMENT_TYPE },
//     /* customer or supplier based on payment type*/
//     customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
//     supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
//     paymentEntries: [paymentEntrySchema],
//     totalAmount: { type: mongoose.Types.Decimal128 },
//     paymentMethod: { type: String, enum: PAYMENT_METHODS },
//   },
//   { timestamps: true }
// );

// paymentSchema.pre("save", async function (next) {
//   if (this.isNew && !this.paymentCode) {
//     this.paymentCode = await generateModuleId("payment", "PAY");
//   }
//   next();
// });

// const Payment = mongoose.model("Payment", paymentSchema);
// export default Payment;
