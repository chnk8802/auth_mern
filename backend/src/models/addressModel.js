import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    landmark: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      enum: ["India", "USA"],
      default: "India",
    },
    pincode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
