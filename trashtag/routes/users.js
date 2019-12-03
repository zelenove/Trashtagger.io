const express = require("express")
const router = express.Router()
const validator = require("validator")
const { User } = require("../models/user")

/*
    Expecting:
    {
        username: string,
        password: string
    }
*/
router.post("/users/login", (req, res) => {
    const { username, password } = req.body

    // Validate the input
    if (typeof username !== "string" || username.length < 4
        || !username.length > 32) {
        res.status(404).send("That user does not exist")
    }
    else if (typeof password !== "string" || password.length < 6) {
        res.status(404).send("Incorrect password")
    }
    else {
        // Use the static method on the User model to find a user
        // by their email and password
        User.findByUsernamePassword(username, password)
            .then(user => {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user

                req.session.save((error) => {   
                    if (error) {
                        res.status(500).send("There was an error logging in")
                    }
                    else {
                        res.status(200).send(user.getData())
                    }
                })
            })
            .catch(error => {
                res.status(error.status).send(error.message)
            });
    }
    
});

/*
    Expecting:
    {
        username: string,
        email: string,
        password: string
    }
*/
router.post("/users/register", (req, res) => {
    const { username, email, password } = req.body

    // Validate the input
    if (typeof username !== "string" || username.length < 4
        || !username.length > 32) {
        res.status(401).send("Make sure your username only contains"
                             + " alphanumeric characters and is between 4"
                             + " and 32 characters long")
    }
    else if (typeof email !== "string" || !validator.isEmail(email )) {
        res.status(401).send("That email is not valid")
    }
    else if (typeof password !== "string" || password.length < 6) {
        res.status(401).send("Make sure your password is at least 6 characters long")
    }
    else {
        // Make sure the user doesn't already exist
        User.findByEmail(email).then((user) => {
            // Since the user exists, the user cannot use this email to register
            res.status(400).send("That email is already registered")
        })
        .catch((error) => {
            // The user does not exist
            if (error.status !== 404) {
                res.status(error.status).send(error.message)
            }
            else {
                User.findByUsername(username).then((user) => {
                    res.status(400).send("That user already exists")
                })
                .catch((error) => {
                    // The user does not exist
                    if (error.status !== 404) {
                        res.status(error.status).send(error.message)
                    }
                    else {
                        // Create a new user
                        const user = new User({
                            username: username,
                            email: email,
                            password: password
                        });

                        // Save the user
                        user.save().then((user) => {
                            req.session.user = user

                            req.session.save((error) => {
                                if (error) {
                                    res.status(500).send("There was an error logging in")
                                }
                                else {
                                    res.status(201).send(user.getData())
                                }
                            })
                        })
                        .catch((error) => {
                            res.status(500).send("There was an error logging in")
                        })
                    }
                })
            }
        })
    }
});

module.exports = router;