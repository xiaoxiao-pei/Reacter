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

/*API GET*/
app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users);
    } catch (err) {
        console.log(err);
    }

});

/* API POST request using body /users */
app.post("/users", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = {
        username: username,
        password: password,
    };
    try {
        await userModel.create(user);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
});

/* An API get request using query parameters to /users?username=XXX */
app.get("/user", async (req, res) => {
    const username = req.query.username;
    try {
        const user = await userModel.findOne({ username: username });
        res.send(user);
    } catch (err) {
        console.log(err);
    }

});

/* An API get request using URL path parameters 
to /users/:username */
app.get("/users/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userModel.findOne({ username: username });
        res.send(user);
    } catch (err) {
        console.log(err);
    }

});

/* An API post request using body to get user 
/users/get */
app.post("/users/get", async (req, res) => {
    const username = req.body.username;
    try {
        const user = await userModel.findOne({ username: username });
        res.send(user);
    } catch (err) {
        console.log(err);
    }

});

/* An API post request using body /users. 
Replaces the entire user. */
app.put("/users", async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const user = {
        username: username,
        password: password,
    };
    try {
        const results = await userModel.replaceOne({
            username: username
        }, user);
        console.log("matched: " + results.matchedCount);
        console.log("modified: " +
            results.modifiedCount);
        res.send(results);
    } catch (err) {
        console.log(err);
    }

});

/* An API post request using body /users/username 
that changes a single field */
app.patch("/users/:username/password", async (req, res) => {
    const username = req.params.username;
    const password = req.body.password;
    try {
        const results = await userModel.updateOne({
            username: username
        }, { password: password });
        console.log("matched: " + results.matchedCount);
        console.log("modified: " + results.modifiedCount);
        res.send(results);
    } catch (err) {
        console.log(err);
    }

});

/* An API delete request using URL path 
parameters to /users/:username */
app.delete("/users/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const results = await userModel.deleteOne({ username: username });
        res.send(results);
    } catch (err) {
        console.log(err);
    }

});

/* Register */
app.post("/users/register", async (request, response) => {
    const id = request.body.id;
    const username = request.body.username;
    const password = request.body.password;
    try {
        if (
            username && validator.isAlphanumeric(username) &&
            password && validator.isStrongPassword(password)) {
            // Check to see if the user already exists. If not, then create it.
            const user = await userModel.findOne({ username: username });
            if (user) {
                console.log("Invalid registration - username " + username + " already exists.");
                response.send({ success: false });
                return;
            } else {
                hashedPassword = await bcrypt.hash(password, saltRounds);
                console.log("Registering username " + username);
                const userToSave = {
                    username: username,
                    password: hashedPassword
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
    const username = request.body.username;
    const password = request.body.password;
    try {
        if (username && password) {
            // Check to see if the user already exists. If not, then create it.
            const user = await userModel.findOne({ username: username });
            if (!user) {
                console.log("Invalid login - username " + username + " doesn't exist.");
                response.send({ success: false });
                return;
            } else {
                const isSame = await bcrypt.compare(password, user.password);
                if (isSame) {
                    console.log("Successful login");
                    response.send({ success: true });
                    return;
                }
            }
        }
    } catch (error) {
        console.log(error.message);
    }
    response.send({ success: false });
});




app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`))
