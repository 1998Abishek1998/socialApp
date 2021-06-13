/** @format */

const { model, Schema } = require("mongoose")

const postSchema = new Schema({
	body: String,
	username: String,
	createdAt: String,
	picture: [
		{
			// caption: String,
			// img: {
			// 	data: Buffer,
			// 	contentType: String,
			// },
			url: String,
		},
	],
	comments: [
		{
			body: String,
			username: String,
			createdAt: String,
		},
	],
	likes: [
		{
			username: String,
			createdAt: String,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
})
module.exports = model("Post", postSchema)
