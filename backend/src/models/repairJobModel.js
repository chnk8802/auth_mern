import mongoose from 'mongoose';
import { generateModuleId } from '../utils/generateModuleId.js';

const RepairJobSchema = new mongoose.Schema({
    repairStatus: {
        type: String,
        enum: ['pending', 'in-progress', 'incomplete', 'complete', 'picked'],
        default: 'pending'
    },
    repairJobCode: { type: String, unique: true },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deviceModel: { type: String, required: true },
    deviceImei: { type: String },
    issueDescription: { type: String, required: true },
    repairType: {
        type: String,
        enum: ['hardware', 'software', 'both'],
        default: 'hardware'
    },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deviceComponents: {
        type: [String],
        enum: ["Sim Tray", "Screen", "Front Camera", "Back Camera"]
    },

    sparePartsUsed: [{
        sparePart: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart", required: true },
        sparePartShop: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
        sparePartUnitCost: { type: Number, required: true },
    }],

    totalSparePartsCost: { type: Number, default: 0 }, // This will be computed in pre-save hook
    repairCost: { type: Number, required: true }, // This is the cost of the repair service itself
    totalCost: { type: Number }, // This should be the sum of repairCost and totalSparePartsCost
    discount: { type: Number, default: 0 }, // This is the discount applied to the total cost
    finalCost: { type: Number }, // This should be totalCost - discount

    notes: { type: String },
    pickedAt: { type: Date },

}, { timestamps: true });

RepairJobSchema.pre('save', async function (next) {
    try {
        // Ensure repairJobCode is generated if not provided
        if (this.isNew && !this.repairJobCode) {
            this.repairJobCode = await generateModuleId('repairJob', 'REP')
        }
        // Ensure totalSparePartsCost is computed before saving
        if (this.new || this.isModified('sparePartsUsed.sparePartUnitCost')) {
            this.totalSparePartsCost = this.sparePartsUsed.reduce((total, part) => {
                return total + (part.sparePartUnitCost || 0);
            })
        }
        // Ensure totalCost is computed before saving
        if (this.isNew || this.isModified('repairCost') || this.isModified('totalSparePartsCost')) {
            this.totalCost = this.repairCost + this.totalSparePartsCost;
        }
        // Ensure finalCost is computed before saving
        if (this.isNew || this.isModified('totalCost') || this.isModified('discount')) {
            this.finalCost = this.totalCost - this.discount;
        }
        // Ensure pickedAt is set to current date if repairStatus is 'picked'
        if (this.isModified('repairStatus') && this.repairStatus === 'picked') {
            this.pickedAt = new Date();
        }
        next();
    } catch (error) {
        next(error);
    }
});
const RepairJob = mongoose.model('RepairJob', RepairJobSchema);
export default RepairJob;
