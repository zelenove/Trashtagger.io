const express = require("express")
const router = express.Router()

const { Trashtag } = require('../models/trashtag')
const { User } = require("../models/user")

router.post("/trashtags/create", checkAuth, (req, res) => {
    const { location, description } = req.body

    // Verify input here
    if (typeof location !== "string") {
        res.status(401).send("That location name is invalid")
    }
    else if (typeof description !== "string" || description.length > 256) {
        res.status(401).send("That description is invalid")
    }
    else {
        // Get the user to save the new request to
        User.findById(req.session.user._id).then((user) => {
            const trashtag = new Trashtag({
                requested_by: req.session.user._id,
                title: req.body.title,
                description: req.body.location,
                //longitude: req.body.longitude,
                //latitude: req.body.latitude,
                request_img: req.body.request_img
            });

            trashtag.save()
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    res.status(400).send(error);
            });
        })
    }
});

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