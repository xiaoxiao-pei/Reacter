const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userMotto: {
    type: String,
    required: false,
  },
  userJoinTime: {
    type: Date,
    required: true,
  },
  userIsAdmin: {
    type: Boolean,
    required: true,
  },
  userPhoto: {
    type: String,
    required: false,
  },
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
const User = mongoose.model("User", UserSchema);
module.exports = User;
