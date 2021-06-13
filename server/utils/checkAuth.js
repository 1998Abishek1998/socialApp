/** @format */

// In this file we are authenticating our user token
// Also making sure that the user is logged in
const { AuthenticationError } = require("apollo-server")

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

module.exports.checkAuth = (context) => {
	//context whill have a object which contains headers
	const authHeader = context.req.headers.authorization
	if (authHeader) {
		const token = authHeader.split("Bearer ")[1] // here there should be a space after Bearer cause its the format for jsonwebToken
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY)
				return user
			} catch (err) {
				throw new AuthenticationError("Invalid/ Expired token")
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]")
	}
	throw new Error("Authorization header must be provided")
}
