import User from "../models/User.js";
import jwt from "jsonwebtoken";

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "Tên người dùng này đã được đăng ký";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "Tên người dùng không tồn tại";
    return errors;
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Mật khẩu không chính xác";
    return errors;
  }

  // general errors
  if (err.message) {
    errors.general = err.message;
    return errors;
  }

  return errors;
};

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, "Giabao2001", {
    expiresIn: maxAge,
  });
};

// controller actions
export const signup_get = (req, res) => {
  res.render("signup");
};

export const login_get = (req, res) => {
  res.render("login");
};

export const signup_post = async (req, res) => {
  const { username, password } = req.body;

  // validate inputs
  if (!username || !password) {
    return res.status(400).json({ errors: { general: "Tên người dùng và mật khẩu là bắt buộc" } });
  }

  if (password.length < 6) {
    return res.status(400).json({ errors: { password: "Mật khẩu phải có ít nhất 6 ký tự" } });
  }

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { username, password } = req.body;

  // validate inputs
  if (!username || !password) {
    return res.status(400).json({ errors: { general: "Tên người dùng và mật khẩu là bắt buộc" } });
  }

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
