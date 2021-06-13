/** @format */

import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"

function CommentAble({ id }) {
	const [comment, setComment] = useState("")
	const [submitComment, { error }] = useMutation(SUBMIT_COMMENT, {
		variables: {
			postId: id,
			body: comment,
		},
		update() {
			setComment("")
		},
		onError(err) {
			err = error
		},
	})
	function onSubmit() {
		submitComment()
	}
	return (
		<div className="ui action input fluid">
			<input
				type="text"
				placeholder="Enter a Comment..."
				name="comment"
				value={comment}
				onChange={(event) => setComment(event.target.value)}
				onKeyPress={(e) => {
					if (e.key === "Enter") onSubmit()
				}}
			/>
			<button
				type="submit"
				className="ui button teal"
				disabled={comment.trim() === ""}
				onClick={onSubmit}>
				comment
			</button>
		</div>
	)
}
const SUBMIT_COMMENT = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`
export default CommentAble
