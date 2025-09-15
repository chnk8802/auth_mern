import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { PAYMENT_METHODS, PAYMENT_TYPE } from "../constants/enums.js";
import PaymentEntry from "../models/paymentEntryModel.js";
import { paymentEntrySchema } from "../models/paymentEntryModel.js";

const paymentSchema = new mongoose.Schema(
  {
    paymentCode: { type: String, trim: true, unique: true, immutable: true },
    paymentType: { type: String, enum: PAYMENT_TYPE},
    /* customer or supplier based on payment type*/
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    // paymentEntries: [{type: mongoose.Schema.Types.ObjectId, ref: "PaymentEntry"}],
    paymentEntries: [paymentEntrySchema],
    totalAmount: { type: mongoose.Types.Decimal128 },
    paymentMethod: { type: String, enum: PAYMENT_METHODS},
  },
  { timestamps: true }
);

paymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentCode) {
    this.paymentCode = await generateModuleId("payment", "PAY");
  }
  next();
});

paymentSchema.virtual("displayName").get(function () {
  return `${this.paymentCode}`;
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
