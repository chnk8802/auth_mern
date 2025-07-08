import mongoose from "mongoose";
import { generateModuleId } from "../utils/generateModuleId.js";
import { COUNTRIES, STATES } from "../constants/enums.js";

const customerSchema = mongoose.Schema(
  {
    customerCode: {
      type: String,
      trim: true,
      unique: true,
      immutable: true,
    },
    fullName: {
      type: String,
      trim: true,
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
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        enum: [...STATES],
        default: "uttar_pradesh",
        trim: true,
      },
      zip: {
        type: String,
        trim: true,
        validate: {
          validator: (v) => /^[1-9][0-9]{5}$/.test(v),
          message: (props) => `${props.value} is not a valid Indian PIN code!`,
        },
      },
      country: {
        type: String,
        enum: [...COUNTRIES],
        default: "india",
      },
    },
    isBulkCustomer: {
      type: Boolean,
    },
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

customerSchema.virtual("addressDisplayName").get(function () {
  return `${this.address.street ? this.address.street: ""} ${this.address.city} ${this.address.state}`
})

customerSchema.virtual("displayName").get(function () {
  return `${this.fullName} ${this.address.city} ${this.customerCode}`
})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
