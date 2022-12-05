require('dotenv').config();
const mongoose = require("mongoose");
const userModel = require("./models");

const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //cross-orign resource sharing
const app = express();
const port = 3001; // Must be different than the port of the React app
app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

//foget password token
const jsonWebToken = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JASONWEBTOKEN_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose.connect("mongodb+srv://mongoxiaopei:" + process.env.MONGODB_PWD +
    "@cluster0.xx3ffbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/* User Registration*/
app.post("/users/register", async (request, response) => {
    const id = request.body.id;
    const userName = request.body.userName;
    const userEmail = request.body.userEmail;
    const userPassword = request.body.userPassword;
    const userMotto = request.body.userMotto;
    try {
        if (
            userName && validator.isAlphanumeric(userName) &&
            userPassword && validator.isStrongPassword(userPassword)
        ) {
            console.log(userName);
            // Check to see if the user already exists. If not, then create it.
            const user = await userModel.findOne({ userName: userName });
            const email = await userModel.findOne({ userEmail: userEmail });
            if (user) {
                console.log("Invalid registration - username " + userName + " already exists.");
                response.send({ success: false });
                return;

            } else if (email) {
                console.log("Invalid registration - email " + userEmail + " already exists.");
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
                    userPostCount:0,
                    userIsActive: true,
                };
                await userModel.create(userToSave);
                response.send({ success: true });
                return;
            }
        }
    } catch (error) { console.log(error.message); }
    response.send({ success: false });
});

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
                    response.send({ // return userID, userName, isAdmin in Json format
                        success: true,
                        "userID": user._id,
                        "userName": user.userName,
                        isAdmin: user.userIsAdmin
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


//forget password
app.post("/forgotPassword", async (request, response) => {
    const email = request.body.email;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ status: "User Not Exists!!" });
        }

        const secret = JASONWEBTOKEN_SECRET + user.password;
        const token = jsonWebToken.sign({ email: user.userEmail, id: user._id }, secret, { expiresIn: "5m", });
        const link = `http://localhost:3001/reset-password/${user._id}/${token}`;//link sent to email

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'reacter2022@gmail.com',
                pass: 'FSDreacter2022',
                clientId: '256342027446-pal8gb5oold4d7ifsl70a9vans7gmnqi.apps.googleusercontent.com',
                clientSecret: "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",
                refreshToken: "1//04IpqdPyWj-n6CgYIARAAGAQSNwF-L9IrMVe7CiKsbr8t8Z4G6cXetEgUYg_6d0ZQJsrrc33B1Uu1Iik5I2o1wXwyRjNft6aqwHY"
            },
        });

        var mailOptions = {
            from: "reacter2022@gmail.com",
            to: "pxtoday@hotmail.com",
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent successfully ");
                response.send({ success: true });
            }
        });
        return;

    } catch (error) {
        console.log(error.message);
    }
    response.send({ success: false });
});

// 
app.get("/reset-password/:id/:token", async (request, response) => {
    const { id, token } = request.params;
    console.log(req.params);
    const user = await userModel.findOne({ _id: id });
    if (!user) {
        return response.json({ status: "User Not Exists!!" });
    }
    const secret = JASONWEBTOKEN_SECRET + user.userPassword;
    try {
        const verify = jsonWebToken.verify(token, secret);
        response.render("index", { email: verify.email, status: "Not Verified" });
        response.send({ 
            success: true,
            "email": verify.email,
        });
    } catch (error) {
        console.log(error);
        response.send("Not Verified");
    }
});

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JASONWEBTOKEN_SECRET + user.password;
    try {
        const verify = jsonWebToken.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});

/* An API get request using query parameters to /users?_id=XXX */
app.get("/user", async (req, res) => {
    const userID = req.query._id;
    try {
        const user = await userModel.findOne({ _id: userID });
        res.send(user);
    } catch (err) {
        console.log(err);
    }
});

/* update Motto */
app.patch("/users/:useid/motto", async (req, res) => {
    const userID = req.params.useid;
    const motto = req.body.userMotto;
    try {
        const results = await userModel.updateOne({
            _id: userID
        }, { userMotto: motto });
        console.log("matched: " + results.matchedCount);
        console.log("modified: " + results.modifiedCount);
        res.send(results);
    } catch (err) {
        console.log(err);
    }
});


app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`))
