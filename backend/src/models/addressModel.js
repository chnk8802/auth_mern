import mongoose from "mongoose";
import { STATES, COUNTRIES } from "../constants/enums.js";

export const addressSchema = mongoose.Schema(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      enum: [...STATES],
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
    },
  },
  { _id: false }
);
