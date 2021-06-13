/** @format */

import { useMutation } from "@apollo/client"
import { gql } from "graphql-tag"
import { React, useState } from "react"
import { useForm } from "../utils/hooks"
import { FETCH_POSTS_QUERY } from "../utils/graphql"

function PostForm() {
	const { values, onChange } = useForm()
	const [createPost, { error }] = useMutation(CREATE_POST, {
		variables: values,

		update(proxy, result) {
			const data = proxy.readQuery({ query: FETCH_POSTS_QUERY }) // this is to go inside the cache memory of apollo . we assigned all the cache to data
			data.getAllPosts = [result.data.createPost, ...data.getAllPosts] // we put our new post at first in the array and rest after it
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
			values.body = ""
		},
		onError() {
			console.log(error)
		},
	})
	// function createPostCallback() {
	// 	createPost()
	// }
	function onSubmit() {
		//	window.preventDefault()
		// window.location.reload()
		createPost()
	}

	return (
		<>
			<form className="postForm">
				<input
					className="postForm__input"
					type="text"
					name="body"
					value={values.body}
					placeholder="Create a Post...."
					onChange={onChange}
				/>
				<button type="submit" onClick={onSubmit} className="postForm__btn">
					Post
				</button>
			</form>
			{/* 
			{error && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>
							{error.graphQlErrors != "" && error.graphQLErrors[0].message}
						</li>
					</ul>
				</div>
			)} */}
		</>
	)
}
const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			body
			commentCount
			comments {
				body
				createdAt
				id
				username
			}
			createdAt
			id
			likeCount
			likes {
				createdAt
				id
				username
			}
			username
		}
	}
`
export default PostForm
