import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
