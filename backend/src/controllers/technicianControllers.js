import User from "../models/userModel.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";

const getTechnicians = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const criteria = { role: "technician" };
    const technicinians = await User.find(criteria)
      .skip(skip)
      .limit(limit)
      .sort(skip);

    if (!technicinians) {
      throw createError(400, "No users Found!");
    }

    const totalRecords = await User.countDocuments(criteria);

    response(res, technicinians, "Users fetched successfully", {
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

export default {
  getTechnicians,
};
