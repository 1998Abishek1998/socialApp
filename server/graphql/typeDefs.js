/** @format */

const gql = require("graphql-tag")

/** @format */
// here we define all the methods that are available in the graphql or say the app
module.exports = gql`
	# here type Post contains the availabe data type for post
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment]!
		likes: [Like]!
		likeCount: Int!
		picture: [Image]
		commentCount: Int!
	}
	type Image {
		url: String
	}
	# type Img {
	# 	data: String
	# 	contentType: String
	# }
	type Comment {
		id: ID!
		createdAt: String!
		username: String!
		body: String!
		likes: [Like]
	}
	type Like {
		id: ID!
		createdAt: String!
		username: String!
	}
	type User {
		# here type user contains the availabe data type for user
		id: ID!
		email: String!
		username: String!
		token: String!
		createdAt: String!
	}
	input RegisterInput {
		# here type RegisterInput contains the availabe data type for the registration of the user
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type Query {
		# this is the query part of the app
		getAllPosts: [Post]
		getPost(postId: ID!): Post
	}
	type Mutation {
		# Mutation is the place where we define the changes in app which actually changes dynamically as the user surfs thgrough the applike
		# register helps to register, login to login and so on
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post
		likePost(postId: ID!): Post!
		uploadFile(file: Upload): Post!
	}
	type Subscription {
		newPost: Post!
	}
`
