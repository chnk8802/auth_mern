import mongoose from "mongoose";

const repairOrderSchema = new mongoose.Schema(
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
    items: {
      type: mongoose.Schema.ObjectId,
      ref: "Item"
    },
    totalAmount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);
const Repair_Order = mongoose.model("Repair_Order", repairOrderSchema);

export default Repair_Order;
