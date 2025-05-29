import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateOTP, verifyOTP } from "../utils/generateVerifyOTP.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { sendFormattedResponse } from "../utils/responseFormatter.js";
import sendResetPasswordEmail from "../utils/email.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password, role, fullname, bio } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Missing mandatory fields");
    }

    const regex = /^[a-z0-9]+$/;
    if (!regex.test(username)) {
      res.status(400);
      throw new Error(
        "Username should only contain lowercase alphabets and numbers"
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400);
      let errorMessage;
      if (existingUser.username === username && existingUser.email === email) {
        errorMessage = "Username and email already exist";
      } else if (existingUser.username === username) {
        errorMessage = "Username already exists";
      } else {
        errorMessage = "Email already exists";
      }
      throw new Error(errorMessage);
    }

    let newUser = new User({
      username,
      fullname,
      email,
      password,
      bio,
      role,
    });

    await newUser.save();

    newUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      fullname: newUser.fullname,
      bio: newUser.bio,
      role: newUser.role,
    };
    sendFormattedResponse(res, newUser, "User registered successfully");
  } catch (error) {
    next(error); // Forward error to centralized handler
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.status(400);
    throw new Error("Refresh token not provided");
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(403);
      throw new Error("User not found");
    }

    const tokenExists = user.refreshTokens.some(
      (t) => t.token === refreshToken
    );
    if (!tokenExists) {
      res.status(403);
      throw new Error("Invalid refresh token");
    }
    user.refreshTokens = user.refreshTokens.filter(
      (t) => t.token !== refreshToken
    );
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404);
      throw new Error("User not Found");
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
    });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: isProd });
    sendFormattedResponse(res, user, "Login successful");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies || req.body;
  if (!refreshToken) {
    res.status(204);
    throw new Error("Refresh token not provided");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(403);
      throw new Error("User not found");
    }

    user.refreshTokens = user.refreshTokens.filter(
      (t) => t.token !== refreshToken
    );
    await user.save();

    res.clearCookie("refreshToken");
    sendFormattedResponse(res, null, "Logout successful");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const { otp, token } = generateOTP(user._id);
    if (!otp) {
      res.status(500);
      throw new Error("Internal server error");
    }
    user.isResetPasswordTokenExpired = false; // Reset OTP expiration status
    user.resetPasswordToken = token;
    await user.save();

    const emailResult = await sendResetPasswordEmail(user.email, otp);
    if (!emailResult.success) {
      res.status(500);
      throw new Error("Failed to send email");
    }

    sendFormattedResponse(res, null, "OTP sent to mail." + otp);
  } catch (error) {
    next(error);
  }
};

const enterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    if (!user.resetPasswordToken || user.isResetPasswordTokenExpired) {
      res.status(400);
      throw new Error("OTP has expired or is not set.");
    }
    // Verify OTP
    const isOtpValid = verifyOTP(user._id, otp, user.resetPasswordToken);
    if (!isOtpValid) {
      res.status(400);
      throw new Error("Invalid or Expired OTP.");
    }
    // OTP is valid, clear it and allow password reset
    user.isResetPasswordTokenExpired = true; // Mark OTP as used
    user.resetPasswordToken = null; // Clear the token
    await user.save();
    user = {
      _id: user._id,
    };
    sendFormattedResponse(
      res,
      user,
      "OTP verified successfully. You can now reset your password."
    );
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  refreshToken,
  login,
  logout,
  forgotPassword,
  enterOtp,
  resetPassword,
};
