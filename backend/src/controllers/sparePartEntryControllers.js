import SparePartEntry from "../models/sparePartEntryModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";
import {
  createSparePartEntrySchema,
  updateSparePartEntrySchema,
} from "../validations/sparePartEntry/sparePartEntry.validation.js";

const createSparePartEntry = async (req, res, next) => {
  try {
    const { error, value } = createSparePartEntrySchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    if (value.sparePart) {
      const sparePartExists = await SparePart.findById(value.sparePart)
        .lean()
        .select("_id");

      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    }
    const supplierExists = await Supplier.findById(value.supplier)
      .lean()
      .select("_id");

    if (!supplierExists) {
      throw createError(404, "Supplier not found");
    }

    const sparePartEntry = new SparePartEntry(value);
    const savedSparePartEntry = await sparePartEntry.save();
    if (!savedSparePartEntry) {
      res.status(400);
      throw new Error("Failed to create SparePartEntry");
    }

    response(res, savedSparePartEntry, "Spare part entry created.");
  } catch (error) {
    next(error);
  }
};

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

const updateSparePartEntry = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.speid;

    const { error, value } = updateSparePartEntrySchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const existingEntry = await SparePartEntry.findById(sparePartEntryId);
    if (!existingEntry) {
      throw createError(404, "Spare Part Entry not found");
    }

    if (value.sparePart) {
      const sparePartExists = await SparePart.findById(value.sparePart)
        .lean()
        .select("_id");
      if (!sparePartExists) {
        throw createError(404, "Spare Part not found");
      }
    }

    if (value.supplier) {
      const supplierExists = await Supplier.findById(value.supplier)
        .lean()
        .select("_id");
      if (!supplierExists) {
        throw createError(404, "Supplier not found");
      }
    }
    // MongoDB update Object
    const updatePayload = { $set: value, $unset: {} };
    const sourceTypeChanged =
      value.sourceType && value.sourceType !== existingEntry.sourceType;

    if (sourceTypeChanged) {
      if (value.sourceType === "In-house" && existingEntry.externalPartName) {
        updatePayload.$unset.externalPartName = "";
      } else if (value.sourceType === "External" && existingEntry.sparePart) {
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
    )
      .populate("sparePart", "partCode brand model name displayName")
      .populate("supplier", "supplierCode fullName displayName");

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
    const sparePartEntryId = req.params.speid;

    const existingEntry = await SparePartEntry.findById({
      _id: sparePartEntryId,
    })
      .lean()
      .select("_id");
    if (!existingEntry) {
      throw createError("No Spare Part Entry Found.");
    }
    const deletedSparePartEntry = await findByIdAndDelete({
      _id: sparePartEntryId,
    });
    if (!deletedSparePartEntry) {
      throw createError("Could not delete Spare Part Entry");
    }
    deleteSparePartEntry = {
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
  getSparePartEntryById,
  updateSparePartEntry,
};
