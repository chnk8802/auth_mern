import User from "../models/userModel.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js";

const getTechnicians = async (req, res, next) => {
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
    const criteria = {role: "technician"};
    const technicinians = await User.find(criteria)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.skip);
    if (!technicinians) {
      res.status(404);
      throw next(new Error("No users Found!"));
    }
    const totalRecords = await User.countDocuments(criteria);

    response(res, technicinians, "Users fetched successfully", {
      pagination: {
        page: paginationOptions.page,
        pageSize: paginationOptions.limit,
        total: totalRecords,
      },
    });
  } catch (error) {
    next(error)
  }
};


export default {
    getTechnicians
}