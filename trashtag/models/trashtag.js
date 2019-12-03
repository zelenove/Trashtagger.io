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

  location: {
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

TrashtagSchema.post("find", populateUsers)
TrashtagSchema.post("save", populateUsers)

function populateUsers(doc, next) {
  doc.populate("requested_by")
     .populate("cleaned_by")
	   .execPopulate()
	   .then(() => {
		   next()
	   })
}

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