import User from "../models/userModel.js";
import response from "../utils/response.js";
import flattenObject from "../utils/flattenObject.js";

const getUsers = async (req, res, next) => {
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

    const users = await User.find({})
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort(paginationOptions.skip);

    if (!users) {
      res.status(404);
      throw next(new Error("No users Found!"));
    }
    const totalRecords = await User.countDocuments({});

    response(res, users, "Users fetched successfully", {
      pagination: {
        page: paginationOptions.page,
        pageSize: paginationOptions.limit,
        total: totalRecords,
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const loggedinUserId = req.user._id;
    if (!loggedinUserId) {
      res.status(400);
      throw new Error("User ID is required");
    }
    let user = await User.findById(loggedinUserId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    response(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }
    let user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    response(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { _ids, field } = req.body;
    const MAX_BATCH_SIZE = 5000;

    if (!Array.isArray(_ids) || _ids.length === 0) {
      res.status(400);
      throw new Error("Invalid data format. Expected an array of user IDs.");
    }

    if (_ids.length > MAX_BATCH_SIZE) {
      res.status(413);
      throw new Error(
        `Maximum batch size exceeded. Limit is ${MAX_BATCH_SIZE} users.`
      );
    }

    if (!field || typeof field !== "object") {
      res.status(400);
      throw new Error("Invalid update field format. Expected an object.");
    }
    // console.log(flattenObject(field)) convert nested objects to flat structure to prevent address object overwriting
    // For example, if field is { address: { city: "New York" } },
    // Example: { address: { city: "New York" } } becomes { "address.city": "New York" }
    const updatedUsers = await User.updateMany(
      {
        _id: { $in: _ids },
      },
      {
        $set: flattenObject(field),
      },
      { runValidators: true }
    );
    if (updatedUsers.modifiedCount === 0) {
      res.status(404);
      throw new Error("No users updated");
    }
    response(res, updatedUsers, "Users Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { fullName, phone, address, role } = req.body;
    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }
    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;
    if (role !== undefined) updates.role = role;

    let updatedUser = await User.findByIdAndUpdate({ _id: userId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }
    response(res, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { userIds } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
      res.status(400);
      throw new Error("Invalid data format. Expected an array of user IDs.");
    }

    const deleteResults = await User.deleteMany({ _id: { $in: userIds } });
    if (!deleteResults) {
      res.status(404);
      throw new Error("No users found to delete");
    }
    response(res, deleteResults, "Users deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }

    let user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
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
  getCurrentUser,
  getUsers,
  updateUsers,
  updateUser,
  deleteUsers,
  deleteUser,
};
