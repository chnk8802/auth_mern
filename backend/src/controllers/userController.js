import User from "../models/userModel.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalRecords = await User.countDocuments({});
    const users = await User.find({})
      .select("_id userCode fullName email address role createdAt updatedAt")
      .limit(pageSize)
      .skip(page * pageSize);

    if (!users) {
      res.status(404);
      throw next(new Error("No users Found!"));
    }
    // Format the response using the utility function
    sendFormattedResponse(
      res,
      users,
      "Users fetched successfully",
      totalRecords
    );
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId).select(
      "-password -__v -refreshTokens"
    );
    user = {
      _id: user._id,
      userCode: user.userCode,
      email: user.email,
      fullname: user.fullname,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    sendFormattedResponse(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).select(
      "-password -__v -refreshTokens"
    );
    user = {
      _id: user._id,
      userCode: user.userCode,
      email: user.email,
      fullname: user.fullname,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    sendFormattedResponse(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const data = req.body;
    const MAX_BATCH_SIZE = 100;
    if (Object.keys(data).length === 0) {
      res.status(400);
      throw new Error("No data provided for update");
    }

    if (!Array.isArray(data) || data.length === 0) {
      res.status(400);
      throw new Error("Invalid data format. Expected an array of users.");
    }

    if (data.length > MAX_BATCH_SIZE) {
      res.status(413); // Payload Too Large
      throw new Error(`Maximum batch size exceeded. Limit is ${MAX_BATCH_SIZE} users.`);
    }
    const updateResults = await Promise.all(
      data.map(async (userData) => {
        Object.keys(userData).forEach((key) => {
          if (userData[key] === undefined) {
            delete userData[key];
          }
        });
        return User.updateOne({ _id: userData._id }, { $set: userData });
      })
    );

    console.log("updateUsers", updateResults);
    if (updateResults.modifiedCount === 0) {
      res.status(404);
      throw new Error("No users found to update");
    }
    const updatedCount = updateResults.reduce(
      (count, result) => count + (result.modifiedCount || 0),
      0
    );
    sendFormattedResponse(res, updateResults, "Users Updated Successfully", updatedCount);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { fullname, address, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update fields
    if (fullname !== undefined) user.fullname = fullname;
    if (role !== undefined) user.role = role;

    if (address !== undefined) {
      const addressFields = Object.keys(user.address);
      addressFields.forEach((field) => {
        if (address.hasOwnProperty(field)) {
          if (address[field] !== user.address?.[field]) {
            user.address[field] = address[field];
          }
        }
      });
    }

    await user.save();
    const updatedUser = {
      _id: user._id,
      userCode: user.userCode,
      email: user.email,
      fullname: user.fullname,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    sendFormattedResponse(res, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user = {
      _id: user._id,
      userCode: user.userCode,
    };
    sendFormattedResponse(res, user, "User deleted successfully");
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
  deleteUser,
};
