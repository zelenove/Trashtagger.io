const express = require("express")
const router = express.Router()
const validator = require("validator")

const { Trashtag } = require('../models/trashtag')
const { User } = require("../models/user")

router.post("/trashtags/create", checkAuth, (req, res) => {
    const { longitude, latitude, location, description } = req.body

    // Verify input here
    if (typeof location !== "string") {
        res.status(401).send("That location name is invalid")
    }
    else if (typeof description !== "string" || description.length > 256) {
        res.status(401).send("That description is invalid")
    }
    else if (typeof latitude !== "number" || typeof longitude !== "number"
             || !validator.isLatLong(JSON.stringify(latitude) + "," + JSON.stringify(longitude))) {
        res.status(401).send("Invalid coordinates")
    }
    else {
        // Get the user to save the new request to
        User.findById(req.session.user._id).then((user) => {
            const trashtag = new Trashtag({
                requested_by: req.session.user._id,
                title: req.body.title,
                description: req.body.location,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                request_img: req.body.request_img
            });


            trashtag.save()
                .then(result => {
                    user.requested_cleanups.push(result._id)
                    user.save().then((userRes) => {
                        res.status(201).send({
                            cleanup_request: result.getData(),
                            user: userRes.getData()
                        })
                    })
                    .catch((error) => {
                        // Just retry saving once
                        user.save().then((userRes) => {
                            res.status(201).send({
                                cleanup_request: result.getData(),
                                user: userRes.getData()
                            })
                        })
                        .catch((error) => {
                            res.status(500).send("Error saving cleanup request to user")
                        })
                    })
                })
                .catch(error => {
                    res.status(500).send("Error creating cleanup request");
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