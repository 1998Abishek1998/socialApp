/** @format */

import { useState } from "react"

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState({
		username: "",
		password: "",
		email: "",
		confirmPassword: "",
		body: "",
	})

	const onChange = (ele) => {
		setValues({ ...values, [ele.target.name]: ele.target.value }) //this function sets the values
	}

	const onSubmit = (event) => {
		event.preventDefault()
		callback()
	}

	return {
		onChange,
		onSubmit,
		values,
	}
}
