import mongoose from "mongoose";
import SparePartEntry from "../models/sparePartEntryModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";

// ✅ Create SparePartEntry
const createSparePartEntry = async (req, res, next) => {
  try {
    const payload = req.body;

    // Validate sourceType
    if (!payload.sourceType) {
      res.status(400);
      throw new Error("Source type is required.");
    }

    if (payload.sourceType === "In-house") {
      // Must have a valid SparePart ID
      if (
        !payload.sparePart ||
        !mongoose.Types.ObjectId.isValid(payload.sparePart)
      ) {
        res.status(400);
        throw new Error("Spare Part ID is missing or invalid.");
      }

      // Clean externalPartName
      delete payload.externalPartName;

      const sparePartExists = await SparePart.findById(payload.sparePart)
        .lean()
        .select("_id");

      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    } else {
      // External must have externalPartName
      if (!payload.externalPartName) {
        res.status(400);
        throw new Error("External spare part name is required.");
      }

      // Clean sparePart reference
      delete payload.sparePart;
    }

    // Validate supplier
    if (
      !payload.supplier ||
      !mongoose.Types.ObjectId.isValid(payload.supplier)
    ) {
      res.status(400);
      throw new Error("Supplier ID is missing or invalid.");
    }

    const supplierExists = await Supplier.findById(payload.supplier)
      .lean()
      .select("_id");

    if (!supplierExists) {
      throw createError(404, "Supplier not found");
    }

    // Validate unitCost
    if (payload.unitCost === undefined || isNaN(payload.unitCost)) {
      res.status(400);
      throw new Error("Unit cost is missing or invalid.");
    }

    // Save document
    const sparePartEntry = new SparePartEntry(payload);
    const savedSparePartEntry = await (
      await sparePartEntry.save()
    ).populate("supplier", "fullName");

    if (!savedSparePartEntry) {
      res.status(400);
      throw new Error("Failed to create SparePartEntry");
    }

    response(res, savedSparePartEntry, "Spare part entry created.");
  } catch (error) {
    next(error);
  }
};

// ✅ Get SparePartEntry by ID
const getSparePartEntryById = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.speid;

    const sparePartEntry = await SparePartEntry.findById(sparePartEntryId)
      .populate("sparePart", "partCode brand model name displayName")
      .populate("supplier", "supplierCode fullName displayName");

    if (!sparePartEntry) {
      throw createError(404, "No Spare Part Entry found");
    }

    response(res, sparePartEntry, "Spare Part Entry retrieved successfully");
  } catch (error) {
    next(error);
  }
};

// ✅ Update SparePartEntry (Fixed: used `findByIdAndUpdate`, fixed logic and response)
const updateSparePartEntry = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;
    const payload = req.body;

    // Validate sourceType
    if (!payload.sourceType) {
      res.status(400);
      throw new Error("Source type is required.");
    }

    if (payload.sourceType === "In-house") {
      if (
        !payload.sparePart ||
        !mongoose.Types.ObjectId.isValid(payload.sparePart)
      ) {
        res.status(400);
        throw new Error("Spare Part ID is missing or invalid.");
      }

      delete payload.externalPartName;

      const sparePartExists = await SparePart.findById(payload.sparePart)
        .lean()
        .select("_id");

      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    } else {
      if (!payload.externalPartName) {
        res.status(400);
        throw new Error("External spare part name is required.");
      }

      delete payload.sparePart;
    }

    // Validate supplier
    if (
      !payload.supplier ||
      !mongoose.Types.ObjectId.isValid(payload.supplier)
    ) {
      res.status(400);
      throw new Error("Supplier ID is missing or invalid.");
    }

    const supplierExists = await Supplier.findById(payload.supplier)
      .lean()
      .select("_id");

    if (!supplierExists) {
      throw createError(404, "Supplier not found");
    }

    // Validate unitCost
    if (payload.unitCost === undefined || isNaN(payload.unitCost)) {
      res.status(400);
      throw new Error("Unit cost is missing or invalid.");
    }

    const updatedSparePartEntry = await SparePartEntry.findByIdAndUpdate(
      sparePartEntryId,
      payload,
      { new: true, runValidators: true }
    )
      .populate("sparePart", "partCode brand model name displayName")
      .populate("supplier", "supplierCode fullName displayName");

    if (!updatedSparePartEntry) {
      throw createError(404, "Spare Part Entry not found or update failed");
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

export default {
  createSparePartEntry,
  getSparePartEntryById,
  updateSparePartEntry,
};
