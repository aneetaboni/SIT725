import { validationResult } from "express-validator";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });
  const user = await User.create({ name, email, password });
  res.status(201).json({ 
    _id: user._id, name: user.name, email: user.email, role: user.role,
    token: generateToken(user._id, user.role)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ 
    _id: user._id, name: user.name, email: user.email, role: user.role,
    token: generateToken(user._id, user.role)
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};

export const borrowed = async (req, res) => {
  const books = await (await import("../models/Book.js")).default
    .find({ borrowedBy: req.user._id })
    .sort({ dueDate: 1 });
  res.json(books);
};
