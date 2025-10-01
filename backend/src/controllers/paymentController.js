import mongoose from "mongoose";
import Payment from "../models/paymentModel.js";
import RepairJob from "../models/repairJobModel.js";
import SparePartEntry from "../models/sparePartEntryModel.js";
import { createError } from "../utils/errorHandler.js";
import response from "../utils/response.js";
import { withTransaction } from "../utils/withTansaction.js";

/**
 * @desc   Create Payment for customer or supplier. Handles single or bulk allocations
 * @route  POST /api/payments
 * @access Admin, Repair Manager
 */

export const createPayment = async (req, res, next, session) => {
  try {
    const {
      customerId,
      supplierId,
      paymentAmount,
      paymentMethod,
      allocations: inputAllocations,
      notes,
      paymentType,
    } = req.body;

    if (!paymentAmount || paymentAmount <= 0) {
      throw createError(400, "Payment amount must be greater than 0");
    }

    if (!Array.isArray(inputAllocations) || inputAllocations.length === 0) {
      throw createError(400, "Allocations must be a non-empty array");
    }

    const allocations = [];
    let remainingPayment = parseFloat(paymentAmount);

    // Process allocations
    for (const item of inputAllocations) {
      const { sourceModule, sourceId } = item;
      let doc;

      if (sourceModule === "RepairJob") {
        doc = await RepairJob.findById(sourceId).session(session);
      } else if (sourceModule === "SparePartEntry") {
        doc = await SparePartEntry.findById(sourceId).session(session);
      } else {
        throw createError(400, `Invalid sourceModule: ${sourceModule}`);
      }

      if (!doc) {
        throw createError(404, `${sourceModule} not found: ${sourceId}`);
      }

      const totalDue =
        parseFloat(doc.totalReceivable?.toString() || doc.unitCost?.toString() || 0);
      const amountPaid =
        parseFloat(doc.amountReceived?.toString() || doc.amountPaid?.toString() || 0);
      const due = totalDue - amountPaid;

      if (due <= 0) {
        throw createError(
          400,
          `${sourceModule} ${sourceId} is already fully paid`
        );
      }

      const allocatedAmount = Math.min(remainingPayment, due);
      allocations.push({ sourceModule, sourceId, allocatedAmount });

      remainingPayment -= allocatedAmount;
      if (remainingPayment <= 0) break;
    }

    if (allocations.length === 0) {
      throw createError(400, "No valid allocations available for this payment");
    }

    // Create Payment document
    const payment = new Payment({
      paymentType,
      customer: customerId,
      supplier: supplierId,
      paymentAmount,
      paymentMethod,
      notes,
      allocations,
    });

    await payment.save({ session });

    // Update allocated documents
    for (const alloc of allocations) {
      if (alloc.sourceModule === "RepairJob") {
        const job = await RepairJob.findById(alloc.sourceId).session(session);
        job.amountReceived =
          parseFloat(job.amountReceived || 0) +
          parseFloat(alloc.allocatedAmount.toString());
        job.paymentStatus =
          job.amountReceived >= parseFloat(job.totalReceivable.toString())
            ? "paid"
            : "partial";
        await job.save({ session });
      } else if (alloc.sourceModule === "SparePartEntry") {
        const entry = await SparePartEntry.findById(alloc.sourceId).session(
          session
        );
        entry.amountPaid =
          parseFloat(entry.amountPaid || 0) +
          parseFloat(alloc.allocatedAmount.toString());
        entry.paymentStatus =
          entry.amountPaid >= parseFloat(entry.unitCost.toString())
            ? "paid"
            : "partial";
        await entry.save({ session });
      }
    }

    response(res, payment, "Payment created successfully.", { code: 201 });
  } catch (error) {
    next(error); // handled by asyncTransactionHandler
  }
};

/**
 * @desc   Get all payments (with optional filters + pagination)
 * @route  GET /api/payments
 * @access Admin, Repair Manager
 */
