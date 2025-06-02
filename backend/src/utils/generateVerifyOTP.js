import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateOTP = (userId) => {
  const length = 6;
  const min = Math.pow(10, length - 1); // 100000
  const max = Math.pow(10, length) - 1; // 999999
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;

  const token = jwt.sign({ userId, otp }, process.env.JWT_SECRET, {
    expiresIn: "10m", // OTP valid for 10 minutes
  });
  console.log(token.expiresIn);
  return { otp, token };
};

export const verifyOTP = (userId, otp, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const isValidUser = decoded.userId === String(userId);
    const isValidOtp = String(decoded.otp) === String(otp);

    if (!isValidUser || !isValidOtp) {
      throw new Error("Invalid OTP or token");
    }

    return true;
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
};

