/* Student mongoose model */
const { mongoose } = require('../db/mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose)

const TrashtagSchema = mongoose.Schema({
  rID: {
    type: Number
  }, // Auto incremented number of requests

  requested_by: {
    type: String,
    required: true
  },

  requested_date: {
	  type: Date,
	  default: Date.now
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
		  type: Number,
		  required: true,
    },

    latitude: {
		  type: Number,
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
    type: "String"
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
      console.log("HERE")
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

    // Retrieve the data to be send to the client
    getData() {
        return {
            rID: this.rID,
            requested_by: this.requested_by,
            requested_date: this.requested_date,
            location: this.location,
            description: this.description,
            longitude: this.longitude,
            latitude: this.latitude,
            request_img: this.request_img,
            cleaned: this.cleaned,
            cleaned_by: this.cleaned_by,
            cleaned_date: this.cleaned_date,
            cleaned_img: this.cleaned_img
        }
    }
}

TrashtagSchema.loadClass(TrashtagClass)

const Trashtag = mongoose.model('Trashtag', TrashtagSchema)
module.exports = { Trashtag }