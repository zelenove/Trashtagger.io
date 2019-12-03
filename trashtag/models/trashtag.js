/* Student mongoose model */
const mongoose = require('mongoose');
const User = require('./user');

const TrashtagSchema = mongoose.Schema({
	// requested_by: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User',
	// 	required: true,
  // },
    
  requested_date: {
	  type: Date,
		default: Date.now,
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

	// longitude: {
	// 	type: mongoose.Decimal128,
	// 	required: true,
  // },

  // latitude: {
	// 	type: mongoose.Decimal128,
	// 	required: true,
  // },

  request_img: {
    type: String,
    required: true
  },

  cleaned: {
    type: Boolean,
    default: false
  },

  // cleaned_by: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User'
  // },

  cleaned_date: {
		type: Date,
  },

  cleaned_img: {
    type: String,
  }

});

const Trashtag = mongoose.model('Trashtag', TrashtagSchema)
module.exports = { Trashtag }