/** @format */
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const { validateRegisterInput } = require("../../utils/validators")
const { validateLoginInput } = require("../../utils/validators")

const { SECRET_KEY } = require("../../config")
const User = require("../../models/User")

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: "1h" }
	)
}

module.exports = {
	Mutation: {
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password)
			const user = await User.findOne({ username })
			if (!valid) {
				throw new UserInputError("Errors", { errors })
			}
			if (!user) {
				errors.general = "User not found"
				throw new UserInputError("User not found", { errors })
			}
			const match = await bcrypt.compare(password, user.password)
			if (!match) {
				errors.general = "Wrong Credentials"
				throw new UserInputError("Wrong Credentials", { errors })
			}
			const token = generateToken(user)

			return {
				...user._doc,
				id: user._id,
				token,
			}
		},
		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword } }
		) {
			// validate user data
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			)
			if (!valid) {
				throw new UserInputError("Errors", { errors })
			}
			//unique user info
			const user = await User.findOne({ username })
			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is taken",
					},
				})
			}

			//hash the password and create auth token
			password = await bcrypt.hash(password, 12)

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			})

			const result = await newUser.save()

			const token = generateToken(result)

			return {
				...result._doc,
				id: result._id,
				token,
			}
		},
	},
}
