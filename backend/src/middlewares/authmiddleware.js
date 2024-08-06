import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
  // const { accessToken } = req.cookies
  // try {
  //   if (accessToken) {
  //     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  //     req.user = await User.findById(decoded.userId).select("-password");
  //     next();
  //   } else {
  //     throw next(new Error("Authorization header missing or invalid"));
  //   }
  // } catch (error) {
  //   res.status(401).json({ error: "Not Authorized.",stack: error });
  // }
};
export default auth;
