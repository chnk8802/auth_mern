import Supplier from "../models/supplierModel.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js";
import {
  createSupplierValidation,
  updateSupplierValidation,
} from "../validations/supplier/supplier.validation.js";
import {paramIdValidation, multipleIdsValidation} from '../validations/common/common.validation.js'

const createSupplier = async (req, res, next) => {
  try {
    const { error, value } = createSupplierValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const supplierData = value.data[0]
    const supplier = new Supplier(supplierData);
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

    const totalRecords = await Supplier.countDocuments();

    response(res, suppliers, "Suppliers retrieved successfully", {
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
    const { error, value } = updateSupplierValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const supplierUpdates = flattenObject(value.data[0]);

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      supplierUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      throw createError(404, "Supplier not found");
    }

    response(res, updatedSupplier, "Supplier updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { error, value } = multipleIdsValidation.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await Supplier.findByIdAndDelete(value.id);
    if (!result) {
      throw createError(404, "Record not found");
    }

    const deletedresult = {
      _id: result._id,
    };

    response(res, deletedresult, "Record deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deleteSuppliers = async (req, res, next) => {
  try {
    const { error, value } = multipleIdsValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await Supplier.deleteMany({ _id: { $in: value.ids } });

    if (result.deletedCount === 0) {
      throw createError(404, "No records found for deletion");
    }

    response(
      res,
      { deletedCount: result.deletedCount },
      "Records deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

const duplicateSuppliers = async (req, res, next) => {
  try {
    const { error, value } = duplicateMultipleValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const duplicated = await Supplier.find({ _id: { $in: value.ids } });
    if (!duplicated || duplicated.length === 0) {
      throw createError(404, "No records found for duplication");
    }

    const duplicationPromises = duplicated.map(async (record) => {
      const { error, value } = createSupplierValidation.validate(
        {
          fullName: record.fullName,
          phone: record.phone,
          address: record.address,
        },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        throw createError(400, error.details.map((d) => d.message).join(", "));
      }

      const newRecord = new Supplier(value);
      let savedRecord = await newRecord.save();
      if (!savedRecord) {
        throw createError(400, "Duplication failed");
      }

      return savedRecord;
    });

    const duplicatedRecords = await Promise.all(duplicationPromises);

    response(res, duplicatedRecords, "Customers duplicated successfully");
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
  deleteSuppliers,
  duplicateSuppliers
};
