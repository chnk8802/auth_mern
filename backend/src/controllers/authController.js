import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateOTP, verifyOTP } from "../utils/generateVerifyOTP.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import response from "../utils/response.js";
import sendResetPasswordEmail from "../utils/email.js";
import { createError } from "../utils/errorHandler.js";
import { loginUserSchema, signupUserSchema } from "../validations/user/user.validation.js";

const register = async (req, res, next) => {
  try {
    const { error, value } = signupUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const { email, password, fullName, phone, role, address } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(400, "User already exists with this email");
    }

    let newUser = new User({
      email,
      password,
      fullName,
      phone,
      role,
      address,
    });

    await newUser.save();

    const safeUser = {
      _id: newUser._id,
      userCode: newUser.userCode,
      email: newUser.email,
      role: newUser.role,
    };

    response(res, safeUser, "User registered successfully");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      throw createError(400, "Refresh token not provided");
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      throw createError(403, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded.userId).select("+refreshTokens");
    if (!user) {
      throw createError(404, "User not found");
    }

    const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
    if (!tokenExists) {
      throw createError(403, "Refresh token not recognized");
    }

    // Rotate tokens
    user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    const isProd = process.env.NODE_ENV === "production";

    // Set cookies with best practices
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "Strict" : "Lax",
      path: "/",
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "Strict" : "Lax",
      path: "/",
    });
    response(res, null, "Tokens refreshed successfully");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    //  Validate login input using Joi
    const { error, value } = loginUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw createError(400, error.details.map((d) => d.message).join(", "));
    }

    const { email, password } = value;

    //  Fetch user with password and refreshTokens
    let user = await User.findOne({ email }).select("+password +refreshTokens");

    if (!user) {
      throw createError(404, "User not found");
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      throw createError(401, "Invalid password");
    }

    //  Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    //  Store refresh token
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    //  Prepare safe response user object
    const safeUser = {
      _id: user._id,
      userCode: user.userCode,
      email: user.email,
      role: user.role,
    };

    //  Set secure cookies
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "Lax",
      path: "/",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "Lax",
      path: "/",
    });

    response(res, safeUser, "Login successful");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies || req.body;
    if (!refreshToken) {
      throw createError(204, "Refresh token not provided");
    }
    
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      throw createError(403, "Invalid or expired refresh token");
    }

    if (!decoded?.userId) {
      throw createError(403, "Invalid refresh token payload");
    }

    const user = await User.findById(decoded.userId).select("+refreshTokens");
    if (!user) {
      throw createError(403, "User not found");
    }

    user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);
    await user.save();

    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "Strict" : "Lax",
      path: "/",
    });

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "Strict" : "Lax",
      path: "/",
    });
    response(res, null, "Logout successful");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError(400, "Email is required");
    }
    const user = await User.findOne({ email }).select(
      "+resetPasswordToken isResetPasswordTokenExpired"
    );
    if (!user) {
      throw createError(404, "User not found");
    }

    const { otp, token } = generateOTP(user._id);
    if (!otp) {
      throw createError(500, "Internal server error");
    }
    user.isResetPasswordTokenExpired = false; // Reset OTP expiration status
    user.resetPasswordToken = token;
    await user.save();
    if (!user) {
      throw createError(500, "Could not send OTP to user");
    }

    const emailResult = await sendResetPasswordEmail(email, otp);
    if (!emailResult.success && emailResult.error) {
      throw createError(500, emailResult.error);
    }

    response(res, null, "OTP sent to mail. " + otp);
  } catch (error) {
    next(error);
  }
};

const enterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw createError(400,"Email and OTP are required");
    }

    let user = await User.findOne({ email }).select(
      "+password resetPasswordToken isResetPasswordTokenExpired"
    );
    if (!user) {
      throw createError(404, "User not found");
    }
    if (!user.resetPasswordToken || user.isResetPasswordTokenExpired) {
      throw createError(400, "OTP has expired or is not set.");
    }
    // Verify OTP
    const isOtpValid = verifyOTP(user._id, otp, user.resetPasswordToken);
    if (!isOtpValid) {
      throw createError(400, "Invalid or Expired OTP.");
    }
    // OTP is valid, clear it and allow password reset
    user.isResetPasswordTokenExpired = true; // Mark OTP as used
    user.resetPasswordToken = null; // Clear the token
    await user.save();
    if (!user) {
      throw createError(500, "Failed to verify OTP");
    }
    user = {
      _id: user._id,
    };
    response(
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
    if (!userId || !newPassword) {
      throw createError(400, "User ID and new password are required");
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      throw createError(404, "User not found");
    }

    user.password = newPassword;
    await user.save();
    if (!user) {
      throw createError(500, "Failed to reset password");
    }
    response(res, null, "Password reset successfully. Please login with your new password.");
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
