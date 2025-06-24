import User from "../models/userModel.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";
import { getPaginationOptions } from "../utils/pagination.js";

const getTechnicians = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const criteria = { role: "technician" };
    const technicinians = await User.find(criteria)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    console.log(technicinians);
    if (!technicinians || technicinians.length === 0) {
      throw createError(400, "No users Found!");
    }

    const totalRecords = await User.countDocuments(criteria);

    response(res, technicinians, "Users fetched successfully", {
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

export default {
  getTechnicians,
};
