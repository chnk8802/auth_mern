import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Done", "Delivered","Irrepairable"],
        default: "Pending"
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    model: {
      type: String,
    },
    imei: {
      type: String,
    },
    barcode: {
      type: String,
    },
    problem: {
      type: String,
    },
    amount: {
      type: Number,
    },
    technician: {
      type: mongoose.Schema.ObjectId,
      ref: "Technician",
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemSchema);

export default Item;
