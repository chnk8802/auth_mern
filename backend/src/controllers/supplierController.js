import Supplier from "../models/supplierModel.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import response from "../utils/response.js";
import { createSupplierSchema } from "../validations/supplier/supplier.validation.js";

const createSupplier = async (req, res, next) => {
  try {
    const { error, value } = createSupplierSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const supplier = new Supplier(value);
    const savedSupplier = await supplier.save();
    if (!savedSupplier) {
      throw createError(400, "Failed to create supplier");
    }

    response(res, savedSupplier, "Supplier created successfully");
  } catch (error) {
    next(error);
  }
};

const getSuppliers = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const suppliers = await Supplier.find().skip(skip).limit(limit).sort(sort);

    if (!suppliers || suppliers.length === 0) {
      throw createError(404, "No suppliers found");
    }

    const totalCount = await Supplier.countDocuments();

    response(res, suppliers, "Suppliers retrieved successfully", {
      pagination: {
        page,
        limit,
        totalCount: totalCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      throw createError(404, "Supplier not found");
    }
    response(res, supplier, "Supplier retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, phone, address } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { fullName, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }

    response(res, updatedSupplier, "Supplier updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }
    deletedSupplier = {
      _id: deletedSupplier._id,
      supplierCode: deletedSupplier.supplierCode,
    };
    response(res, deletedSupplier, "Supplier deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
