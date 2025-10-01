import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { PAYMENT_METHODS, PAYMENT_TYPE } from "../constants/enums.js";
import { createError } from "../utils/errorHandler.js";

const allocationSchema = new mongoose.Schema(
  {
    sourceModule: {
      type: String,
      enum: ["RepairJob", "SparePartEntry"],
      required: true,
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "allocations.sourceModule",
      required: true,
    },
    allocatedAmount: {
      type: mongoose.Types.Decimal128,
      required: true,
      validate: {
        validator: function (v) {
          return parseFloat(v.toString()) > 0;
        },
        message: "Allocated amount must be greater than 0",
      },
    },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    paymentCode: { type: String, trim: true, unique: true, immutable: true },

    // Receivable (incoming from customer) or Payable (outgoing to supplier)
    paymentType: { type: String, enum: PAYMENT_TYPE, required: true },

    // Counterparty
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },

    // Payment details
    paymentAmount: {
      type: mongoose.Types.Decimal128,
      required: true,
      validate: {
        validator: function (v) {
          return parseFloat(v.toString()) > 0;
        },
        message: "Payment amount must be greater than 0",
      },
    },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    notes: { type: String, trim: true },

    // Allocations for this payment
    allocations: { type: [allocationSchema], default: [] },

    // Bookkeeping helpers
    totalAllocated: { type: mongoose.Types.Decimal128, default: 0 },
    unallocatedAmount: { type: mongoose.Types.Decimal128, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Auto-generate payment code
paymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentCode) {
    this.paymentCode = await generateModuleId("payment", "PAY");
  }
  next();
});

// Pre-validate hook to enforce allocation rules
paymentSchema.pre("validate", function (next) {
  if (!this.paymentAmount) return next();

  const paymentAmount = parseFloat(this.paymentAmount.toString());

  // Sum allocations
  const total = this.allocations.reduce(
    (sum, a) => sum + parseFloat(a.allocatedAmount.toString()),
    0
  );

  // Prevent over-allocation
  if (total > paymentAmount) {
    return next(
      createError(
        `Total allocated (${total}) cannot exceed payment amount (${paymentAmount})`
      )
    );
  }

  this.totalAllocated = total;
  this.unallocatedAmount = paymentAmount - total;

  next();
});

// Virtual: balance after this payment (for display only)
paymentSchema.virtual("balanceAfter").get(function () {
  const amount = parseFloat(this.paymentAmount?.toString() || 0);
  const allocated = parseFloat(this.totalAllocated?.toString() || 0);
  return amount - allocated;
});

// Virtual: status (derived from allocations)
paymentSchema.virtual("status").get(function () {
  const amount = parseFloat(this.paymentAmount?.toString() || 0);
  const allocated = parseFloat(this.totalAllocated?.toString() || 0);

  if (allocated === 0) return "unpaid";
  if (allocated < amount) return "partial";
  return "paid";
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
