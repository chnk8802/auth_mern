import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { generateModuleId } from "../utils/generateModuleId.js";

const userSchema = new mongoose.Schema(
  {
    userCode: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
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
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
      maxlength: 330,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i.test(v);
        },
        message: (props) =>
          `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number!`,
      },
      select: false,
    },
    fullName: {
      type: String,
      trim: true,
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
        enum: ["India"],
        default: "India",
      },
    },
    role: {
      type: String,
      enum: ["admin", "manager", "technician", "user", "customer", "guest"],
      default: "user",
    },
    resetPasswordToken: {
      type: String,
      trim: true,
      select: false,
    },
    resetPasswordExpiresAt: {
      type: Date,
      select: false,
    },
    isResetPasswordTokenExpired: {
      type: Boolean,
      default: false,
      select: false,
    },
    refreshTokens: {
      type: [
        {
          token: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ], select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    // Generate userCode if not provided
    if (this.isNew && !this.userCode) {
      const prefixMap = {
        admin: "ADM",
        manager: "MGR",
        technician: "TECH",
        user: "USR",
      };
      const prefix = prefixMap[this.role] || "USR";
      this.userCode = await generateModuleId("user", prefix);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
