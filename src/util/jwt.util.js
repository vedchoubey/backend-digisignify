import jwt from "jsonwebtoken";

const { JWT_SECRET = "secret-key", JWT_EXPIRY = "7d" } = process.env;

export const generateToken = async (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = async (token) => {
  return jwt.verify(token, JWT_SECRET);
};
