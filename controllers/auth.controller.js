import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//sign up a user
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

//sign in a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    // Tạo token JWT
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = validUser._doc;

    // Gửi phản hồi thành công với token và thông báo
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true }) // Lưu token vào cookie với tùy chọn httpOnly
      .json(rest); // Trả về JSON
  } catch (error) {
    next(error);
  }
};
