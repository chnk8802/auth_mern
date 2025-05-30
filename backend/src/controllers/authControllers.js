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
    const { email, password, fullname, role } = req.body;

    if (!email || !password || !role) {
      res.status(400);
      throw new Error("Missing mandatory fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    let newUser = new User({
      email,
      password,
      role,
    });

    await newUser.save();
    newUser = {
      _id: newUser._id,
      usercode: newUser.usercode,
      email: newUser.email,
      fullname: newUser.fullname,
      bio: newUser.bio,
      image: newUser.image,
      address: newUser.address,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
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
    const isProd = process.env.NODE_ENV === "production";

    res.status(200);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
    });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
    });
    sendFormattedResponse(
      res,
      { accessToken: newAccessToken },
      "Tokens refreshed successfully"
    );
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
      usercode: user.usercode,
      email: user.email,
    };
    const isProd = process.env.NODE_ENV === "production";

    res.status(200);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
    });
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
    res.clearCookie("accessToken");
    res.status(200);
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
    sendFormattedResponse(res, null, "Password reset successfully");
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
