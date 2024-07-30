import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    customerName: {
      type: String,
      require: true
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
