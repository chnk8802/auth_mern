import Customer from "../models/customerModel.js";

const addCustomer = async (req, res, next) => {
    try {
        const payload = req.body
        const existingCustomer = await Customer.findOne({ customerName: payload.customerName });
        if (existingCustomer) {
            return next(new Error("Duplicate Customer name not allowed."));
        }
        const newCustomer = new Customer(payload)
        await newCustomer.save()
        res.status(201).json({
            status: "Success",
            data: newCustomer,
            message: "Customer created successfully",
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "An error occurred while adding the customer." });
    }
}
const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({})
        res.status(201).json({
            status: "Success",
            dataCount: customers.length,
            data: customers,
            message: "Customers fetched successfully",
            timestamp: new Date().toISOString()
        })   
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "An error occurred while fetching the customers." });
    }
}
const getCustomer = async (req, res, next) => {}
const updateCustomer = async (req, res, next) => {}
const deleteCustomer = async (req, res, next) => {}

export default {
    addCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
}