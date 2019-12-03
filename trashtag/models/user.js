/* User model */
'use strict';

const { mongoose } = require('../db/mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 32,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isAlphanumeric,
			message: "That username is not valid"
		}
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: "That email is not valid"
		}
	}, 
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6
	},
	requested_cleanups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trashtag'
		}
	],
	completed_cleanups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trashtag'
		}
	],
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	// checks to ensure we don't hash password more than once
	if (this.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				this.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// Populate the trashtags after finding a user
UserSchema.post("find", populateTrashtags)
UserSchema.post("save", populateTrashtags)

function populateTrashtags(doc, next) {
	doc.populated("requested_cleanups")
	   .populate("completed_cleanups")
	   .execPopulate()
	   .then(() => {
		   next()
	   })
}

// A class of functions for the user schema
class UserClass {
	// Find by username, to check while registering/logging in
	static findByUsername(username) {
		return new Promise((resolve, reject) => {
			return this.findOne({
				username: username
			})
			.then((user) => {
				if (!user) {
					reject({
						status: 404,
						message: "That user does not exist"
					})  // a rejected promise
				}
				else {
					resolve(user)
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

	// Find by email, to check while registering
	static findByEmail(email) {
		return new Promise((resolve, reject) => {
			return this.findOne({
				email: email
			})
			.then((user) => {
				if (!user) {
					reject({
						status: 404,
						message: "That email is not registered"
					})  // a rejected promise
				}
				else {
					resolve(user)
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

	// Allows us to find a User document by comparing the hashed password
	//  to a given one, for example when logging in.
	static findByUsernamePassword(username, password) {
		// First find the user by their email
		return new Promise((resolve, reject) => {
			return this.findByUsername(username).then((user) => {
				bcrypt.compare(password, user.password, (err, result) => {
					if (result) {
						resolve(user)
					}
					else {
						reject({
							status: 404,
							message: "Incorrect password"
						})
					}
				})
			})
			.catch((error) => {
				reject(error)
			})
		})
	}

	// Extract information to send to the client
	getData() {
		//console.log(this.populate)
		return {
			username: this.username,
			email: this.email,
			requested_cleanups: this.requested_cleanups,
			completed_cleanups: this.completed_cleanups
		}
	}
}

UserSchema.loadClass(UserClass)

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }