/** @format */

import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Button, Confirm, Icon } from "semantic-ui-react"

// import { FETCH_POSTS_QUERY } from "../utils/graphql"

function DeleteButton(props) {
	const callback = props.callback
	const cmtId = props.commentId
	const pstId = props.postId
	const [confirmOpen, setConfirmOpen] = useState(false)

	const mutation = cmtId ? DELETE_COMMENT_MUTATION : DELETE_POST
	const [deletePostorComment, { error }] = useMutation(mutation, {
		variables: { postId: pstId, commentId: cmtId },
		update() {
			setConfirmOpen(false)
			if (!props.commentId) {
				// const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
				// data.getAllPosts = data.getAllPosts.filter((p) => p.id !== pstId)
				// proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
				if (callback) callback()
			}
		},
		onError(err) {
			err = error
		},
	})

	return (
		<>
			<Button
				as="div"
				color="red"
				floated="right"
				onClick={() => setConfirmOpen(true)}>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>

			{/* /This code is for confirm tag whuch  will desgin later myself */}
			<Confirm
				open={confirmOpen}
				onConfirm={deletePostorComment}
				onCancel={() => setConfirmOpen(false)}
			/>
		</>
	)
}
const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`
const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
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
export default DeleteButton
