import Customer from "../models/customerModel.js";

const addCustomer = async (req, res, next) => {
  try {
    const payload = req.body;
    const existingCustomer = await Customer.findOne({
      name: payload.name,
    });
    console.log({ existingCustomer });
    if (existingCustomer) {
      return next(new Error("Duplicate Customer name not allowed."));
    }
    const newCustomer = new Customer(payload);
    await newCustomer.save();
    res.status(201).json({
      status: "Success",
      data: newCustomer,
      message: "Customer created successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error)
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    let { page, pageSize } = req.query;

    const totalRecords = await Customer.countDocuments({});
    const customers = await Customer.find({})
      .select("-__v")
      .limit(pageSize)
      .skip(page * pageSize);
    res.status(201).json({
      status: "Success",
      totalRecords: totalRecords,
      dataCount: customers.length,
      data: customers,
      message: "Customers fetched successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error)
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw next(new Error("No customer found"));
    }
    res.status(200).json({ customer });
  } catch (error) {
    next(error)
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const customerData = req.body;
    
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw next(new Error("No customer found"));
    }
    await Customer.updateOne({ _id: customerId }, customerData);
    
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new next(Error("No customer found"));
    }
    await Customer.deleteOne({_id: customerId})
    res.status(201).json({})
  } catch (error) {
    next(error)
  }
};

export default {
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
