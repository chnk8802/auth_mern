import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { createError } from "../utils/errorHandler.js";

const auth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const token = cookies.accessToken;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw createError(401, "Unauthorized access");
    }
    const reqUser = {
      _id: user._id,
      userCode: user.userCode,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      address: user.address
    };
    req.user = reqUser;
    next();
  } catch (error) {
    error.status = error.status || 401;
    error.message = error.message || "Unauthorized access";
    next(error);
  }
};
export default auth;
