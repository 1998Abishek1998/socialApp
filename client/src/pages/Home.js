/** @format */

import { useQuery } from "@apollo/client"
import React, { useContext } from "react"
import { Transition } from "semantic-ui-react"

import PostCard from "../component/PostCard"
import PostForm from "../component/PostForm"
import { AuthContext } from "../context/authContext"
import { FETCH_POSTS_QUERY } from "../utils/graphql"
function Home() {
	const { user } = useContext(AuthContext)

	let { loading, data: posts } = useQuery(FETCH_POSTS_QUERY)

	return (
		<main className="page">
			<div>{user && <PostForm />}</div>
			<div className="postCard__container">
				{loading ? (
					<h3>Loading posts...</h3>
				) : (
					<Transition.Group>
						<h2>Recent Posts</h2>

						{posts &&
							posts.getAllPosts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
					</Transition.Group>
				)}
			</div>
		</main>
		// <Grid columns={3}>
		// 	<Grid.Row>
		// 		<h1>Recent Posts</h1>
		// 	</Grid.Row>
		// 	<Grid.Row>
		// 		{user && (
		// 			<Grid.Column>
		// 				<PostForm />
		// 			</Grid.Column>
		// 		)}
		// 		{loading ? (
		// 			<h1>loading posts...</h1>
		// 		) : (
		// 			<Transition.Group>
		// 				{posts &&
		// 					posts.getAllPosts.map((post) => (
		// 						<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
		// 							<PostCard post={post} />
		// 						</Grid.Column>
		// 					))}
		// 			</Transition.Group>
		// 		)}
		// 	</Grid.Row>
		// </Grid>
	)
}

export default Home
