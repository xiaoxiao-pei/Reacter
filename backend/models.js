const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userPhoto:
    {
        data: Buffer,
        contentType: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userMotto:{
        type: String,
        required: false,
    },
    UserJoinTime: {
        type: Date,
        required: true,
    },
    UserIsAdmin:{
        type: Boolean,
        required: true,
    },
});
// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
const User = mongoose.model("User", UserSchema);
module.exports = User;
