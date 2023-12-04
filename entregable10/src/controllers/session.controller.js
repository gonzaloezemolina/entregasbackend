import jwt from "jsonwebtoken";
import config from "../config/config.js";

const register = async (req, res) => {
  res.clearCookie("cart");
  return res.sendSuccess("Registered");
};

const login = async (req, res) => {
  const tokenizedUser = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    id: req.user._id,
    role: req.user.role,
    cart: req.user.cart,
    email: req.user.email,
  };
  const token = jwt.sign(tokenizedUser, config.jwt.SECRET, {
    expiresIn: "1d",
  });
  res.cookie(config.jwt.COOKIE, token);
  res.clearCookie("cart");
  return res.sendSuccess("Logged In");
};

const logout = async (req, res) => {
  res.clearCookie(config.jwt.COOKIE);
  return res.sendSuccess("Logged Out");
};

const current = async (req, res) => {
  return res.sendSuccessWithPayload(req.user);
};

export default {
  register,
  login,
  logout,
  current,
};
