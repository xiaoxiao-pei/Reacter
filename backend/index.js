const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./userModel");
const postModel = require("./postModel");
const commentModel = require("./commentModel");
const bodyParser = require("body-parser");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const cors = require("cors"); //cross-orign resource sharing
const fs = require("fs");

const url =
  "mongodb+srv://mongouser1:" +
  process.env.MONGODB_PWD +
  "@cluster0.zem8ftm.mongodb.net/myFirstDb?retryWrites=true&w=majority";
const app = express();
const port = 3001; // Must be different than the port of the React app
app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// posts collection interfaces
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "photos");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional

let upload = multer({
  storage,
  fileFilter,
});

app.get("/posts", async (req, res) => {
  console.log("get postlist");
  const posts = await postModel.find();
  console.log(posts);
  res.send(posts);
});

app.get("/posts/:userId", async (req, res) => {
  const userId = req.params.userId;
  const posts = await postModel.find({ userId: userId });
  res.send(posts);
});

app.delete("/posts/:id", async (req, res) => {
  console.log("delete post");
  id = req.params.id;
  results = await postModel.deleteOne({ id: id });
  res.send(results);
});

app.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const postLikes = req.body.postLikes;

  const results = await postModel.updateOne(
    { id: id },
    { postLikes: postLikes }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

app.get("/users/:id", async (req, res) => {
  console.log("get user------------");
  const userid = req.params.id;
  const user = await userModel.findOne({
    id: userid,
  });
  // console.log(user);
  res.send(user);
});

app.patch("/posts/addphoto", upload.single("photo"), async (req, res) => {
  console.log("add photo");
  const userId = req.body.userId;
  const postTitle = req.body.postTitle;
  const postPhoto = req.file.filename;
  console.log(postTitle);
  console.log(userId);
  // console.log("now count is:" + req.body.postcount);
  const results = await postModel.updateOne(
    { userId: userId },
    { postTitle: postTitle },
    { postPhoto: postPhoto }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

app.post("/posts/create", upload.single("photo"), async (req, res) => {
  console.log("create post------------");
  const postTitle = req.body.postTitle;
  console.log(postTitle);
  const postContent = req.body.postContent;
  console.log(postTitle);
  const userId = req.body.userId;
  console.log(userId);
  const postTime = req.body.postTime;
  console.log(postTime);
  console.log(postLikes);
  const photo = req.file.filename;
  console.log(photo);

  const post = {
    postTitle: postTitle,
    postContent: postContent,
    userId: userId,
    postTime: postTime,
    postLikes: 0,
    postPhoto: photo,
    postCommentCount: 0,
  };
  await postModel.create(post);
  res.send(post);
  console.log(post);
});

app.get("/getImg/:photoname", async (req, res) => {
  console.log("get image");
  let img = req.params.photoname;
  let path = `photos/${img}`;
  console.log(img);
  await fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error reading file");
      res.send("can.t get the image");
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
// comments collection interfaces
app.get("/comments/:id", async (req, res) => {
  console.log("get comments list------------");
  const id = req.params.id;
  const comments = await commentModel.find({
    postId: id,
  });
  // console.log(user);
  res.send(comments);
});
app.delete("/comments/:id", async (req, res) => {
  console.log("delete one comment");
  id = req.params.id;
  results = await commentModel.deleteOne({ id: id });
  res.send(results);
});
app.post("/comments/create", async (req, res) => {
  console.log("create comment------------");
  const userId = req.body.userId;

  const commentContent = req.body.commentContent;

  const commentTime = req.body.commentTime;
  const postId = req.body.postId;

  const comment = {
    commentContent: commentContent,
    userId: userId,
    commentTime: commentTime,
    postId: postId,
  };
  await commentModel.create(comment);
  res.send(comment);
  console.log(comment);
});
app.get("/users", async (req, res) => {
  console.log("get all users");
  const users = await userModel.find();
  console.log(users);
  res.send(users);
});

app.delete("/users/:id", async (req, res) => {
  console.log("delete user");
  id = req.params.id;
  results = await userModel.deleteOne({ userId: id });
  res.send(results);
});
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
