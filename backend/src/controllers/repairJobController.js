import RepairJob from "../models/repairJobModel.js";
import Customer from "../models/customerModel.js";

import { sendFormattedResponse } from "../utils/responseFormatter.js";

const createRepairJob = async (req, res, next) => {
  try {
    const {
      customer,
      deviceModel,
      issueDescription,
      repairType,
      deviceComponents,
      repairCost,
      discount,
      notes,
    } = req.body;
    if (!customer || !deviceModel || !issueDescription || !repairCost) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
      res.status(404);
      throw new Error("Customer not found");
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
    let savedRepairJob = await newRepairJob.save();

    if (!savedRepairJob) {
      res.status(500);
      throw new Error("Failed to create repair job");
    }

    const totalRecords = await RepairJob.countDocuments({});
    res.status(201);
    sendFormattedResponse(
      res,
      savedRepairJob,
      "Repair job created successfully",
      { page: 1, pageSize: 10, totalRecords }
    );
  } catch (error) {
    next(error);
  }
};

const getAllRepairJobs = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 }, // Sort by creation date, newest first
    };
    const repairJobs = await RepairJob.find({})
      .sort(paginationOptions.sort)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    if (!repairJobs || repairJobs.length === 0) {
      res.status(404);
      throw new Error("No repair jobs found");
    }
    const totalRecords = await RepairJob.countDocuments({});

    res.status(200);
    sendFormattedResponse(
      res,
      repairJobs,
      "Repair jobs retrieved successfully",
      {
        pagination: {
          page: paginationOptions.page,
          pageSize: paginationOptions.limit,
          total: totalRecords,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const getRepairJobById = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    const repairJob = await RepairJob.findById(repairJobId);

    if (!repairJob) {
      res.status(404);
      throw new Error("Repair job not found");
    }

    res.status(200);
    sendFormattedResponse(res, repairJob, "Repair job retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateRepairJobstatus = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    const { repairStatus } = req.body;
    const repairJob = await RepairJob.findById({ _id: repairJobId });
    if (!repairJob) {
      res.status(404);
      throw new Error("Repair job not found");
    }

    if (repairJob.repairStatus === repairStatus) {
      res.status(400);
      throw new Error(
        "Repair job status is already set to the requested status"
      );
    }

    if (!repairStatus) {
      res.status(400);
      throw new Error("Repair status is required");
    }

    const updateData = { repairStatus };

    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      updateData,
      { new: true }
    ).select("_id repairJobCode repairStatus");

    if (!updatedRepairJob) {
      res.status(404);
      throw new Error("Repair job not found");
    }

    res.status(200);
    sendFormattedResponse(
      res,
      updatedRepairJob,
      "Repair job status updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateRepairJob = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    const { repairStatus, technician, sparePartsUsed, notes } = req.body;

    const updateData = {};
    if (repairStatus) updateData.repairStatus = repairStatus;
    if (technician) updateData.technician = technician;
    if (sparePartsUsed) updateData.sparePartsUsed = sparePartsUsed;
    if (notes) updateData.notes = notes;

    const updatedRepairJob = await RepairJob.findByIdAndUpdate(
      repairJobId,
      updateData,
      { new: true }
    )
      .populate("customer", "fullname email phone")
      .populate("technician", "fullname email phone")
      .populate("sparePartsUsed.sparePart", "name unitCost")
      .populate("sparePartsUsed.supplier", "name address phone");

    if (!updatedRepairJob) {
      res.status(404);
      throw new Error("Repair job not found");
    }

    res.status(200);
    sendFormattedResponse(
      res,
      updatedRepairJob,
      "Repair job updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteRepairJobs = async (req, res, next) => {
  try {
    const repairJobIds = req.body.ids;
    if (!repairJobIds || !Array.isArray(repairJobIds)) {
      res.status(400);
      throw new Error("Repair job IDs are required");
    }
    const deletedRepairJobs = await RepairJob.deleteMany({
      _id: { $in: repairJobIds },
    });
    if (!deletedRepairJobs) {
      res.status(404);
      throw new Error("No repair jobs found");
    }
    res.status(200);
    sendFormattedResponse(
      res,
      deletedRepairJobs,
      "Repair jobs deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteRepairJob = async (req, res, next) => {
  try {
    const repairJobId = req.params.id;
    if (!repairJobId) {
      res.status(400);
      throw new Error("Repair job ID is required");
    }
    const deletedRepairJob = await RepairJob.findByIdAndDelete(
      repairJobId
    ).select("_id repairJobCode");

    if (!deletedRepairJob) {
      res.status(404);
      throw new Error("Repair job not found");
    }

    res.status(200);
    sendFormattedResponse(
      res,
      deletedRepairJob,
      "Repair job deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

const searchRepairJobs = async (req, res, next) => {
  try {
    const { page, pageSize, repairJobCode, customer, technician, deviceModel } =
      req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 }, // Sort by creation date, newest first
    };
    const searchCriteria = {};
    if (repairJobCode) {
      searchCriteria.repairJobCode = { $regex: repairJobCode, $options: "i" };
    }
    if (customer) {
      searchCriteria.customer = customer;
    }
    if (technician) {
      searchCriteria.technician = technician;
    }
    if (deviceModel) {
      searchCriteria.deviceModel = { $regex: deviceModel, $options: "i" };
    }

    const repairJobs = await RepairJob.find(searchCriteria)
      .sort(paginationOptions.sort)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    if (!repairJobs || repairJobs.length === 0) {
      res.status(404);
      throw new Error("No repair jobs found");
    }
    const totalRecords = await RepairJob.countDocuments(searchCriteria);
    res.status(200);
    sendFormattedResponse(
      res,
      repairJobs,
      "Repair jobs retrieved successfully",
      {
        pagination: {
          page: paginationOptions.page,
          pageSize: paginationOptions.limit,
          total: totalRecords,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createRepairJob,
  getAllRepairJobs,
  getRepairJobById,
  updateRepairJobstatus,
  updateRepairJob,
  deleteRepairJobs,
  deleteRepairJob,
  searchRepairJobs,
};
