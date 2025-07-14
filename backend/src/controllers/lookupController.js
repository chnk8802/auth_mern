import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import RepairJob from "../models/repairJobModel.js";
import { getPaginationOptions } from "../utils/pagination.js";
import response from "../utils/response.js";
import { createError } from "../utils/errorHandler.js";

const modelMap = {
  users: User,
  customers: Customer,
  repairjobs: RepairJob,
};

const getLookupData = async (req, res, next) => {
  try {
    const { module, id } = req.params;
    const { page, limit, skip, sort } = getPaginationOptions(req.query);
    console.log(module, id);
    const Model = modelMap[module?.toLowerCase()];
    if (!Model) {
      return res.status(400).json({ message: `Module "${module}" not found` });
    }

    if (id) {
      const record = await Model.findById(id);
      if (!record) {
        throw createError(404, `${module} record not found`);
      }
      response(res, record, `${module} record fetched successfully`);
    }

    const filter = id ? { _id: { $ne: id } } : {};

    const results = await Model.find(filter).skip(skip).limit(limit).sort(sort);
    const total = await Model.countDocuments(filter);

    response(res, results, `${module} lookup fetched successfully`, {
      pagination: {
        page,
        limit,
        sort,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { getLookupData };
