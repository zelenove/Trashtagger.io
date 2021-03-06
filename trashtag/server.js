"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

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

// The routes
const userRoute = require("./routes/users");
const trashtagRoute = require("./routes/trashtag");

app.use("/", userRoute);
app.use("/", trashtagRoute);

// Check if a session is authenticated
app.use("/auth", (req, res) => {
    if (req.session.user) {
        res.status(200).send({
            user: {
                username: req.session.user.username,
                email: req.session.user.email,
                quote: req.session.user.quote,
                about_me: req.session.user.about_me,
                picture_url: req.session.user.picture_url,
                requested_cleanups: req.session.user.requested_cleanups,
                completed_cleanups: req.session.user.completed_cleanups
            }
		})
    }
    else {
        res.sendStatus(401)
    }
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/build"));



// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001; 
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});