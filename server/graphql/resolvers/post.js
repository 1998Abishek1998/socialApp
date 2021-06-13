/** @format */

//this file contains the resolver for post done by user
const { AuthenticationError, UserInputError } = require("apollo-server-errors")
const Post = require("../../models/Post")
const { checkAuth } = require("../../utils/checkAuth")

module.exports = {
	Query: {
		async getAllPosts() {
			// this function gets all the post available
			try {
				const posts = await Post.find().sort({ createdAt: -1 })
				return posts
			} catch (err) {
				console.log(err)
			}
		},
		async getPost(_, { postId }) {
			// this function gets only the single post
			try {
				const post = await Post.findById(postId)
				if (post) {
					return post
				} else {
					throw new Error("Post not found")
				}
			} catch (err) {
				throw new Error(err)
			}
		},
	},
	Mutation: {
		async createPost(_, { body }, context) {
			// this function creates post by the authenticated user from context which is passed in index

			const user = checkAuth(context)
			if (body.trim() === "") {
				throw new Error("Post must not be empty")
			}

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			})

			const post = await newPost.save()

			context.pubsub.publish("NEW_POST", {
				newPost: post,
			})

			return post
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context)

			try {
				const post = await Post.findById(postId)
				if (user.username === post.username) {
					await post.delete()
					return "Post Deleted sucessfully"
				} else {
					throw new AuthenticationError("Action not allowed")
				}
			} catch (err) {
				throw new Error(err)
			}
		},
		async likePost(_, { postId }, context) {
			const { username } = checkAuth(context)
			const post = await Post.findById(postId)
			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					//post already liked now this code unlike its
					post.likes = post.likes.filter((like) => like.username !== username)
				} else {
					//	now we like thispost
					post.likes.push({
						username,
						createdAt: new Date().toISOString(),
					})
				}
				await post.save()
				return post
			} else throw new UserInputError("Post not found")
		},
	},
	Subscription: {
		newPost: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
		},
	},
}
