import mongoose from "mongoose";

const paymentEntrySchema = new mongoose.Schema({
    repairJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RepairJob",
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
    },
    amountPaid: {
        type: mongoose.Schema.Types.Decimal128,
    },
    note: {
        type: String,
    }
}, { timestamps: true });


const PaymentEntry = mongoose.model("PaymentEntry", paymentEntrySchema)
export default PaymentEntry;
