/** @format */

const { UserInputError, AuthenticationError } = require("apollo-server-errors")
const path = require("path")
const fs = require("fs")

const Post = require("../../models/Post")
const { checkAuth } = require("../../utils/checkAuth")

module.exports = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = checkAuth(context)
			if (body.trim() === "") {
				throw new UserInputError("Empty comment", {
					errors: {
						body: "Comment body must not be empty",
					},
				})
			}
			const post = await Post.findById(postId)

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				})
				await post.save()
				return post
			} else throw new UserInputError("Post not found")
		},
		async deleteComment(_, { postId, commentId }, context) {
			const { username } = checkAuth(context)

			const post = await Post.findById(postId)

			if (post) {
				const commentIndex = post.comments.findIndex((c) => c.id === commentId)
				console.log(commentIndex)
				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1)
					await post.save()
					return post
				} else throw new AuthenticationError("Cannot do this Action")
			} else {
				throw new UserInputError("Post not Available")
			}
		},
		async uploadFile(_, { file }) {
			const { createReadStream, filename, mimetype, encoding } = await file
			const stream = createReadStream()
			const pathname = path.join(__dirname, `/public/images/${filename}`)
			await stream.pipe(fs.createWriteStream(pathname))
			return {
				url: `http://localhost:5000/images/${filename}`,
			}
		},
	},
}
