import { User } from "../models/user.model.js";
import { verifyJWT } from "../util/auth.util.js";
import { createError } from "../util/error.util.js";

//validate auth session
export const requireAuth = (req, res, next) => {
  try {
    //extract token from cookies
    const token = req.cookies.session;

    if (!token) throw createError("Authentication required", 401);

    //verify token
    req.user = verifyJWT(token);

    next();
  } catch (error) {
    next(error);
  }
};

//validate role
export const requireAdmin = (req, res, next) => {
  try {
    //check is admin
    if (req.user.role !== "admin")
      return next(createError("Access denied", 403));

    next();
  } catch (error) {
    next(error);
  }
};

//validate status
export const requireActive = async (req, res, next) => {
  try {
    //find user
    const user = await User.findById(req.user.userId);

    //check user exist
    if (!user) throw createError("User not found", 404);

    //check user is active
    if (!user.isActive) throw createError("User account is inactive", 403);

    next();
  } catch (error) {
    next(error);
  }
};
