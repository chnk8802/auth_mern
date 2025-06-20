import PaymentEntry from "../models/paymentEntryModel.js";
import { createError } from "../utils/errorHandler.js";
import response from "../utils/response.js";
import { createPaymentEntryValidation } from "../validations/payment/paymentEntry/paymentEntry.validation.js";

const createPaymentEntry = async (req, res, next) => {
  try {
    const { error, value } = createPaymentEntryValidation.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const paymentEntry = await PaymentEntry(value);

    if (!paymentEntry) {
      throw createError(400, "Could not create payment entry");
    }

    response(res, paymentEntry, "Payment Entry created successfully.");
  } catch (error) {
    next(error);
  }
};

export default {
  createPaymentEntry,
};
