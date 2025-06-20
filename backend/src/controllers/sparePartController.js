import SparePart from "../models/sparePartModel.js";
import response from "../utils/response.js";
import { createSparePartValidation } from "../validations/sparePart/sparePart.validation.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import { paramIdValidation, multipleIdsValidation } from "../validations/common/common.validation.js";

const createSparePart = async (req, res, next) => {
  try {
    const { error, value } = createSparePartValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const sparePart = new SparePart(value);

    let savedSparePart = await sparePart.save();

    if (!savedSparePart) {
      throw createError(400, "Failed to create spare part");
    }

    response(res, savedSparePart, "Spare part created successfully");
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
    const { brand, model, name, partType, costPrice, stockQty, supplier } =
      req.body;
    const sparePart = await SparePart.findByIdAndUpdate(
      req.params.id,
      { brand, model, name, partType, costPrice, stockQty, supplier },
      { new: true, runValidators: true }
    );
    if (!sparePart) {
      res.status(404);
      throw new Error("Spare part not found");
    }
    response(res, sparePart, "Spare part updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteSparePart = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Spare part ID is required");
    }
    let sparePart = await SparePart.findByIdAndDelete(id);
    if (!sparePart) {
      res.status(404);
      throw new Error("Spare part not found");
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

const searchSpareParts = async (req, res, next) => {
  try {
    const { partCode, name, brand, partType, page, pageSize } = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 }, // Sort by creation date, newest first
    };

    // Build dynamic query only with defined fields
    const searchConditions = [];
    if (partCode)
      searchConditions.push({ partCode: { $regex: partCode, $options: "i" } });
    if (name) searchConditions.push({ name: { $regex: name, $options: "i" } });
    if (brand)
      searchConditions.push({ brand: { $regex: brand, $options: "i" } });
    if (partType)
      searchConditions.push({ partType: { $regex: partType, $options: "i" } });

    if (searchConditions.length === 0) {
      res.status(400);
      throw new Error(
        "At least one search parameter (name, brand, partType) is required"
      );
    }

    const spareParts = await SparePart.find({ $or: searchConditions })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.sort);

    if (!spareParts.length) {
      res.status(404);
      throw new Error("No spare parts found matching the search criteria");
    }
    const totalRecords = await SparePart.countDocuments({
      $or: searchConditions,
    });

    response(res, spareParts, "Spare parts retrieved successfully", {
      pagination: {
        page: paginationOptions.page,
        pageSize: paginationOptions.limit,
        total: totalRecords,
      },
    });
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
  searchSpareParts,
};
