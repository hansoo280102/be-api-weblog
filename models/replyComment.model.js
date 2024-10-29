import mongoose from "mongoose";

const replyCommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

export default ReplyComment;
