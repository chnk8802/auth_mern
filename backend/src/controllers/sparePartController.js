import SparePart from "../models/sparePartModel.js";
import response from "../utils/response.js";
import {
  createSparePartValidation,
  updateSparePartValidation,
} from "../validations/sparePart/sparePart.validation.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import { paramIdValidation } from "../validations/common/common.validation.js";

const createSparePart = async (req, res, next) => {
  try {
    const { error, value } = createSparePartValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const sparePart = value.data[0];
    const existingParts = await SparePart.find({
        brand: sparePart.brand,
        model: sparePart.model,
        partName: sparePart.partName,
        partType: sparePart.partType,
      });

    if (existingParts.length > 0) {
      throw createError(
        400,
        `${existingParts[0].brand} ${existingParts[0].model} ${existingParts[0].partName} ${existingParts[0].partType} already exists`
      );
    }
    const savedSpareParts = new SparePart(sparePart);
    await savedSpareParts.save();
    if (!savedSpareParts || savedSpareParts.length === 0) {
      throw createError(400, "Failed to create spare parts");
    }

    response(res, savedSpareParts, "Spare parts created successfully");
  } catch (error) {
    next(error);
  }
};

const getSpareParts = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const spareParts = await SparePart.find({})
      .skip(skip)
      .limit(limit)
      .sort(sort);
    if (!spareParts || spareParts.length === 0) {
      throw createError(404, "No spare parts found");
    }
    const totalRecords = await SparePart.countDocuments();
    response(res, spareParts, "Spare parts retrieved successfully", {
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

const getSparePart = async (req, res, next) => {
  try {
    const { error, value } = paramIdValidation.validate(req.params, {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const sparePart = await SparePart.findById(value.id);
    if (!sparePart) {
      throw createError(404, "Spare part not found");
    }
    response(res, sparePart, "Spare part retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateSparePart = async (req, res, next) => {
  try {
    const sparePartId = req.params.id;
    const { error, value } = updateSparePartValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const sparePart = await SparePart.findByIdAndUpdate(sparePartId, value, {
      new: true,
      runValidators: true,
    });
    if (!sparePart) {
      throw createError(404, "Spare part not found");
    }
    response(res, sparePart, "Spare part updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteSparePart = async (req, res, next) => {
  try {
    const sparePartId = req.params.id;
    if (!sparePartId) {
      throw createError(400, "Spare part ID is required");
    }
    let sparePart = await SparePart.findByIdAndDelete(sparePartId);
    if (!sparePart) {
      throw createError(404, "Spare part not found");
    }

    sparePart = {
      _id: sparePart._id,
      partCode: sparePart.partCode,
    };
    response(res, sparePart, "Spare part deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  createSparePart,
  getSpareParts,
  getSparePart,
  updateSparePart,
  deleteSparePart,
};
