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
import SparePartEntry from "../models/sparePartEntryModel.js"

export const createRepairJob = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error, value } = createRepairJobValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const { sparePartEntries = [], ...repairJobCore } = value.data[0];

    // Ensure customer exists
    const customerExists = await Customer.findById(repairJobCore.customer).session(session);
    if (!customerExists) {
      throw createError(404, "Customer not found");
    }

    // Step 1: Create RepairJob
    const repairJob = await RepairJob.create([repairJobCore], { session });
    const savedRepairJob = repairJob[0];

    // Step 2: Create SparePartEntries (so pre('save') runs)
    const createdSpareParts = [];
    for (const entry of sparePartEntries) {
      const partDoc = new SparePartEntry({
        ...entry,
        repairJob: savedRepairJob._id,
      });
      await partDoc.save({ session }); // <-- triggers pre('save') hook
      createdSpareParts.push(partDoc);
    }

    if (createdSpareParts.length) {
      await RepairJob.updateOne(
        { _id: savedRepairJob._id },
        { $push: { sparePartEntries: { $each: createdSpareParts.map((e) => e._id) } } },
        { session }
      );
    }

    await session.commitTransaction();

    const populated = await RepairJob.findById(savedRepairJob._id)
      .populate("sparePartEntries")
      .populate("customer");

    response(res, populated, "Repair job created successfully", { code: 201 });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export const updateRepairJob = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const repairJobId = req.params.id;

    const { error, value } = updateRepairJobValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const { sparePartEntries = [], ...repairJobUpdates } = value.data[0];

    // --- enrich repairJobUpdates with extra computed fields ---
    if (repairJobUpdates.repairStatus === "picked") {
      repairJobUpdates.pickedAt = new Date();
    }
    if (repairJobUpdates?.customer) {
      const customerExists = await Customer.findById(repairJobUpdates.customer).session(session);
      if (!customerExists) throw createError(404, "customer not found");
    }
    if (repairJobUpdates?.technician) {
      const technicianExists = await User.findById(repairJobUpdates.technician).session(session);
      if (!technicianExists) throw createError(404, "Technician not found");
    }

    // --- Step 1: Update RepairJob core fields ---
    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      { $set: repairJobUpdates },
      { new: true, session }
    );
    if (!updatedRepairJob) throw createError(404, "Repair job not found");

    // --- Step 2: Handle SparePartEntries ---
    // Fetch existing entries linked to this job
    const existingEntries = await SparePartEntry.find({ repairJob: repairJobId }).session(session);
    const existingIds = existingEntries.map((e) => e._id.toString());

    const incomingIds = sparePartEntries.filter((e) => e._id).map((e) => e._id.toString());

    // Determine operations
    const toDelete = existingIds.filter((id) => !incomingIds.includes(id));
    const toUpdate = sparePartEntries.filter((e) => e._id);
    const toAdd = sparePartEntries.filter((e) => !e._id);

    // 🔹 Delete removed entries
    if (toDelete.length) {
      await SparePartEntry.deleteMany({ _id: { $in: toDelete } }, { session });
    }

    // 🔹 Update existing entries
    for (const entry of toUpdate) {
      await SparePartEntry.findByIdAndUpdate(
        entry._id,
        { $set: { ...entry } },
        { session }
      );
    }

    // 🔹 Add new entries (so pre('save') runs)
    const addedEntries = [];
    for (const entry of toAdd) {
      const newPart = new SparePartEntry({ ...entry, repairJob: repairJobId });
      await newPart.save({ session }); // pre('save') runs here
      addedEntries.push(newPart);
    }

    // --- Step 3: Sync sparePartEntries array in RepairJob ---
    const finalEntryIds = [
      ...incomingIds, // still active ones
      ...addedEntries.map((e) => e._id), // newly added
    ];

    updatedRepairJob.sparePartEntries = finalEntryIds;
    await updatedRepairJob.save({ session });

    // --- Commit transaction ---
    await session.commitTransaction();

    // --- Populate response ---
    const populated = await RepairJob.findById(repairJobId)
      .populate({
        path: "customer",
        select: "customerCode fullName email phone address",
      })
      .populate({
        path: "technician",
        select: "userCode fullName email phone",
      })
      .populate({
        path: "sparePartEntries",
        populate: [
          {
            path: "sparePart",
            select: "partCode brand model partName partType unitPrice stockQty",
          },
          { path: "supplier", select: "supplierCode fullName" },
        ],
      });

    response(res, populated, "Repair job updated successfully");
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getAllRepairJobs = async (req, res, next) => {
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

export const getRepairJobById = async (req, res, next) => {
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
        populate: [
          {
            path: "sparePart",
            select: "partCode",
          },
          { path: "supplier", select: "supplierCode fullName" },
        ],
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


export const updateRepairJobStatus = async (req, res, next) => {
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

export const deleteRepairJobs = async (req, res, next) => {
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

export const deleteRepairJob = async (req, res, next) => {
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

export const searchRepairJobs = async (req, res, next) => {
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