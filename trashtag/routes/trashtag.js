const express = require("express")
const router = express.Router()

const { Trashtag } = require('../models/trashtag')
const { User } = require("../models/user")



router.post("/create-request/submit", (req, res) => {

    const trashtag = new Trashtag({
        //requested_by: req.body.requested_by,
        location: req.body.location,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
       request_img: req.body.request_img
    });
    //console.log('erere')
    trashtag.save()
		.then(result => {
			res.send(result);
		})
		.catch(error => {
			res.status(400).send(error);
	});
    
});

router.get('/all-trashtags', (req,res) => {
    Trashtag.find().then((trashtags) => {
        res.send({trashtags})
    }, (error) => {
        res.status(500).send(error)
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