const express = require("express")
const router = express.Router()
const validator = require("validator")

const { Trashtag } = require('../models/trashtag')


router.post("/create-request/submit", (req, res) => {

    const trashtag = new Trashtag({
        //requested_by: req.body.requested_by,
        title: req.body.title,
        description: req.body.location,
        //longitude: req.body.longitude,
        //latitude: req.body.latitude,
       // request_img: req.body.request_img
    });
    console.log('erere')
    trashtag.save()
		.then(result => {
			res.send(result);
		})
		.catch(error => {
			res.status(400).send(error);
	});
    
});

module.exports = router;