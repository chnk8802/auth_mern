import mongoose from "mongoose";
import RepairJob from "../models/repairJobModel.js";
import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import {
  createRepairJobValidation,
  updateRepairJobValidation,
} from "../validations/repairJob/repairJob.validation.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import { listRepairJobs } from "../services/repairJobServices.js";
import flattenObject from "../utils/flattenObject.js";

export const createRepairJob = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("REQ BODY:", req.body, typeof req.body);

  try {
    // Validate payload
    const { error, value } = createRepairJobValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    console.log(JSON.stringify(value));

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const repairJobData = flattenObject(value.data[0]);

    // Ensure customer exists
    const customerExists = await Customer.findById(repairJobData.customer).session(session);
    if (!customerExists) {
      throw createError(404, "Customer not found");
    }

    // Step 1: Create RepairJob
    const newRepairJob = new RepairJob(repairJobData);
    const savedRepairJob = await newRepairJob.save({ session });

    // Step 2: Create SparePartEntries (if any)
    if (repairJobData.sparePartEntries?.length) {
      const sparePartEntries = await SparePartEntry.insertMany(
        repairJobData.sparePartEntries.map(entry => ({
          ...entry,
          repairJob: savedRepairJob._id,
        })),
        { session }
      );

      // Link spare parts to repair job
      savedRepairJob.sparePartEntries.push(...sparePartEntries.map(e => e._id));
      await savedRepairJob.save({ session });
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    response(res, savedRepairJob, "Repair job created successfully", { code: 201 });
  } catch (err) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

const getAllRepairJobs = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);
    const [repairJobs, totalRecords] = await Promise.all([
      RepairJob.find({})
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate([
          {
            path: "customer",
            select: "customerCode fullName address.city",
          },
          {
            path: "technician",
            select: "userCode fullName",
          },
          {
            path: "sparePartEntries",
            populate: [
              {
                path: "sparePart",
                select: "partCode partName brand model",
              },
              {
                path: "supplier",
                select: "supplierCode fullName",
              },
            ],
          },
        ])
        .lean(),
      RepairJob.countDocuments({}),
    ]);

    return response(res, repairJobs, "Repair jobs retrieved successfully", {
      pagination: {
        page,
        limit,
        sort,
        total: totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRepairJobById = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    const repairJob = await RepairJob.findById(repairJobId).populate([
      {
        path: "customer",
        // select: "customerCode fullName email phone address",
      },
      {
        path: "technician",
        // select: "userCode fullName email phone",
      },
      {
        path: "sparePartEntries",
      },
    ]);

    if (!repairJob) {
      throw createError(404, "Repair job not found");
    }
    response(res, repairJob, "Repair job retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateRepairJob = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;

    const { error, value } = updateRepairJobValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const repairJobUpdates = flattenObject(value.data[0]);
    if (repairJobUpdates.repairStatus === "picked") {
      repairJobUpdates.pickedAt = new Date();
    }
    if (repairJobUpdates?.customer) {
      const customerExists = await Customer.findById(
        repairJobUpdates.customer,
        { customerCode: 1 }
      );
      if (!customerExists) {
        throw createError(404, "customer not found");
      }
    }
    if (repairJobUpdates?.technician) {
      const technicianExists = await User.findById(
        repairJobUpdates.technician,
        { userCode: 1 }
      );
      if (!technicianExists) {
        throw createError(404, "Technician not found");
      }
    }
    // flattenObjects(value)
    const updates = {};
    if (Object.keys(repairJobUpdates).length > 0) {
      updates.$set = repairJobUpdates;
    }

    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      updates,
      { new: true }
    ).populate([
      {
        path: "customer",
        select: "customerCode fullName email phone address",
      },
      {
        path: "technician",
        select: "userCode fullName email phone",
      },
      {
        path: "sparePartEntries",
        populate: [
          {
            path: "sparePart",
            select: "partCode brand model partName partType costPrice stockQty",
          },
          { path: "supplier", select: "supplierCode fullName" },
        ],
      },
    ]);

    if (!updatedRepairJob) {
      throw createError(404, "Repair job not found");
    }
    response(res, updatedRepairJob, "Repair job updated successfully");
  } catch (error) {
    next(error);
  }
};

const updateRepairJobStatus = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    const { repairStatus } = req.body;

    if (!repairStatus) {
      throw createError(400, "Repair status is required");
    }

    const repairJob = await RepairJob.findById(repairJobId);
    if (!repairJob) {
      throw createError(404, "Repair job not found");
    }

    if (repairJob.repairStatus === repairStatus) {
      throw createError(
        400,
        "Repair job status is already set to the requested status"
      );
    }

    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      { repairStatus },
      { new: true }
    ).select("_id repairJobCode repairStatus");

    if (!updatedRepairJob) {
      throw createError(500, "Repair job not updated");
    }

    response(res, updatedRepairJob, "Repair job status updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteRepairJobs = async (req, res, next) => {
  try {
    const repairJobIds = req.body.ids;
    if (!repairJobIds || !Array.isArray(repairJobIds)) {
      throw createError(400, "Repair job IDs are required");
    }

    const deletedRepairJobs = await RepairJob.deleteMany({
      _id: { $in: repairJobIds },
    });

    if (!deletedRepairJobs || deletedRepairJobs.deletedCount === 0) {
      throw createError(404, "No repair jobs found");
    }

    response(res, deletedRepairJobs, "Repair jobs deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deleteRepairJob = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    if (!repairJobId) {
      throw createError(400, "Repair job ID is required");
    }

    const deletedRepairJob = await RepairJob.findByIdAndDelete(
      repairJobId
    ).select("repairJobCode deviceModel");

    if (!deletedRepairJob) {
      throw createError(400, "Could not delete Repair Job");
    }

    response(res, deletedRepairJob, "Repair job deleted successfully");
  } catch (error) {
    next(error);
  }
};

const searchRepairJobs = async (req, res, next) => {
  try {
    const { search } = req.query;
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const result = await listRepairJobs({
      search,
      page,
      limit,
      sort,
    });

    if (!result.data.length) {
      return response(res, [], "No repair jobs found", {
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          total: result.totalRecords,
          limit,
        },
      });
    }

    response(res, result.data, "Repair jobs retrieved successfully", {
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.totalRecords,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createRepairJob,
  getAllRepairJobs,
  getRepairJobById,
  updateRepairJobStatus,
  updateRepairJob,
  deleteRepairJobs,
  deleteRepairJob,
  searchRepairJobs,
};
