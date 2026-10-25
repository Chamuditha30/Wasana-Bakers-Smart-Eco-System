import { User } from "../models/user.model.js";
import { createError } from "../util/error.util.js";

//create new user
const createUserService = async (data) => {
  //extract data
  const { name, email, password, role, isActive, branch } = data;

  //check user exist
  const isExist = await User.findOne({ email });

  if (isExist) throw createError("User already exists", 409);

  //save user
  return await User.create({
    name,
    email,
    password,
    role,
    isActive,
    branch,
  });
};
