import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } else {
      throw next(new Error("Authorization header missing or invalid"));
    }
  } catch (error) {
    res.status(401).json({ error: "Not authorized. " + error.message });
  }
};
export default auth;
