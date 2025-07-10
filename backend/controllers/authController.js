// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = createToken(user._id, 'user');
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    res.status(201).json({ msg: 'User registered', userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = createToken(user._id, 'user');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = createToken(admin._id, 'admin');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ msg: "Admin login successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
