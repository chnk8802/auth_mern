import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

const jobPaymentSchema = new mongoose.Schema(
  {
    paymentCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // ✅ Track each repair job with its corresponding amount paid
    payments: [
      {
        repairJob: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RepairJob",
          required: true,
        },
        amountPaid: {
          type: mongoose.Schema.Types.Decimal128,
          required: true,
        },
        note: {
          type: String,
        }
      }
    ],

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer"],
      default: "Cash",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

jobPaymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentCode) {
    this.paymentCode = await generateModuleId("jobPayment", "PAY");
  }
  next();
});

const JobPayment = mongoose.model("JobPayment", jobPaymentSchema);
export default JobPayment;