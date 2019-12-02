/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 6
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
	// Find by email, to check while registering
	static findByEmail(email) {
		return new Promise((resolve, reject) => {
			return this.findOne({
				email: email
			})
			.then((user) => {
				if (!user) {
					reject({
						status: 400,
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
	static findByEmailPassword(email, password) {
		// First find the user by their email
		return new Promise((resolve, reject) => {
			return this.findByEmail(email).then((user) => {
				bcrypt.compare(password, user.password, (err, result) => {
					if (result) {
						resolve(user)
					}
					else {
						reject({
							status: 400,
							message: "Incorrect password"
						})
					}
				})
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

UserSchema.loadClass(UserClass)

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }