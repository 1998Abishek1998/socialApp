/** @format */

import React, { useContext } from "react"
import { useQuery, gql } from "@apollo/client"

import { AuthContext } from "../context/authContext"

import Comments from "../component/Comments"
import PostCard from "../component/PostCard"

function SinglePost(props) {
	const postId = props.match.params.postId
	const { user } = useContext(AuthContext)
	if (!user) {
		alert("please login")
	}
	const { data: { getPost: postData } = {} } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId: postId,
		},
	})

	let postMarkup
	if (!postData) {
		postMarkup = <p>loading post...</p>
	} else {
		const {
			id,
			body,
			createdAt,
			comments,
			username,
			likes,
			likeCount,
			commentCount,
		} = postData
		postMarkup = (
			<>
				<div className="postCard__container">
					<PostCard post={postData} />
				</div>
				<div className="postCard__container">
					{comments &&
						comments.map((comment) => {
							return <Comments key={comment.id} comment={comment} id={id} />
						})}
				</div>
			</>
		)
	}

	return <div className="page">{postMarkup}</div>
}
const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`

export default SinglePost
