import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { CUSTOMER_TYPES } from "../constants/enums.js";
import { addressSchema } from "./addressModel.js";

const customerSchema = mongoose.Schema(
  {
    customerCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    customerType: {
      type: String,
      enum: [...CUSTOMER_TYPES],
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
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
    address: addressSchema
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.customerCode) {
      this.customerCode = await generateModuleId("customer", "CUS");
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
