// build models for three collections: users, posts, and comments
// user should have an array of ObjectIds of his/her posts
// post should have publisher's userId and an array of ObjectIds of comments under it
// comment should keep the ids of publisher and related post

const mongoose = require("mongoose");
const  ObjectID = require('mongodb').ObjectId;


const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userIsAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  userIsActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  UserjoinTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userMotto: {
    type: String,
    default: "You, me, her/him",
  },
  userPhoto: {
    type: String,
    required: false,
  },
  // user's post list
  userPosts: [
    {
      type: ObjectID,
      ref: "Post",
    }
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

const PostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    trim: true,
    required: true,
  },
  postContent: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: ObjectID,
    ref: "User",
  },
  postTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  postComments: [
    {
      type: ObjectID,
      ref: "Comment",
    },
  ],
  postLikes: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

const CommentSchema = new mongoose.Schema({
  commentContent: {
    type: String,
    trim: true,
    required: true,
  },
  postId: {
    type: ObjectID,
    ref: "Post",
  },
  userId: {
    type: ObjectID,
    ref: "User",
  },
  commentTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
