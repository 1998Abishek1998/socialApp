/** @format */

import { useMutation, gql } from "@apollo/client"
import React, { useContext, useState } from "react"

import { AuthContext } from "../context/authContext"
import { useForm } from "../utils/hooks"
import RegisterImg from "../image/register.jpg"

const Register = (props) => {
	const context = useContext(AuthContext)
	const [errors, setErrors] = useState({}) //to have error
	const { values, onChange, onSubmit } = useForm(registerUserCallBack)

	const [addUser] = useMutation(REGISTER_USER, {
		// this is the forat of using mutation to add our user from registring
		update(_, { data: { register: userData } }) {
			context.login(userData)
			props.history.push("/") //this redirects us to the home page after login sucessfully
		},
		onError(err) {
			if (err.graphQLErrors != "")
				setErrors(err.graphQLErrors[0].extensions.exception.errors) // here we catch the errors from server and setThem
		},
		variables: values,
	})

	function registerUserCallBack() {
		addUser()
	}

	return (
		<div className="register">
			<h3>No Account ? Register..</h3>
			<div className="register__container">
				<form className="register__form">
					<input
						className="register__input"
						type="text"
						placeholder="Make a Username"
						name="username"
						onChange={onChange}
						value={values.username}
					/>
					<input
						className="register__input"
						type="text"
						placeholder="Write a valid email"
						name="email"
						onChange={onChange}
						value={values.email}
					/>
					<input
						className="register__input"
						type="password"
						placeholder="Make a new password"
						name="password"
						onChange={onChange}
						value={values.password}
					/>
					<input
						className="register__input"
						type="password"
						placeholder="Retype-password"
						name="confirmPassword"
						onChange={onChange}
						value={values.confirmPassword}
					/>
					<button type="submit" onClick={onSubmit} className="register__btn">
						Register
					</button>
				</form>
				<div className="register__imageContainer">
					<img src={RegisterImg} alt="register" />
				</div>
			</div>
			{/* Below here is the method to catch all the errors from our errors object specified in the userState above which gets triggered if there is any error (ie >0) */}
			{Object.keys(errors).length > 0 && (
				//this div helps to display the errors
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => {
							return <li key={value}>{value}</li>
						})}
					</ul>
				</div>
			)}
		</div>
	)
}
const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$password: String!
		$confirmPassword: String!
		$email: String!
	) {
		register(
			registerInput: {
				username: $username
				password: $password
				confirmPassword: $confirmPassword
				email: $email
			}
		) {
			createdAt
			email
			id
			token
			username
		}
	}
`
export default Register
