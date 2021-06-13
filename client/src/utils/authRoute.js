/** @format */

//here if we are logged in then we cant go to the login or register page even if we change the url name

import React, { useContext } from "react"
import { Redirect, Route } from "react-router"
import { AuthContext } from "../context/authContext"

function AuthRoute({ component: Component, ...rest }) {
	const { user } = useContext(AuthContext)

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	)
}

export default AuthRoute
