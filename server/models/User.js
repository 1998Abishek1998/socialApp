/** @format */
//this file is for the schema type which we can do or not dosent matter
const { model, Schema } = require("mongoose")

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String,
})
module.exports = model("User", userSchema)
