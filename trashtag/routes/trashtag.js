const express = require("express")
const router = express.Router()
const validator = require("validator")

const { Trashtag } = require('../models/trashtag')
const { User } = require("../models/user")

router.post("/trashtags/create", checkAuth, (req, res) => {
    const { longitude, latitude, location, description, requestImg } = req.body

    // Verify input here
    if (typeof location !== "string") {
        res.status(400).send("That location name is invalid")
    }
    else if (typeof description !== "string" || description.length > 256) {
        res.status(400).send("That description is invalid")
    }
    else if (typeof latitude !== "number" || typeof longitude !== "number"
            || !validator.isLatLong(JSON.stringify(latitude) + "," + JSON.stringify(longitude))) {
        res.status(400).send("Invalid coordinates")
    }
    else if (typeof requestImg !== "string" || !validator.isURL(requestImg)) {
        res.status(400).send("Invalid image")
    }
    else {
        // Get the user to save the new request to
        User.findById(req.session.user._id).then((user) => {
            const trashtag = new Trashtag({
                requested_by: user.username,
                location: location,
                description: location,
                longitude: longitude,
                latitude: latitude,
                request_img: requestImg
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
                })
        })
        .catch((error) => {
            res.status(error.status).send(error.message)
        })
    }
});

router.post("/trashtags/complete-request", (req, res) => {
    const { rID, cleanedImg } = req.body

    if (typeof rID !== "number") {
        res.status(404).send("That cleanup request does not exist")
    }
    else if (typeof cleanedImg !== "string" || !validator.isURL(cleanedImg)) {
        res.status(400).send("Invalid image")
    }
    else {
        Trashtag.findByRID(rID).then((cleanupRequest) => {
            if (cleanupRequest.cleaned) {
                res.status(401).send("That cleanup request has already been completed")
            }
            else {
                // Find the user to update his cleanups
                User.findById(req.session.user._id).then((user) => {
                    cleanupRequest.cleaned = true
                    cleanupRequest.cleaned_by = user.username
                    cleanupRequest.cleaned_date = Date.now()
                    cleanupRequest.cleaned_img = cleanedImg

                    cleanupRequest.save()
                        .then(result => {
                            user.completed_cleanups.push(result._id)
                            user.save().then((userRes) => {
                                res.status(200).send({
                                    cleanup_request: result.getData(),
                                    user: userRes.getData()
                                })
                            })
                            .catch((error) => {
                                // Just retry saving once
                                user.save().then((userRes) => {
                                    res.status(200).send({
                                        cleanup_request: result.getData(),
                                        user: userRes.getData()
                                    })
                                })
                                .catch((error) => {
                                    res.status(500).send("Error saving the completion to the user")
                                })
                            })
                        })
                        .catch(error => {
                            res.status(500).send("Error completing cleanup request")
                        })
                })
            }
        })
        .catch((error) => {
            res.status(error.status).send(error.message)
        })
    }
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