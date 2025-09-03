import jwt from "jsonwebtoken";

export default function generateToken(id, role = "student") {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id, role }, secret, { expiresIn: "7d" });
}
