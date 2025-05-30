import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const err = new Error("Authorization header is missing or invalid");
      err.status = 401;
      throw err;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      const err = new Error("Unauthorized access: User not found");
      err.status = 404;
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = error.status || 401;
    error.message = error.message || "Unauthorized access";
    next(error);
  }
};
export default auth;
