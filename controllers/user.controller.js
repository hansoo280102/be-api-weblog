import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.send("This is a test");
};

export const updateUser = async (req, res, next) => {
  // Kiểm tra quyền
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user!"));
  }

  // Kiểm tra mật khẩu
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters!"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Kiểm tra username
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters!")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces!"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase!"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain alphanumeric characters!")
      );
    }
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId }, // Điều kiện tìm kiếm
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user!"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been delete"); // No content response
  } catch (error) {
    next(error);
  }
};