export const getAllPayments = async (req, res, next) => {
  try {
    // const {  } = getPaginationOptions(req.query);
    const {page, limit, skip, sort, customer, supplier, paymentType, paymentMethod } = req.query;
    const query = {};

    if (customer) query.customer = customer;
    if (supplier) query.supplier = supplier;
    if (paymentType) query.paymentType = paymentType;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const payments = await Payment.find(query)
      .populate("customer", "name email") // adjust fields
      .populate("supplier", "name email") // adjust fields
      .populate("allocations.sourceId") // will populate RepairJob or SparePartEntry
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Payment.countDocuments(query);

    response(res, payments, "Payments fetched successfully", {
      code: 200,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Reverse an existing Payment
 * @route  POST /api/payments/reverse
 * @access Admin
 */
export const reversePayment = async (req, res, next) => {
  try {
    await withTransaction(async (session) => {
      const { paymentId, createReversalRecord = true } = req.body;

      if (!paymentId) return createError(400, "paymentId is required");

      // Fetch the payment
      const payment = await Payment.findById(paymentId).session(session);
      if (!payment) return createError(404, "Payment not found");

      if (!payment.allocations || payment.allocations.length === 0) {
        return createError(400, "Payment has no allocations to reverse");
      }

      // Rollback allocations
      for (const alloc of payment.allocations) {
        if (alloc.sourceModule === "RepairJob") {
          const job = await RepairJob.findById(alloc.sourceId).session(session);
          if (job) {
            job.amountReceived =
              parseFloat(job.amountReceived || 0) -
              parseFloat(alloc.allocatedAmount.toString());

            if (job.amountReceived < 0) job.amountReceived = 0;

            job.paymentStatus =
              job.amountReceived >= parseFloat(job.totalReceivable.toString())
                ? "paid"
                : job.amountReceived > 0
                ? "partial"
                : "unpaid";

            await job.save({ session });
          }
        } else if (alloc.sourceModule === "SparePartEntry") {
          const entry = await SparePartEntry.findById(alloc.sourceId).session(session);
          if (entry) {
            entry.amountPaid =
              parseFloat(entry.amountPaid || 0) -
              parseFloat(alloc.allocatedAmount.toString());

            if (entry.amountPaid < 0) entry.amountPaid = 0;

            entry.paymentStatus =
              entry.amountPaid >= parseFloat(entry.unitCost.toString())
                ? "paid"
                : entry.amountPaid > 0
                ? "partial"
                : "unpaid";

            await entry.save({ session });
          }
        }
      }

      // Optionally create reversal payment record
      let reversalPayment = null;
      if (createReversalRecord) {
        reversalPayment = new Payment({
          paymentCode: `REV-${payment.paymentCode}`,
          paymentType: payment.paymentType,
          customer: payment.customer,
          supplier: payment.supplier,
          paymentAmount: -parseFloat(payment.paymentAmount.toString()),
          paymentMethod: payment.paymentMethod,
          notes: `Reversal of payment ${payment.paymentCode}`,
          allocations: payment.allocations.map((a) => ({
            sourceModule: a.sourceModule,
            sourceId: a.sourceId,
            allocatedAmount: -parseFloat(a.allocatedAmount.toString()),
          })),
        });

        await reversalPayment.save({ session });
      }

      response(
        res,
        reversalPayment || payment,
        `Payment ${payment.paymentCode} reversed successfully`,
        { code: 200 }
      );
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Delete one or more payments
 * @route  DELETE /api/payments
 * @access Admin
 */
export const deletePayment = async (req, res, next) => {
  try {
    await withTransaction(async (session) => {
      const { paymentIds } = req.body;

      if (!paymentIds || !Array.isArray(paymentIds) || paymentIds.length === 0) {
        throw createError(400, "paymentIds must be a non-empty array");
      }

      const deletedPayments = [];

      for (const paymentId of paymentIds) {
        const payment = await Payment.findById(paymentId).session(session);
        if (!payment) continue; // skip if not found

        // Rollback allocations
        if (payment.allocations && payment.allocations.length > 0) {
          for (const alloc of payment.allocations) {
            if (alloc.sourceModule === "RepairJob") {
              const job = await RepairJob.findById(alloc.sourceId).session(session);
              if (job) {
                job.amountReceived =
                  parseFloat(job.amountReceived || 0) -
                  parseFloat(alloc.allocatedAmount.toString());
                if (job.amountReceived < 0) job.amountReceived = 0;

                job.paymentStatus =
                  job.amountReceived >= parseFloat(job.totalReceivable?.toString() || 0)
                    ? "paid"
                    : job.amountReceived > 0
                    ? "partial"
                    : "unpaid";

                await job.save({ session });
              }
            } else if (alloc.sourceModule === "SparePartEntry") {
              const entry = await SparePartEntry.findById(alloc.sourceId).session(session);
              if (entry) {
                entry.amountPaid =
                  parseFloat(entry.amountPaid || 0) -
                  parseFloat(alloc.allocatedAmount.toString());
                if (entry.amountPaid < 0) entry.amountPaid = 0;

                entry.paymentStatus =
                  entry.amountPaid >= parseFloat(entry.unitCost?.toString() || 0)
                    ? "paid"
                    : entry.amountPaid > 0
                    ? "partial"
                    : "unpaid";

                await entry.save({ session });
              }
            }
          }
        }

        await payment.deleteOne({ session });
        deletedPayments.push(paymentId);
      }

      response(
        res,
        deletedPayments,
        `Successfully deleted ${deletedPayments.length} payment(s)`,
        { code: 200 }
      );
    });
  } catch (error) {
    next(error);
  }
};
