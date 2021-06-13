/** @format */

import { useMutation, gql } from "@apollo/client"
import React, { useState, useContext } from "react"

import { AuthContext } from "../context/authContext"
import { useForm } from "../utils/hooks"
function Login(props) {
	const context = useContext(AuthContext)
	const [errors, setErrors] = useState({}) //to have error
	const { values, onChange, onSubmit } = useForm(loginUserCallBack)
	const [loginUser = {}, { loading }] = useMutation(LOGIN_USER, {
		// this is the forat of using mutation to add our user from registring
		update(_, { data: { login: userData } }) {
			context.login(userData)
			props.history.push("/") //this redirects us to the home page after login sucessfully
		},
		onError(err) {
			if (err.graphQLErrors != "") {
				setErrors(err.graphQLErrors[0].extensions.exception.errors) // here we catch the errors from server and setThem
			}
		},
		variables: values,
	})

	function loginUserCallBack() {
		loginUser()
	}

	return (
		<div className="login">
			<h3>Have an Account ? Login..</h3>
			<form className="login__form">
				<input
					className="login__input"
					type="text"
					placeholder="Enter your name"
					name="username"
					onChange={onChange}
					value={values.username}
				/>
				<input
					className="login__input"
					type="password"
					placeholder="Enter your password"
					name="password"
					onChange={onChange}
					value={values.password}
				/>
				<button type="submit" onClick={onSubmit} className="login__btn">
					Login
				</button>
			</form>

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
const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			createdAt
			email
			id
			token
			username
		}
	}
`
export default Login
