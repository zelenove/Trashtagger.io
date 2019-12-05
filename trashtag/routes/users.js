const express = require("express")
const router = express.Router()
const validator = require("validator")
const { User } = require("../models/user")

/*
    Expecting:
    No body
*/
router.get("/users/:username", (req, res) => {
    const { username } = req.params
    if (typeof username !== "string" || username.length < 4
        || !username.length > 32) {
        res.status(404).send("That user does not exist")
    }
    else {
        User.findByUsername(username).then((user) => {
            const userData = user.getData()
            res.status(200).send({
                user: {
                    username: userData.username,
                    quote: userData.quote,
                    about_me: userData.about_me,
                    picture_url: userData.picture_url,
                    requested_cleanups: userData.requested_cleanups,
                    completed_cleanups: userData.completed_cleanups
                }
            })
        })
        .catch((error) => {
            res.status(error.status).send(error.message)
        })
    }
})

/*
    Expecting:
    {
        quote: string,
        about_me: string,
        picture_url: string
    }
*/
router.patch("/users/:username", checkAuth, (req, res) => {
    const { username } = req.params
    const { quote, about_me, picture_url } = req.body

    // Verify input here
    if (req.session.user.username !== username) {
        res.status(401).send("You are not authorized to edit this profile")
    }
    else if (typeof quote !== "string") {
        res.status(400).send("That location name is invalid")
    }
    else if (typeof about_me !== "string" || about_me.length > 256) {
        res.status(400).send("That description is invalid")
    }
    else if (typeof picture_url !== "string" || !validator.isURL(picture_url)) {
        res.status(400).send("Invalid image")
    }
    else {
        User.findByUsername(username).then((user) => {
            user.quote = quote
            user.about_me = about_me
            user.picture_url = picture_url

            user.save().then((newUser) => {
                res.status(200).send({
                    user: newUser.getData() 
                })
            })
            .catch((error) => {
                res.status(500).send("Error updating user")
            })
        })
        .catch((error) => {
            res.status(error.status).send(error.message)
        })
    }
})

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
                        res.status(200).send({
                            user: user.getData()
                        })
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
                                    res.status(201).send({
                                        user: user.getData()
                                    })
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

/*
    Expecting:
    No body
*/
router.post("/users/logout", checkAuth, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send("There was an error logging out")
        }
        else {
            res.sendStatus(200)
        }
    })
})

// To check a user logged in for protected routes
function checkAuth(req, res, next) {
    if (!req.session.user) {
        res.sendStatus(401)
    }
    else {
        next()
    }
}

module.exports = router;