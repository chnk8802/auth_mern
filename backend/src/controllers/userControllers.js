import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import sendResetPasswordEmail from "../utils/email.js";

const register = async (req, res, next) => {
  try {
    const { username, fullname, email, password, bio } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing mandatory fields" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    const regex = /^[a-z0-9]+$/;
    if (!regex.test(username)) {
      return res.status(400).json({
        error: "Username should only contain lowercase alphabet and numbers",
      });
    }

    if (existingUser) {
      let errorMessage;
      if (existingUser.username === username && existingUser.email === email) {
        errorMessage = "Username & email already exists";
      } else if (existingUser.username === username) {
        errorMessage = "Username already exists";
      } else if (existingUser.email === email) {
        errorMessage = "Email already exists";
      }
      return res.status(400).json({ error: errorMessage });
    }

    const newUser = new User({
      username,
      fullname,
      email,
      password,
      bio,
    });

    await newUser.save();
    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    next(error)
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(403).json({ error: "User not found" });

    const storedToken = user.refreshTokens.filter(
      (t) => t.token !== refreshToken
    );
    if (!storedToken)
      return res.status(403).json({ error: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokens = user.refreshTokens.filter(
      (t) => t.token !== refreshToken
    );
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
    });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error)
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    user.password = undefined;
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.status(201).json({ user, accessToken: accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies || req.body;
  if (!refreshToken)
    return res.status(204).json({ message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(403).json({ error: "User not found" });

    user.refreshTokens = user.refreshTokens.filter(
      (t) => t.token !== refreshToken
    );
    await user.save();

    res.clearCookie("refreshToken");
    res.status(204).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOTP(user._id);

    user.otp = otp;
    user.otpExpires = Date.now() + 3600000;
    await user.save();

    sendResetPasswordEmail(user.email, otp);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const enterOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    res.status(200).json({ verifiedUser: user._id });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "Error occuured try again" });
    }
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId).select(
      "-password -__v -refreshTokens"
    );
    if (!user) {
      throw next(new Error("User not found"))
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error)
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const totalRecords = await User.countDocuments({})
    const users = await User.find({}, null, {
      limit: pageSize,
      skip: page * pageSize,
    }).select("-password -__v -refreshTokens");
    if (!users) {
      throw next(new Error("No users Found!"));
    }
    res.status(200).json({
      status: "Success",
      totalRecords: totalRecords,
      dataCount: users.length,
      data: users,
      message: "Users fetched successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error)
  }
};

export default {
  register,
  refreshToken,
  login,
  logout,
  getUser,
  getUsers,
  forgotPassword,
  enterOtp,
  resetPassword,
};
