import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    docname: {
      type: String,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      addressLine1: {
        type: String,
        trim: true,
      },
      addressLine2: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
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
        trim: true,
      },
      zip: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        enum: ["India"],
        default: "India",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
