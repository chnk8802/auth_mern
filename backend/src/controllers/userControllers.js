import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

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
        errorMessage = "Username & email already exist";
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

    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({error:"User not Found"});
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(201).json({
        _id: user._id,
        token: generateToken(user._id),
      });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUser = async (req , res) => {
  res.send(`User Model: ${User}`);
};

export default { register, login, getUser };
