"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// CORS for cross-origin requests
const cors = require("cors")
app.use(cors())

// The routes
const userRoute = require("./routes/users");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { Trashtag } = require("./models/trashtag");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// Helmet for security
const helmet = require("helmet");
app.use(helmet());

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

app.use("/", userRoute);

// Check if a session is authenticated
app.use("/auth", (req, res) => {
    console.log(req.user)
    console.log(req.session)
    res.sendStatus(400)
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));



// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});