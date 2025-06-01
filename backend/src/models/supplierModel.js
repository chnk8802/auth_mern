import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
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
        zip: { type: String }
    }
}, { timestamps: true });

const Supplier = mongoose.model("Supplier", SupplierSchema);

export default Supplier;
