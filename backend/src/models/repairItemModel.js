import mongoose from "mongoose";

const repairItemSchema = new mongoose.Schema(
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
    lock: {
      type: String,
      enum: ["Password/PIN","Pattern"],
    },
  },
  {
    timestamps: true,
  }
);
const Repair_Item = mongoose.model("Repair_Item", repairItemSchema);

export default Repair_Item;
