const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Register new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user are already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User is already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Created user and saving it to db

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      object: {
        _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      },
      message: "User is successfully registered"
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Register new user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      object: {
        _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      },
      message: `You have successfullt logged in`
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user profile
// @route   /api/users/profile
// @access  Private

const profile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Put user profile
// @route   /api/users/profile
// @access  Private

const updateProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { name, email } = req.body;

  if (!email || !name) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  let doc = await User.findOneAndUpdate(_id, { name, email });

  await doc.save();

  doc = await User.findOne();

  if (doc._id) {
    await res.status(200).json({
      message: "Success updated profile",
      data: doc,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  profile,
  updateProfile,
};
