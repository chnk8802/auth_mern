import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
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
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    country: {
      type: String,
      enum: ["India", "USA"],
      default: "India",
    }
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
