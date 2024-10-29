import ReplyComment from "../models/replyComment.model.js";
import Comment from "../models/comment.model.js"; // Để kiểm tra comment

export const createReply = async (req, res, next) => {
  try {
    const { content, commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const newReply = new ReplyComment({
      content,
      commentId,
      userId: req.user.id,
    });
    await newReply.save();

    res.status(200).json(newReply);
  } catch (error) {
    next(error);
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const replies = await ReplyComment.find({
      commentId: req.params.commentId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(replies);
  } catch (error) {
    next(error);
  }
};

export const likeReply = async (req, res, next) => {
  try {
    const reply = await ReplyComment.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    const userIndex = reply.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      reply.numberOfLikes += 1;
      reply.likes.push(req.user.id);
    } else {
      reply.numberOfLikes -= 1;
      reply.likes.splice(userIndex, 1);
    }
    await reply.save();
    res.status(200).json(reply);
  } catch (error) {
    next(error);
  }
};

export const editReply = async (req, res, next) => {
  try {
    const reply = await ReplyComment.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    if (reply.userId !== req.user.id && req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to edit this reply"));
    }
    const editedReply = await ReplyComment.findByIdAndUpdate(
      req.params.replyId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedReply);
  } catch (error) {
    next(error);
  }
};

export const deleteReply = async (req, res, next) => {
  try {
    const reply = await ReplyComment.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    if (reply.userId !== req.user.id && req.user.role !== "admin") {
      return next(
        errorHandler(403, "You are not allowed to delete this reply")
      );
    }
    await ReplyComment.findByIdAndDelete(req.params.replyId);
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    next(error);
  }
};
