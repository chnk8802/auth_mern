import Customer from "../models/customerModel.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js";
import {
  createCustomerValidation,
  updateCustomerValidation,
} from "../validations/customer/customer.validate.js";
import {paramIdValidation, multipleIdsValidation} from '../validations/common/common.validation.js'

const createCustomer = async (req, res, next) => {
  try {
    const { error, value } = createCustomerValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const customerData = flattenObject(value.data[0]);
    const customer = new Customer(customerData);
    let savedCustomer = await customer.save();
    if (!savedCustomer) {
      throw createError(400, "Customer creation failed");
    }
    const safeCustomer = {
      _id: savedCustomer._id,
      customerCode: savedCustomer.customerCode,
      fullName: savedCustomer.fullName,
      phone: savedCustomer.phone,
      address: savedCustomer.address,
      isBulkCustomer: savedCustomer.isBulkCustomer,
      createdAt: savedCustomer.createdAt,
      updatedAt: savedCustomer.updatedAt,
    };
    response(res, safeCustomer, "Customer created successfully");
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const customers = await Customer.find().sort(sort).skip(skip).limit(limit);
    if (!customers || customers.length === 0) {
      throw createError(404, "No customers found");
    }
    
    const totalRecords = await Customer.countDocuments({});
    response(res, customers, "Customers fetched successfully", {
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

const getCustomer = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const customer = await Customer.findById(id);
    if (!customer) {
      throw createError(404, "Customer not found");
    }
    response(res, customer, "Customer fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    const { error, value } = updateCustomerValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const customerUpdates = flattenObject(value.data[0])

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      customerUpdates,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCustomer) {
      throw createError(404, "Customer not found");
    }

    response(res, updatedCustomer, "Customer updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { error, value } = multipleIdsValidation.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await Customer.findByIdAndDelete(value.id);
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

const deleteCustomers = async (req, res, next) => {
  try {
    const { error, value } = multipleIdsValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await Customer.deleteMany({ _id: { $in: value.ids } });

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

const duplicateCustomers = async (req, res, next) => {
  try {
    const { error, value } = duplicateMultipleValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const duplicated = await Customer.find({ _id: { $in: value.ids } });
    if (!duplicated || duplicated.length === 0) {
      throw createError(404, "No records found for duplication");
    }

    const duplicationPromises = duplicated.map(async (record) => {
      const { error, value } = createCustomerValidation.validate(
        {
          fullName: record.fullName,
          phone: record.phone,
          address: record.address,
          isBulkCustomer: record.isBulkCustomer,
        },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        throw createError(400, error.details.map((d) => d.message).join(", "));
      }

      const newRecord = new Customer(value);
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
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  deleteCustomers,
  duplicateCustomers,
};
