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
  console.log("get postlist:  ---------");
  const posts = await postModel.find();
  console.log(posts);
  res.send(posts);
});

app.get("/posts/:userId", async (req, res) => {
  const userId = req.params.userId;
  const posts = await postModel.find({ userId: userId });
  res.send(posts);
});

app.delete("/posts/:id/:photoname", async (req, res) => {
  console.log("delete post");
  id = req.params.id;
  results = await postModel.deleteOne({ _id: id });
  let img = req.params.photoname;
  let path = `photos/${img}`;
  false.unlinkSync(path);
  res.send(results);
});

app.patch("/posts/likes/:id", async (req, res) => {
  const id = req.params.id;
  const postLikes = req.body.postLikes;

  const results = await postModel.updateOne(
    { _id: id },
    { postLikes: postLikes }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

app.patch("/posts/comments/:id", async (req, res) => {
  const id = req.params.id;
  const postCommentCount = req.body.postCommentCount;

  const results = await postModel.updateOne(
    { _id: id },
    { postCommentCount: postCommentCount }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

// app.patch("/posts/:id", async (req, res) => {
//   const postId = req.params.id;
//   const postLikes = req.body.postLikes;

//   // console.log("now count is:" + req.body.postcount);
//   const results = await postModel.updateOne(
//     { id: postId },
//     { postLikes: postLikes }
//   );
//   console.log("matched: " + results.matchedCount);
//   console.log("modified: " + results.modifiedCount);
//   res.send(results);
// });

app.get("/users/:id", async (req, res) => {
  console.log("get single owner ------------");
  const userId = req.params.id;
  console.log("get single owner: ------------" + userId);
  const user = await userModel.findOne({
    _id: userId,
  });
  console.log("owner:" + user);
  res.send(user);
});

app.post("/posts/create", upload.single("photo"), async (req, res) => {
  console.log("create post------------");
  const postTitle = req.body.postTitle;
  console.log(postTitle);
  const postContent = req.body.postContent;
  console.log(postContent);
  const userId = req.body.userId;
  console.log(userId);
  const postTime = req.body.postTime;
  console.log(postTime);
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
});

app.get("/getImg/:photoname", async (req, res) => {
  console.log("get image");
  let img = req.params.photoname;

  let path = `photos/${img}`;

  await fs.readFile(path, (err, data) => {
    if (err) {
      path = "photos/photo-1670429542463.jpg";
      fs.readFile(path, (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          res.send(data);
        }
      });
    } else {
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
  console.log(comments);
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

//users collection

/* User Registration*/
app.post(
  "/users/register",
  upload.single("userPhoto"),
  async (request, response) => {
    const id = request.body.id;
    const userName = request.body.userName;
    const userEmail = request.body.userEmail;
    const userPassword = request.body.userPassword;
    const userMotto = request.body.userMotto;
    let userPhoto;
    if (request.file) {
      userPhoto = request.file.filename;
    } else {
      userPhoto = "defaultUserPhoto.png";
    }

    try {
      if (userName && validator.isAlphanumeric(userName) && userPassword) {
        // Check to see if the user already exists. If not, then create it.
        const user = await userModel.findOne({ userName: userName });
        const email = await userModel.findOne({ userEmail: userEmail });
        if (user) {
          console.log(
            "Invalid registration - username " + userName + " already exists."
          );
          response.send({ success: false });
          return;
        } else if (email) {
          console.log(
            "Invalid registration - email " + userEmail + " already exists."
          );
          response.send({ success: false });
          return;
        } else {
          hashedPassword = await bcrypt.hash(userPassword, saltRounds);
          console.log("Registering username " + userName);
          const userToSave = {
            userName: userName,
            userEmail: userEmail,
            userPassword: hashedPassword,
            userMotto: userMotto,
            userJoinTime: new Date(),
            userIsAdmin: false,
            userPostCount: 0,
            userIsActive: true,
            userPhoto: userPhoto,
          };
          await userModel.create(userToSave);
          response.send({ success: true });
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    response.send({ success: false });
  }
);

/* Login */
app.post("/users/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  try {
    if (email && password) {
      // Check to see if the user already exists. If not, then create it.
      const user = await userModel.findOne({ userEmail: email });
      if (!user) {
        console.log("Invalid login - email " + email + " doesn't exist.");
        response.send({ success: false });
        return;
      } else {
        const isSame = await bcrypt.compare(password, user.userPassword);
        if (isSame) {
          console.log("Successful login");
          response.send({
            // return userID, userName, isAdmin in Json format
            success: true,
            user: user,
          });
          return;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  response.send({ success: false });
});

app.patch("/users/posts/:id", async (req, res) => {
  const userId = req.params.id;
  const userPostCount = req.body.userPostCount;

  // console.log("now count is:" + req.body.postcount);
  const results = await userModel.updateOne(
    { _id: userId },
    { userPostCount: userPostCount }
  );
  console.log("matched: " + results.matchedCount);
  console.log("modified: " + results.modifiedCount);
  res.send(results);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
