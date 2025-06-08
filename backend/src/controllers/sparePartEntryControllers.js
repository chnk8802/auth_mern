import mongoose from "mongoose";
import SparePartEntry from "../models/sparePartEntryModel.js";
import SparePart from "../models/sparePartModel.js";
import Supplier from "../models/supplierModel.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const createSparePartEntry = async (req, res, next) => {
  try {
    const payload = req.body;

    // Check sourceType
    if (!payload.sourceType) {
      res.status(400);
      throw new Error("Source type is required.");
    }

    // In-house source: sparePart ID must be valid
    if (payload.sourceType === "In-house") {
      if (
        !payload.sparePart ||
        !mongoose.Types.ObjectId.isValid(payload.sparePart)
      ) {
        res.status(400);
        throw new Error("Spare Part ID is missing or invalid.");
      }
      delete payload.externalPartName;
    } else {
      // External source: externalPartName must be present
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

    // Validate unitCost
    if (payload.unitCost === undefined || isNaN(payload.unitCost)) {
      res.status(400);
      throw new Error("Unit cost is missing or invalid.");
    }

    // Create the SparePartEntry document
    const sparePartEntry = new SparePartEntry(payload);
    const savedSparePartEntry = (await sparePartEntry.save()).populate("supplier", "fullName");
    if (!savedSparePartEntry) {
      res.status(400);
      throw new Error("Failed to create SparePartEntry");
    }

    sendFormattedResponse(
      res,
      savedSparePartEntry,
      "Spare part entry created."
    );
  } catch (error) {
    next(error);
  }
};

const getSparePartEntryById = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;
    if (!sparePartEntryId) {
      res.status(400);
      throw new Error("spare Part Entry ID is missing.");
    }
    const sparePartEntry = await SparePart.findById({ _id: sparePartEntryI });
    if (!sparePartEntry) {
      res.status(404);
      throw new Error("No Spare Part Entry found");
    }
    sendFormattedResponse(
      res,
      sparePartEntry,
      "Spare Part Entry retreived successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateSparePartEntry = async (req, res, next) => {
  try {
    const sparePartEntryId = req.params.id;
    const { sourceType, sparePart, externalPartName, supplier, unitCost } =
      req.body;

    const updatedSparePartEntry = await findByIdAndUpdate(
      { _id: sparePartEntryId },
      { sourceType, sparePart, externalPartName, supplier, unitCost }
    );

    if (!updateSparePartEntry) {
      res.status(400);
      throw new Error("Spare Part Entry not updated");
    }

    sendFormattedResponse(
      res,
      updateSparePartEntry,
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
