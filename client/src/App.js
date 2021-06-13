/** @format */
import React from "react"
import { Switch, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import "./dist/style.css"
import Home from "./pages/Home"
// import Login from "./pages/Login"
import Menubar from "./component/Menubar"
import AuthRoute from "./utils/authRoute"
import SinglePost from "./pages/SinglePost"
import LoginRegister from "./pages/LoginRegister"
import Footer from "./component/Footer"

function App() {
	return (
		<>
			<Container>
				<Menubar />
				<Switch>
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={LoginRegister} />
					<Route exact path="/posts/:postId" component={SinglePost} />
				</Switch>
			</Container>
			<Footer />
		</>
	)
}

export default App
