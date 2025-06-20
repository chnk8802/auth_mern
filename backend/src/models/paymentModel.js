import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { PAYMENT_METHODS } from "../constants/enums.js";

const paymentSchema = new mongoose.Schema(
  {
    paymentCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },

    // ✅ Track each repair job with its corresponding amount paid
    paymentEntries: [{type: mongoose.Schema.Types.ObjectId, ref: "PaymentEntry"}],

    paymentMethod: {
      type: String,
      enum: [...PAYMENT_METHODS],
      default: "Cash",
    }
  },
  {
    timestamps: true,
  }
);

paymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentCode) {
    this.paymentCode = await generateModuleId("payment", "PAY");
  }
  next();
});

paymentSchema.virtual("displayName").get(function () {
  return `${this.paymentCode}`
})

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;