/** @format */

const { ApolloServer, PubSub } = require("apollo-server")
const mongoose = require("mongoose")

const { MONGODB } = require("./config")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const pubsub = new PubSub()

const server = new ApolloServer({
	typeDefs, // this helps to define the kind of function , variables we are using in the backend and frontend
	resolvers, //this resolves the backend properly
	context: ({ req }) => ({ req, pubsub }), //this helps in authentication of the user while changing any elements like only posting the posts if the user is authenticated by the server
})

//here we are connecting to the mongo db backend and then starting our local server
mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("database connected")
		return server.listen({ port: 5000 })
	})
	.then((res) => {
		console.log(res.url)
	})
