import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { addressSchema } from "./addressModel.js";

const supplierSchema = new mongoose.Schema(
  {
    supplierCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    fullName: { type: String, required: true },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(\+91[\-\s]?)?[0-9]{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: addressSchema,
  },
  { timestamps: true }
);

// Pre-save hook to generate supplierCode if not provided
supplierSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.supplierCode) {
      // Generate a unique supplier code, e.g., "SUP-001"
      this.supplierCode = await generateModuleId("supplier", "SUP");
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
