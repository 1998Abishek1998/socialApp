/** @format */

import React from "react"
import Register from "../component/Register"
import Login from "../component/Login"
const LoginRegister = () => {
	return (
		<main className="page">
			<Login />
			<div className="singleLine"></div>
			<Register />
		</main>
	)
}

export default LoginRegister
