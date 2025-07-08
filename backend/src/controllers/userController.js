import User from "../models/userModel.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js";
import { updateUserValidation } from "../validations/user/user.validation.js";
import {
  paramIdValidation,
  multipleIdsValidation,
} from "../validations/common/common.validation.js";
import { getPaginationOptions } from "../utils/pagination.js";
import { createError } from "../utils/errorHandler.js";

const getUsers = async (req, res, next) => {
  try {
    const { page, limit, skip, sort } = getPaginationOptions(req.query);

    const users = await User.find({}).skip(skip).limit(limit).sort(sort);

    const totalRecords = await User.countDocuments({});

    response(res, users, "Users fetched successfully", {
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

const getUser = async (req, res, next) => {
  try {
    const { error, value } = paramIdValidation.validate(req.params, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const user = await User.findById(value.id);

    response(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { ids, field } = req.body;
    const MAX_BATCH_SIZE = 5000;

    if (!Array.isArray(ids) || ids.length === 0) {
      throw createError(
        400,
        "Invalid data format. Expected an array of user IDs."
      );
    }

    if (ids.length > MAX_BATCH_SIZE) {
      throw createError(
        413,
        `Maximum batch size exceeded. Limit is ${MAX_BATCH_SIZE} users.`
      );
    }

    if (!field || typeof field !== "object") {
      throw createError(
        400,
        "Invalid update field format. Expected an object."
      );
    }

    const updatedUsers = await User.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: flattenObject(field),
      },
      { runValidators: true }
    );
    if (updatedUsers.modifiedCount === 0) {
      throw createError(400, "No users updated");
    }
    response(res, updatedUsers, "Users Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { error, value } = updateUserValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const flattenedUpdates = flattenObject(value);

    const updatedUser = await User.findByIdAndUpdate(userId, flattenedUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    response(res, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { error, value } = multipleIdsValidation.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const result = await User.deleteMany({ _id: { $in: value.ids } });
    if (result.deletedCount === 0) {
      throw createError(404, "No customers found for deletion");
    }
    response(
      res,
      { deletedCount: result.deletedCount },
      "Users deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      throw createError(404, "User not found");
    }

    user = {
      _id: user._id,
      userCode: user.userCode,
    };
    response(res, user, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  getUsers,
  updateUsers,
  updateUser,
  deleteUsers,
  deleteUser,
};