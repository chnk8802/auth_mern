import mongoose, { model } from "mongoose";

const paymentEntryScheme = new mongoose.Schema({
    repairJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RepairJob",
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    amountPaid: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    note: {
        type: String,
    }
}, { timestamps: true });


const PaymentEntry = mongoose.model("PaymentEntry", paymentEntrySchema)
export default PaymentEntry;
