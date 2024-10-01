import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Kiểm tra xem tất cả các trường có được điền hay không
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Kiểm tra xem username đã tồn tại hay chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(errorHandler(400, "Username already exists")); // Trả về lỗi nếu username đã tồn tại
    }

    const existngEmail = await User.findOne({ email });
    if (existngEmail) {
      return next(errorHandler(400, "Email have been used")); // Trả về lỗi nếu username đã tồn tại
    }

    // Mã hóa password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Xử lý lỗi tại đây
    next(error); // Nếu có lỗi, chuyển đến middleware xử lý lỗi
  }
};
