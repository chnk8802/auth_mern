import SparePartEntry from "../models/sparePartEntryModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";
import {
  createSparePartEntryValidation,
  updateSparePartEntryValidation,
} from "../validations/repairJob/sparePartEntry/sparePartEntry.validation.js";
import { getPaginationOptions } from "../utils/pagination.js";
import RepairJob from "../models/repairJobModel.js";
import flattenObject from "../utils/flattenObject.js";

const createSparePartEntry = async (req, res, next) => {
  try {
    const { error, value } = createSparePartEntryValidation.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const sparePartEntryData = flattenObject(value.data[0]);

    const repairJobExists = await RepairJob.findById(
      sparePartEntryData.repairJob
    ).select("_id");
    if (!repairJobExists) {
      throw createError(404, "Repair Job not found or invalid reference.");
    }

    if (sparePartEntryData.sparePart) {
      const sparePartExists = await SparePart.findById(
        sparePartEntryData.sparePart
      )
        .select("_id")
        .lean();
      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    }

    const supplierExists = await Supplier.findById(sparePartEntryData.supplier)
      .select("_id")
      .lean();
    if (!supplierExists) {
      throw createError(404, "Supplier not found");
    }

    const sparePartEntry = new SparePartEntry(sparePartEntryData);

    const savedSparePartEntry = await sparePartEntry.save();
    if (!savedSparePartEntry) {
      throw createError(400, "Failed to create SparePartEntry");
    }

    const updateRepairJob = await RepairJob.findByIdAndUpdate(
      sparePartEntryData.repairJob,
      { $push: { sparePartEntries: savedSparePartEntry._id } },
      { new: true }
    );
    console.log(updateRepairJob);
    if (!updateRepairJob) {
      throw createError(
        400,
        "Spare Part Entry created but not appended to Repair Job"
      );
    }

    response(res, savedSparePartEntry, "Spare part entry created.");
  } catch (error) {
    next(error);
  }
};

const getAllSparePartEntries = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);
    const sparePartEntries = await SparePartEntry.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "repairJob",
          select: "repairJobCode repairStatus",
        },
        {
          path: "sparePart",
          select: "partCode",
        },
        {
          path: "supplier",
          select: "supplierCode fullName",
        },
      ]);

    if (!sparePartEntries) {
      throw createError(404, "No entries found");
    }
    const totalRecords = await SparePartEntry.countDocuments({});
    response(res, sparePartEntries, "Repair jobs retrieved successfully", {
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

const getSparePartEntryById = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;

    const sparePartEntry = await SparePartEntry.findById(
      sparePartEntryId
    ).populate([
      {
        path: "repairJob",
        select: "repairJobCode repairStatus",
      },
      {
        path: "sparePart",
        select: "partCode",
      },
      {
        path: "supplier",
        select: "supplierCode fullName",
      },
    ]);
    if (!sparePartEntry) {
      throw createError(404, "No Spare Part Entry found");
    }

    response(res, sparePartEntry, "Spare Part Entry retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateSparePartEntry = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;
    
    const { error, value } = updateSparePartEntryValidation.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    console.log(value)
    const sparePartEntryData = value.data[0];
    const existingEntry = await SparePartEntry.findById(sparePartEntryId);
    if (!existingEntry) {
      throw createError(404, "Spare Part Entry not found");
    }

    if (sparePartEntryData.sparePart) {
      const sparePartExists = await SparePart.findById(
        sparePartEntryData.sparePart
      )
        .lean()
        .select("_id");
      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    }

    if (sparePartEntryData.supplier) {
      const supplierExists = await Supplier.findById(
        sparePartEntryData.supplier
      )
        .lean()
        .select("_id");
      if (!supplierExists) {
        throw createError(404, "Supplier not found");
      }
    }
    // MongoDB update Object
    const updatePayload = { $set: sparePartEntryData, $unset: {} };
    const sourceTypeChanged =
      sparePartEntryData.sourceType &&
      sparePartEntryData.sourceType !== existingEntry.sourceType;

    if (sourceTypeChanged) {
      if (
        sparePartEntryData.sourceType === "in_house" &&
        existingEntry.externalPartName
      ) {
        updatePayload.$unset.externalPartName = "";
      } else if (
        sparePartEntryData.sourceType === "external" &&
        existingEntry.sparePart
      ) {
        updatePayload.$unset.sparePart = "";
      }
    }

    if (Object.keys(updatePayload.$unset).length === 0) {
      delete updatePayload.$unset;
    }

    // Perform update
    const updatedSparePartEntry = await SparePartEntry.findByIdAndUpdate(
      sparePartEntryId,
      updatePayload,
      { new: true, runValidators: true }
    ).populate([
      {
        path: "sparePart",
        select: "partCode",
      },
      {
        path: "supplier",
        select: "supplierCode fullName",
      },
    ]);

    if (!updatedSparePartEntry) {
      throw createError(404, "Spare Part Entry update failed");
    }

    response(
      res,
      updatedSparePartEntry,
      "Spare Part Entry updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteSparePartEntry = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;

    const existingEntry = await SparePartEntry.findById({
      _id: sparePartEntryId,
    })
      .lean()
      .select("_id");
    if (!existingEntry) {
      throw createError("No Spare Part Entry Found.");
    }

    let deletedSparePartEntry = await SparePartEntry.findByIdAndDelete(
      sparePartEntryId
    );

    if (!deletedSparePartEntry) {
      throw createError(400, "Could not delete Spare Part Entry");
    }

    deletedSparePartEntry = {
      _id: deleteSparePartEntry._id,
    };

    response(
      res,
      deleteSparePartEntry,
      "Spare Part Entry deleted successfully."
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createSparePartEntry,
  getAllSparePartEntries,
  getSparePartEntryById,
  updateSparePartEntry,
  deleteSparePartEntry,
};
