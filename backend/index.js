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

app.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});
// app.post("/users", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = {
//     username: username,
//     password: password,
//   };
//   await userModel.create(user);
//   res.send(user);
// });

// app.get("/user/username", async (req, res) => {
//   const username = req.query.username;
//   const user = await userModel.findOne({
//     username: username,
//   });
//   res.send(user);
// });

// app.get("/users/:username", async (req, res) => {
//   const username = req.params.username;
//   const user = await userModel.findOne({
//     username: username,
//   });
//   res.send(user);
// });
// app.post("/users/get", async (req, res) => {
//   const username = req.body.username;
//   const user = await userModel.findOne({
//     userName: username,
//   });
//   res.send(user);
// });
app.put("/users", async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const user = {
    userName: username,
    password: password,
  };
  const results = await userModel.replaceOne({ userName: username }, user);
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const postcount = req.body.postcount;
  console.log("now count is:" + req.body.postcount);
  const results = await userModel.updateOne(
    { id: id },
    { postCount: postcount }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

app.post("/users/login", async (request, response) => {
  const username = request.body.username;
  console.log(username);
  const password = request.body.password;
  console.log(password);
  try {
    if (username && password) {
      console.log("compare");
      // Check to see if the user already exists. If not, then create it.
      const user = await userModel.findOne({ username: username });
      console.log(user);
      if (!user) {
        console.log("no exist");
        console.log("Invalid login - username " + username + " doesn't exist.");
        response.send({ success: false });
        return;
      } else {
        console.log("exist");
        console.log(user.password);
        const isSame = await bcrypt.compare(password, user.password);
        console.log(isSame);
        if (isSame) {
          console.log("Successful login");
          // response.send({ success: true });
          response.send(user);
          return;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  response.send({ success: false });
});

app.post("/users/register", async (request, response) => {
  console.log("subit");
  const id = request.body.id;
  const username = request.body.username;
  const password = request.body.password;
  try {
    if (
      username &&
      validator.isAlphanumeric(username) &&
      password &&
      validator.isStrongPassword(password)
    ) {
      // Check to see if the user already exists. If not, then create it
      console.log("register");
      user = await userModel.findOne({ username: username });
      if (user) {
        console.log(
          "Invalid registration - username " + username + " already exists."
        );
        response.send({ success: false });
        return;
      } else {
        hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Registering username " + username);
        const userToSave = { username: username, password: hashedPassword };
        await userModel.create(userToSave);
        response.send({ success: true });
        return;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  response.send({ success: false });
});

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

// app.patch("/photos/add", upload.single("photo"), async (req, res) => {
//   const id = req.body.id;
//   const photo = req.file.filename;
//   // console.log("now count is:" + req.body.postcount);
//   const results = await userModel.updateOne({ id: id }, { postPhoto: photo });
//   console.log("matched: " + results.matchedCount);
//   console.log("modified: " + results.modifiedCount);
//   res.send(results);
// });

app.get("/posts", async (req, res) => {
  console.log("get postlist");
  const posts = await postModel.find();
  console.log(posts);
  res.send(posts);
});

// app.get("/posts/", async (req, res) => {
//   console.log("get postlist");
//   const posts = await postModel.find();
//   console.log(posts);
//   res.send(posts);
// });

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
  const postLikes = req.body.postLikes;
  console.log(postLikes);
  const photo = req.file.filename;
  console.log(photo);

  const post = {
    postTitle: postTitle,
    postContent: postContent,
    userId: userId,
    postTime: postTime,
    postLikes: postLikes,
    postPhoto: photo,
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
  console.log(postTitle);
  const commentContent = req.body.commentContent;
  console.log(postTitle);
  const commentTime = req.body.commentTime;
  const postId = req.body.postId;

  const comment = {
    commentContent: commentContent,
    userId: userId,
    commentTime: commentTime,
    postId: postId,
  };
  await postModel.create(comment);
  res.send(comment);
  console.log(comment);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
