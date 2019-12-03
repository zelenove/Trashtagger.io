/* Trashtag mongoose model */
const { mongoose } = require('../db/mongoose');

const TrashtagSchema = new mongoose.Schema({
	  requested_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
		    required: true,
    },
    
    requested_date: {
        type: Date,
        required: true,
    },

	  longitude: {
        type: mongoose.Decimal128,
        required: true,
    },

    latitude: {
        type: mongoose.Decimal128,
        required: true,
    },

    request_img: {
        type: String,
        required: true
    },

    cleaned: {
        type: Boolean,
        required: true
    },

    cleaned_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    cleaned_date: {
		    type: Date,
    },

    cleaned_img: {
        type: String,
    }

});

// make a model using the User schema
const Trashtag = mongoose.model('Trashtag', TrashtagSchema)
module.exports = { Trashtag }