import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";

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
    address: {
      street: { type: String },
      city: { type: String, required: true },
      state: {
        type: String,
        enum: [
          // States
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",

          // Union Territories
          "Andaman and Nicobar Islands",
          "Chandigarh",
          "Dadra and Nagar Haveli and Daman and Diu",
          "Delhi",
          "Jammu and Kashmir",
          "Ladakh",
          "Lakshadweep",
          "Puducherry",
        ],
        default: "Uttar Pradesh",
        required: true,
        trim: true,
      },
      zip: { type: String },
    },
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

supplierSchema.virtual("displayName").get(function () {
  return `${this.supplierCode} - ${this.fullName}`
})

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
