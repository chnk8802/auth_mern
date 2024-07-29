import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    technicianName: {
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

const Technician = mongoose.model("Technician", technicianSchema);
export default Technician;
