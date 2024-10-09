import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxNypgyADKWdhU9c2zuLT_yO9mJYnQPO_1A&s",
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Category",
      // required: true,
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      default: "uncategorized",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
