/** @format */
import React from "react"
import ReactDOM from "react-dom"
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from "@apollo/client"
import { setContext } from "apollo-link-context"

import { AuthProvider } from "./context/authContext"
import { BrowserRouter as Router } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
/** @format */

//demo for the server connection this is actually done in index

import App from "./App"

const httpLink = createHttpLink({
	uri: "http://localhost:5000",
})
//here we use this function to add the authorization header or token to the clients at the start it it done by
const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken")
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink), //the header link is passed here
	cache: new InMemoryCache(),
})
ReactDOM.render(
	<ApolloProvider client={client}>
		<AuthProvider>
			<Router>
				<App />
			</Router>
		</AuthProvider>
	</ApolloProvider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
