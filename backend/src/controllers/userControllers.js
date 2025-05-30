import User from "../models/userModel.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalRecords = await User.countDocuments({});
    const users = await User.find({})
      .select("_id usercode fullname email bio image address role createdAt updatedAt")
      .limit(pageSize)
      .skip(page * pageSize);
    if (!users) {
      res.status(404);
      throw next(new Error("Invalid Operation: No users Found!"));
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
      usercode: user.usercode,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      image: user.image,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    if (!user) {
      res.status(404);
      throw new Error("Invalid Operation: User not found");
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
      usercode: user.usercode,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      image: user.image,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (!user) {
      res.status(404);
      throw new Error("Invalid Operation: User not found");
    }
    sendFormattedResponse(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { fullname, bio, image, address, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("Invalid Operation: User not found");
    }

    // Update fields
    if (fullname !== undefined) user.fullname = fullname;
    if (bio !== undefined) user.bio = bio;
    if (image !== undefined) user.image = image;
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
      usercode: user.usercode,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      image: user.image,
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
      throw new Error("Invalid Operation: User not found");
    }

    user = {
      _id: user._id,
      usercode: user.usercode,
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
  updateUser,
  deleteUser,
};
