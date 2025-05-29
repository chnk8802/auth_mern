import User from "../models/userModel.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalRecords = await User.countDocuments({});
    const users = await User.find({})
      .select("_id username fullname email bio createdAt")
      .limit(pageSize)
      .skip(page * pageSize);
    if (!users) {
      throw next(new Error("No users Found!"));
    }
    // Format the response using the utility function
    sendFormattedResponse(res, users, "Users fetched successfully", totalRecords);
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
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    if (!user) return res.status(404).json({ error: "User not found" });
    sendFormattedResponse(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { fullname, bio, image } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    if (fullname !== undefined) user.fullname = fullname;
    if (bio !== undefined) user.bio = bio;
    if (image !== undefined) user.image = image;

    await user.save();
    const updatedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      bio: user.bio,
      image: user.image,
    };
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
