// models/counterModel.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  module: { type: String, required: true },
  seq: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.model("Counter", counterSchema);