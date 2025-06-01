import RepairJob from "../models/repairJobModel.js";
import Users from "../models/userModel.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const createRepairJob = async (req, res, next) => {
    try {
        const { customer, deviceModel, issueDescription, repairType, deviceComponents, repairCost, discount, notes } = req.body;
        if (!customer || !deviceModel || !issueDescription || !repairCost) {
            res.status(400);
            throw new Error("Missing required fields");
        }
        
        const customerExists = await Users.findById(customer);
        if (!customerExists) {
            res.status(404);
            throw new Error("Customer not found");
        }
        if (!customerExists.role || customerExists.role !== "customer") {
            res.status(400);
            throw new Error("The selected user is not a customer");
        }

        const newRepairJob = new RepairJob({
            customer,
            deviceModel,
            issueDescription,
            repairCost,
            repairType,
            deviceComponents: deviceComponents || [],
            discount: discount || 0,
            notes: notes || "",
        });
        const savedRepairJob = await newRepairJob.save();
        const totalRecords = await RepairJob.countDocuments({});
        if (!savedRepairJob) {
            res.status(500);
            throw new Error("Failed to create repair job");
        }
        res.status(201);
        sendFormattedResponse(res, savedRepairJob, "Repair job created successfully", totalRecords);
    } catch (error) {
        next(error);
    }
}
const getRepairJobs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const repairJobs = await RepairJob.find({})
            .select("-__v -createdAt -updatedAt")
            .populate("customer", "fullname email phone")
            .populate("technician", "fullname email phone")
            .populate("sparePartsUsed.sparePart", "name unitCost")
            .populate("sparePartsUsed.sparePartShop", "name address phone")
            .sort({ createdAt: -1 })
            // Pagination logic
            .skip(page * pageSize)
            .limit(pageSize);
        if (!repairJobs || repairJobs.length === 0) {
            res.status(404);
            throw new Error("No repair jobs found");
        }
        const totalRecords = await RepairJob.countDocuments({});

        res.status(200);
        sendFormattedResponse(res, repairJobs, "Repair jobs retrieved successfully", totalRecords);
    } catch (error) {
        next(error);
    }
}
const getRepairJob = async (req, res, next) => {
    try {
        const repairJobId = req.params.id;
        const repairJob = await RepairJob.findById(repairJobId)
            .populate("customer", "fullname email phone")
            .populate("technician", "fullname email phone")
            .populate("sparePartsUsed.sparePart", "name unitCost")
            .populate("sparePartsUsed.sparePartShop", "name address phone");

        if (!repairJob) {
            res.status(404);
            throw new Error("Repair job not found");
        }

        res.status(200);
        sendFormattedResponse(res, repairJob, "Repair job retrieved successfully");
    } catch (error) {
        next(error);
    }
}

const updateRepairJobstatus = async (req, res, next) => {
    try {
        const repairJobId = req.params.id;
        const { repairStatus } = req.body;

        if (!repairStatus) {
            res.status(400);
            throw new Error("Repair status is required");
        }

        const updateData = { repairStatus };

        const updatedRepairJob = await RepairJob.findByIdAndUpdate(repairJobId, updateData, { new: true }).select("_id repairJobCode repairStatus");

        if (!updatedRepairJob) {
            res.status(404);
            throw new Error("Repair job not found");
        }

        res.status(200);
        sendFormattedResponse(res, updatedRepairJob, "Repair job status updated successfully");
    } catch (error) {
        next(error);
    }
}

const updateRepairJob = async (req, res, next) => {
    try {
        const repairJobId = req.params.id;
        const { repairStatus, technician, sparePartsUsed, notes } = req.body;

        const updateData = {};
        if (repairStatus) updateData.repairStatus = repairStatus;
        if (technician) updateData.technician = technician;
        if (sparePartsUsed) updateData.sparePartsUsed = sparePartsUsed;
        if (notes) updateData.notes = notes;

        const updatedRepairJob = await RepairJob.findByIdAndUpdate(repairJobId, updateData, { new: true })
            .populate("customer", "fullname email phone")
            .populate("technician", "fullname email phone")
            .populate("sparePartsUsed.sparePart", "name unitCost")
            .populate("sparePartsUsed.sparePartShop", "name address phone");

        if (!updatedRepairJob) {
            res.status(404);
            throw new Error("Repair job not found");
        }

        res.status(200);
        sendFormattedResponse(res, updatedRepairJob, "Repair job updated successfully");
    } catch (error) {
        next(error);
    }
}

const deleteRepairJob = async (req, res, next) => {
    try {
        const repairJobId = req.params.id;
        const deletedRepairJob = await RepairJob.findByIdAndDelete(repairJobId).select("_id repairJobCode");

        if (!deletedRepairJob) {
            res.status(404);
            throw new Error("Repair job not found");
        }

        res.status(200);
        sendFormattedResponse(res, deletedRepairJob, "Repair job deleted successfully");
    } catch (error) {
        next(error);
    }
}

export default {
    createRepairJob,
    getRepairJobs,
    getRepairJob,
    updateRepairJobstatus,
    updateRepairJob,
    deleteRepairJob
};