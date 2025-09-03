import { validationResult } from "express-validator";
import User from "../models/User.js";

export const getLogin = (req, res) => res.render("pages/login");

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    req.session.error = "Invalid credentials";
    return res.redirect("/login");
  }
  req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
  req.session.success = "Welcome back!";
  res.redirect("/profile");
};

export const getRegister = (req, res) => res.render("pages/register");

export const postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.error = errors.array()[0].msg;
    return res.redirect("/register");
  }
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    req.session.error = "User already exists";
    return res.redirect("/register");
  }
  const user = await User.create({ name, email, password });
  req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
  req.session.success = "Account created!";
  res.redirect("/profile");
};

export const postLogout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
