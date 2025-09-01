import mongoose from "mongoose";

export const DecimalField = {
  type: mongoose.Schema.Types.Decimal128,
  default: null,
  get: (v) => (v != null ? parseFloat(v.toString()) : v),
  set: (v) => (v != null ? mongoose.Types.Decimal128.fromString(v.toString()) : v),
};
