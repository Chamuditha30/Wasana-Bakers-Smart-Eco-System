import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//password hash
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

//compare password
export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

//create jwt token
export const createJWT = (branchId, userId, role) => {
  return jwt.sign({ branchId, userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//verify jwt
export const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
