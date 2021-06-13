/** @format */

// /** @format */

// //demo for the server connection this is actually done in index

// import React from "react"
// import App from "./App"
// import ApolloClient from "apollo-client"
// import { InMemoryCache } from "apollo-cache-inmemory"
// import { createHttpLink } from "apollo-link-http"
// import { ApolloProvider } from "@apollo/react-hooks"
// import { setContext } from "apollo-link-context"

// const httpLink = createHttpLink({
// 	uri: "http://localhost:5000",
// })
// //here we use this function to add the authorization header or token to the clients at the start it it done by
// const authLink = setContext(() => {
// 	const token = localStorage.getItem("jwtToken")
// 	return {
// 		headers: {
// 			Authorization: token ? `Bearer ${token}` : "",
// 		},
// 	}
// })
// const client = new ApolloClient({
// 	link: authLink.concat(httpLink), //the header link is passed here
// 	cache: new InMemoryCache(),
// })

// export default (
// 	<ApolloProvider client={client}>
// 		<App />
// 	</ApolloProvider>
// )
