/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
	},
	timeStamp: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
