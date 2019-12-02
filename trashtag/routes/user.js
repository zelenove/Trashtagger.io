const express = require("express")
const router = express.Router()
const validator = require("validator")

/*
    Expecting:
    {
        email: string,
        password: string
    }
*/
router.post("users/login", (req, res) => {
    console.log("HIA")
    log(email, password);
    const { email, password } = req.body

    // Validate the input
    if (typeof email !== "string" || !validator.isEmail(email )) {
        res.status(401).send("That email is not valid")
    }
    else if (typeof password !== "string" || password.length < 6) {
        res.status(401).send("Make sure your password is at least 6 characters long")
    }
    else {
        // Use the static method on the User model to find a user
        // by their email and password
        User.findByEmailPassword(email, password)
            .then(user => {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user._id;
                req.session.email = user.email;
                res.status(200).send({ currentUser: user.email });
            })
            .catch(error => {
                res.status(error.status).send(error.message)
            });
    }
    
});

/*
    Expecting:
    {
        email: string,
        password: string
    }
*/
router.post("users/register", (req, res) => {
    const { email, password } = req.body

    // Validate the input
    if (typeof email !== "string" || !validator.isEmail(email )) {
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
            if (error.status !== 400) {
                res.status(error.status).send(error.message)
            }
            else {
                // Create a new user
                const user = new User({
                    email: email,
                    password: password
                });

                // Save the user
                user.save().then(
                    user => {
                        console.log(user)
                        res.status(201).send(user);
                    },
                    error => {
                        res.status(500).send(error);
                    }
                );
            }
        })
    }
});

module.exports = router;