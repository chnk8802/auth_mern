import mongoose from "mongoose";
import Payment from "../models/paymentModel.js";
import flattenObject from "../utils/flattenObject.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";
import { createPaymentValidation } from "../validations/payment/payment.validation.js";

const createPayment = async (req, res, next) => {
  try {
    const {error, value} = createPaymentValidation.validate(req.body);
    if (error) {
      throw createError(400, error.details.map(d=>d.message).join(", "))
    }

    const flattenValue = flattenObject(value)

    const payment = new Payment(flattenValue);
    let savedPayment = await payment.save();

    if (!savedPayment) throw createError(500, "Failed to create Payment");

    response(res, savedPayment, "Payment created successffully.");
  } catch (error) {
    next(error);
  }
};

const getPayments = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    if (pageSize > 200) {
      res.status(400);
      throw new Error("Page size must not exceed 200");
    }
    const paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(pageSize) || 10,
      sort: { createdAt: -1 }, // Sort by creation date, newest first
    };

    const payments = await Payment.find({})
      .populate("customer", "customerCode fullName")
      .populate("paymentEntries.repairJob", "repairJobCode")
      .populate("paymentEntries.supplier", "supplierCode fullName")
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.sort);

    if (!payments) {
      res.status(400);
      throw new Error("No users Found!");
    }
    const totalRecords = await Payment.countDocuments();
    response(res, payments, "Payments fetched successfully", {
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

const getPayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    if (!paymentId) {
      res.status(400);
      throw new Error("Payment ID not provided");
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      res.status(400);
      throw new Error("No payment found");
    }

    response(res, payment, "Payment fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const { customer, paymentEntries, paymentMethod } = req.body;

    if (!paymentId) {
      res.status(400);
      throw new Error("Payment ID not provided");
    }

    const updates = {};
    if (customer !== undefined) updates.customer = customer;
    if (paymentMethod !== undefined) updates.paymentMethod = paymentMethod;

    if (paymentEntries !== undefined) {
      if (!Array.isArray(paymentEntries)) {
        res.status(400);
        throw new Error("paymentEntries must be an array");
      }

      updates.paymentEntries = [];

      for (const entry of paymentEntries) {
        if (entry.repairJob !== undefined) {
          if (!entry.repairJob || !mongoose.Types.ObjectId.isValid(entry.repairJob)) {
            res.status(400);
            throw new Error("Invalid repairJob");
          }
        }

        if (entry.amountPaid !== undefined) {
          if (isNaN(entry.amountPaid)) {
            res.status(400);
            throw new Error("Invalid amount");
          }
        }

        if (entry.supplier !== undefined) {
          if (!entry.supplier || !mongoose.Types.ObjectId.isValid(entry.supplier)) {
            res.status(400);
            throw new Error("Invalid supplier");
          }
        }

        updates.paymentEntries.push(flattenObject(entry));
      }
    }

    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updates, {
      new: true,
    });

    if (!updatedPayment) {
      res.status(404);
      throw new Error("Payment not found");
    }

    response(res, updatedPayment, "Payment updated successfully");
  } catch (error) {
    next(error);
  }
};

const deletePayments = async (req, res, next) => {
  try {
    const result = await Payment.deleteMany({});
    response(res, result, "All payments deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    if (!paymentId) {
      res.status(400);
      throw new Error("Payment ID not provided");
    }
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    if (!deletedPayment) {
      res.status(404);
      throw new Error("Payment not found");
    }
    response(res, deletedPayment, "Payment deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayments,
  deletePayment,
};
