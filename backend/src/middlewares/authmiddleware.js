import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  const {accessToken} = req.cookies
  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } else {
      throw next(new Error("Authorization header missing or invalid"));
    }
  } catch (error) {
    res.status(401).json({ error: "Not authorized." });
  }
};
export default auth;
