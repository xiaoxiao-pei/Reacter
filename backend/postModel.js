const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  postLikes: {
    type: Number,
    required: true,
  },
  postTime: {
    type: Date,
    required: false,
  },
  postPhoto: {
    type: String,
    required: false,
  },
  postCommentCount: {
    type: Number,
    required: true,
  },
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
