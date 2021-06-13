/** @format */
import gql from "graphql-tag"
export const FETCH_POSTS_QUERY = gql`
	{
		getAllPosts {
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
			username
			likes {
				username
				id
				createdAt
			}
		}
	}
`
