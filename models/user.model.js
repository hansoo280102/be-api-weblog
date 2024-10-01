import mongoose from "mongoose";

const userSChema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin", "cencor"], // Các giá trị có thể nhận của trường role
      default: "user", // Giá trị mặc định khi không chỉ định role
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSChema);

export default User;
