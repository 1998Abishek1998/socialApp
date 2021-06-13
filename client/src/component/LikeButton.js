/** @format */

import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Icon, Label } from "semantic-ui-react"

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
	const [liked, setLiked] = useState(false)
	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true)
		} else {
			setLiked(false)
		}
	}, [user, likes])

	const [likePost, { error }] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
		onError(err) {
			err = error
			console.log(error)
		},
	})

	const LikeButton = user ? (
		liked ? (
			<Button color="teal">
				<Icon name="heart" />
			</Button>
		) : (
			<Button basic color="teal">
				<Icon name="heart" />
			</Button>
		)
	) : (
		<>
			<Button basic color="teal" as={Link} to="/login">
				<Icon name="heart" />
			</Button>
		</>
	)

	return (
		<Button as="div" labelPosition="right" onClick={likePost}>
			{LikeButton}
			<Label basic color="teal" pointing="left">
				{likeCount}
			</Label>
		</Button>
	)
}
const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likeCount
			username
			likes {
				id
				username
			}
		}
	}
`
