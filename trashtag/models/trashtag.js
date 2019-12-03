/* Student mongoose model */
const { mongoose } = require('../db/mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose)

const TrashtagSchema = mongoose.Schema({
  rID: {
    type: Number,
    required: true
  }, // Auto incremented number of requests

	requested_by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },

  requested_date: {
	  type: Date,
		default: Date.now,
  },
<<<<<<< HEAD
 
  title: {
=======

  location: {
>>>>>>> 46277bb1a8834c382d4815e1efbbe2017c0603de
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
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
    default: false
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

TrashtagSchema.plugin(AutoIncrement, {
  inc_field: "rID"
})

class TrashtagClass {
  // Find by rID, the request number
  static findByRID(rID) {
    return new Promise((resolve, reject) => {
			return this.findOne({
				rID: rID
			})
			.then((cleanup) => {
				if (!cleanup) {
					reject({
						status: 404,
						message: "That cleanup request does not exist"
					})  // a rejected promise
				}
				else {
					resolve(cleanup)
				}
			})
			.catch((error) => {
				reject({
					status: 500,
					message: "Error processing your request"
				})
			})
		})
  }
}

TrashtagSchema.loadClass(TrashtagClass)

const Trashtag = mongoose.model('Trashtag', TrashtagSchema)
module.exports = { Trashtag }