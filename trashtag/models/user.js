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
	numRequested: {
		type: Number,
		default: 0
	},
	numCleaned: {
		type: Number,
		default: 0
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

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
		return {
			username: this.username,
			email: this.email,
			numRequested: this.numRequested,
			numCleaned: this.numCleaned
		}
	}
}

UserSchema.loadClass(UserClass)

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }