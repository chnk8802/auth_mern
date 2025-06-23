import RepairJob from "../models/repairJobModel.js";
import Customer from "../models/customerModel.js";
import {
  createRepairJobValidation,
  updateRepairJobValidation,
} from "../validations/repairJob/repairJob.validation.js";
import response from "../utils/response.js";
import flattenObjects from "../utils/flattenObject.js"
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import { listRepairJobs } from "../services/repairJobServices.js";

const createRepairJob = async (req, res, next) => {
  try {
    const { error, value } = createRepairJobValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const customerExists = await Customer.findById(value.customer);
    if (!customerExists) {
      throw createError(404, "Customer not found");
    }

    const newRepairJob = new RepairJob(value);
    const savedRepairJob = await newRepairJob.save();

    if (!savedRepairJob) {
      throw createError(500, "Failed to create repair job");
    }

    response(res, savedRepairJob, "Repair job created successfully", {
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRepairJobs = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const repairJobs = await RepairJob.find({})
      .populate("customer", "customerCode fullname email phone address")
      .populate("technician", "userCode fullname email phone")
      .populate({
        path: "spareParts",
        populate: [
          {
            path: "sparePart",
            select: "partCode brand model name displayName",
          },
          { path: "supplier", select: "supplierCode fullName displayName" },
        ],
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (!repairJobs || repairJobs.length === 0) {
      throw createError(404, "No repair jobs found");
    }

    const totalRecords = await RepairJob.countDocuments({});
    response(res, repairJobs, "Repair jobs retrieved successfully", {
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
    const repairJob = await RepairJob.findById(repairJobId)
      .populate("customer", "customerCode fullname email phone address")
      .populate("technician", "userCode fullname email phone")
      .populate({
        path: "spareParts",
        populate: [
          {
            path: "sparePart",
            select: "partCode brand model name displayName",
          },
          { path: "supplier", select: "supplierCode fullName displayName" },
        ],
      });

    if (!repairJob) {
      throw createError(404, "Repair job not found");
    }
    console.log(repairJob)
    response(res, repairJob, "Repair job retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateRepairJob = async (req, res, next) => {
  try {
    console.log(req.user)
    const repairJobId = req.params.id;

    const { error, value } = updateRepairJobValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    if (value?.customer) {
      const customerExists = await Customer.findById({
        _id: value.customer,
      }).select("customerCode");
      if (!customerExists) {
        throw createError(404, "customer not found");
      }
    }
    if (value?.technician) {
      const technicianExists = await User.findById({
        _id: value.technician,
      }).select("userCode");
      if (!technicianExists) {
        throw createError(404, "Technician not found");
      }
    }
    // flattenObjects(value)
    const updates = {};
    if (Object.keys(value).length > 0) {
      updates.$set = value;
    }

    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      updates,
      { new: true }
    )
      .populate("customer", "customerCode fullname email phone address")
      .populate("technician", "userCode fullname email phone")
      .populate({
        path: "spareParts",
        populate: [
          {
            path: "sparePart",
            select: "partCode brand model name displayName",
          },
          { path: "supplier", select: "supplierCode fullName displayName" },
        ],
      });

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
    console.log(search, page, limit, sort);
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
