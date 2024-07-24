import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import generateToken from "../utils/generateToken.js";
import sendResetPasswordEmail from "../utils/email.js";
import verifyResetPasswordUser from "../middlewares/verifyResetPasswordUserMiddleware.js";

const register = async (req, res) => {
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
    console.error("User registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
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

    res.status(200).json({message: "Password reset email sent" });
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

    res.status(200).json({verifiedUser: user._id});
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId,newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "Error occuured try again" });
    }
    user.password = newPassword
    user.otp = undefined
    user.otpExpires = undefined
    await user.save()

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Get User error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { register, login, getUser, forgotPassword, enterOtp, resetPassword };
