import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    docname: {
        type: String
    },
    itemName: {
        type: String
    },
    itemCode: {
        type: String
    },
    purchasePrice: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    hasSerialNo: {
        type: Boolean
    },
    hasBatchNo: {
        type: Boolean
    },
},{
    timestamps: true
})