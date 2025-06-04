import Customer from "../models/customerModel.js";
import flattenObject from "../utils/flattenObject.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const createCustomer = async (req, res, next) => {
  try {
    const { fullName, phone, address, isBulkCustomer } = req.body;
    const customer = new Customer({ fullName, phone, address, isBulkCustomer });
    let savedCustomer = await customer.save();
    if (!savedCustomer) {
      res.status(400);
      throw new Error("Customer creation failed");
    }
    savedCustomer = {
      _id: savedCustomer._id,
      customerCode: savedCustomer.customerCode,
      fullName: savedCustomer.fullName,
      phone: savedCustomer.phone,
      address: savedCustomer.address,
      isBulkCustomer: savedCustomer.isBulkCustomer,
      createdAt: savedCustomer.createdAt,
      updatedAt: savedCustomer.updatedAt,
    };
    sendFormattedResponse(res, savedCustomer, "Customer created successfully");
  } catch (error) {
    next(error);
  }
}

 const getCustomers = async (req, res, next) => {
  try {
    const { page, pageSize} = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 } // Sort by creation date, newest first
    };
    const customers = await Customer.find()
      .select("_id customerCode fullName phone address isBulkCustomer createdAt updatedAt")
      .sort(paginationOptions.sort)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    if (!customers || customers.length === 0) {
      res.status(404);
      throw new Error("No customers found");
    }
    const totalRecords = await Customer.countDocuments({});
    sendFormattedResponse(res, customers, "Customers fetched successfully", {
      page: paginationOptions.page,
      pageSize: paginationOptions.limit,
      total: totalRecords
    });
  } catch (error) {
    next(error);
  }
}

const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    if (!customerId) {
      res.status(400);
      throw new Error("Customer ID is required");
    }
    let customer = await Customer.findById(customerId).select("-__v");
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    customer = {
      _id: customer._id,
      customerCode: customer.customerCode,
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      isBulkCustomer: customer.isBulkCustomer,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
    sendFormattedResponse(res, customer, "Customer fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const updates = req.body;
    if (!customerId) {
      res.status(400);
      throw new Error("Customer ID is required");
    }
    if (!updates || Object.keys(updates).length === 0) {
      res.status(400);
      throw new Error("No updates provided");
    }

    const customer = await Customer.findByIdAndUpdate(customerId, updates, {
      new: true,
      runValidators: true,
    }).select("-__v");
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    const updatedCustomer = {
      _id: customer._id,
      customerCode: customer.customerCode,
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      isBulkCustomer: customer.isBulkCustomer,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };

    sendFormattedResponse(res, updatedCustomer, "Customer updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    if (!customerId) {
      res.status(400);
      throw new Error("Customer ID is required");
    }
    
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    const deletedCustomer = {
      _id: customer._id,
      customerCode: customer.customerCode,
    };
    sendFormattedResponse(res, deletedCustomer, "Customer deleted successfully");
  } catch (error) {
    next(error);
  }
};

const duplicateCustomers = async (req, res, next) => {
  try {
    const {_ids} = req.body;
    if (!Array.isArray(_ids) || _ids.length === 0) {
      res.status(400);
      throw new Error("Customer IDs array is required");
    }

    const customers = await Customer.find({ _id: { $in: _ids } }).select("-__v");
    if (!customers || customers.length === 0) {
      res.status(404);
      throw new Error("Customer not found");
    }
    const duplicationPromises = customers.map(async (customer) => {
      const newCustomer = new Customer({
        fullName: customer.fullName,
        phone: customer.phone,
        address: customer.address,
        isBulkCustomer: customer.isBulkCustomer,
      });

      let savedCustomer = await newCustomer.save();
      if (!savedCustomer) {
        res.status(400);
        throw new Error("Customer duplication failed");
      }
      
      return savedCustomer;
    });

    const duplicatedCustomers = await Promise.all(duplicationPromises);
    duplicatedCustomers.forEach((customer, index) => {
      duplicatedCustomers[index] = {
        _id: customer._id,
        customerCode: customer.customerCode,
        fullName: customer.fullName,
        phone: customer.phone,
        address: flattenObject(customer.address),
        isBulkCustomer: customer.isBulkCustomer,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      };
    });
    sendFormattedResponse(res, duplicatedCustomers, "Customers duplicated successfully");
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
  duplicateCustomers,
};