import Customer from "../models/customerModel.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js"
import {
  createCustomerSchema,
  deleteMultipleCustomersSchema,
  deleteSingleCustomerSchema,
  duplicateMultipleCustomersSchema,
  updateCustomerSchema,
} from "../validations/customer/customer.validate.js";

const createCustomer = async (req, res, next) => {
  try {
    const { error, value } = createCustomerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const customer = new Customer(value);
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
        total: totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    if (!customerId) {
      throw createError(400, "Customer ID is required");
    }
    const customer = await Customer.findById(customerId);
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

    const { error, value } = updateCustomerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const flattenedUpdates = flattenObject(value);

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      flattenedUpdates,
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
    const { error, value } = deleteSingleCustomerSchema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const customer = await Customer.findByIdAndDelete(value.id);
    if (!customer) {
      throw createError(404, "Customer not found");
    }

    const deletedCustomer = {
      _id: customer._id,
      customerCode: customer.customerCode,
    };

    response(res, deletedCustomer, "Customer deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deleteCustomers = async (req, res, next) => {
  try {
    const { error, value } = deleteMultipleCustomersSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await Customer.deleteMany({ _id: { $in: value.ids } });

    if (result.deletedCount === 0) {
      throw createError(404, "No customers found for deletion");
    }

    response(res, { deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
};

const duplicateCustomers = async (req, res, next) => {
  try {
    const { error, value } = duplicateMultipleCustomersSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }
    const customers = await Customer.find({ _id: { $in: value.ids } });
    if (!customers || customers.length === 0) {
      throw createError(404, "No customers found for duplication");
    }

    const duplicationPromises = customers.map(async (customer) => {
      const { error, value } = createCustomerSchema.validate(
        {
          fullName: customer.fullName,
          phone: customer.phone,
          address: customer.address,
          isBulkCustomer: customer.isBulkCustomer,
        },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        throw createError(400, error.details.map((d) => d.message).join(", "));
      }

      const newCustomer = new Customer(value);
      let savedCustomer = await newCustomer.save();
      if (!savedCustomer) {
        throw createError(400, "Customer duplication failed");
      }

      return savedCustomer;
    });

    const duplicatedCustomers = await Promise.all(duplicationPromises);

    response(res, duplicatedCustomers, "Customers duplicated successfully");
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
