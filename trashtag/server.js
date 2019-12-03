"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

const { mongoose } = require('./db/mongoose')

// Helmet for security
const helmet = require("helmet");
app.use(helmet());

const {Trashtag} = require ('./models/trashtag')

// CORS for cross-origin requests
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

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

app.use("/", userRoute);

// Check if a session is authenticated
app.use("/auth", (req, res) => {
    if (req.session.user) {
        res.status(200).send({
			username: req.session.user.username,
			email: req.session.user.email,
			numRequested: req.session.user.numRequested,
			numCleaned: req.session.user.numCleaned
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

app.post("/create-request/submit", (req, res) => {

    const trashtag = new Trashtag({
        //requested_by: req.body.requested_by,
        title: req.body.title,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        request_img: req.body.request_img
    });
    console.log('HERE')
    trashtag.save()
		.then(result => {
			res.send(result);
		})
		.catch(error => {
			res.status(400).send(error);
	});
    
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});