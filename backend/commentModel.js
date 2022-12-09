const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },

  commentContent: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },

  commentTime: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;