const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: false,
  },
  postContent: {
    type: String,
    required: true,
  },
  postLikes: {
    type: Number,
    required: false,
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
    required: false,
  },
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;