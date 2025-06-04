import e from "express";
import SparePart from "../models/sparePartModel.js";
import {sendFormattedResponse} from "../utils/responseFormatter.js";

// Create a new spare part
const createSparePart = async (req, res, next) => {
  try {
    const { name, brand, model, partType, costPrice, stockQty, supplier } = req.body;
    const sparePart = new SparePart({
      brand,
      name,
      model,
      partType,
      costPrice,
      stockQty,
      supplier
    });
    let savedSparePart = await sparePart.save();
    if (!savedSparePart) {
      res.status(400);
      throw new Error("Failed to create spare part");
    }
    savedSparePart = {
      _id: savedSparePart._id,
      partCode: savedSparePart.partCode,
      brand: savedSparePart.brand,
      model: savedSparePart.model,
      name: savedSparePart.name,
      partType: savedSparePart.partType,
      costPrice: savedSparePart.costPrice,
      stockQty: savedSparePart.stockQty,
      createdAt: savedSparePart.createdAt,
      updatedAt: savedSparePart.updatedAt
    }

    sendFormattedResponse(res, savedSparePart, "Spare part created successfully");
  } catch (error) {
    next(error);
  }
};
const getSpareParts = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 } // Sort by creation date, newest first
    };

    const spareParts = await SparePart.find().select("-__v").populate("supplier", "name")
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.sort);
    const totalSpareParts = await SparePart.countDocuments();
    sendFormattedResponse(res, spareParts, "Spare parts retrieved successfully", {
      page: paginationOptions.page,
      pageSize: paginationOptions.limit,
      total: totalSpareParts
    });
  } catch (error) {
    next(error);
  }
};
const getSparePart = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Spare part ID is required");
    }
    const sparePart = await SparePart.findById(id).select("-__v").populate("supplier", "name");
    if (!sparePart) {
      res.status(404);
      throw new Error("Spare part not found");
    }
    sendFormattedResponse(res, sparePart, "Spare part retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateSparePart = async (req, res, next) => {
  try {
    const { brand, model, name, partType, costPrice, stockQty, supplier } = req.body;
    const sparePart = await SparePart.findByIdAndUpdate(
      req.params.id,
      { brand, model, name, partType, costPrice, stockQty, supplier },
      { new: true, runValidators: true }
    ).select("-__v").populate("supplier", "name");
    if (!sparePart) {
      res.status(404);
      throw new Error("Spare part not found");
    }
    sendFormattedResponse(res, sparePart, "Spare part updated successfully");
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
      partCode: sparePart.partCode
    }
    sendFormattedResponse(res, sparePart, "Spare part deleted successfully");
  } catch (error) {
    next(error);
  }
};

const searchSpareParts = async (req, res, next) => {
  try {
    const { partCode, name, brand, partType, page, pageSize } = req.query;
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 } // Sort by creation date, newest first
    };

    // Build dynamic query only with defined fields
    const searchConditions = [];
    if (partCode) searchConditions.push({ partCode: { $regex: partCode, $options: "i" } });
    if (name) searchConditions.push({ name: { $regex: name, $options: "i" } });
    if (brand) searchConditions.push({ brand: { $regex: brand, $options: "i" } });
    if (partType) searchConditions.push({ partType: { $regex: partType, $options: "i" } });

    if (searchConditions.length === 0) {
      res.status(400);
      throw new Error("At least one search parameter (name, brand, partType) is required");
    }

    const spareParts = await SparePart.find({ $or: searchConditions }).select("-__v")
      .populate("supplier", "name")
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.sort);

    if (!spareParts.length) {
      res.status(404);
      throw new Error("No spare parts found matching the search criteria");
    }
    const totalSpareParts = await SparePart.countDocuments({ $or: searchConditions });

    sendFormattedResponse(res, spareParts, "Spare parts retrieved successfully", {
      page: paginationOptions.page,
      pageSize: paginationOptions.limit,
      total: totalSpareParts
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
  searchSpareParts
}