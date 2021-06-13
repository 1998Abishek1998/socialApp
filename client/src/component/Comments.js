/** @format */

import moment from "moment"
import React, { useContext } from "react"
import { AuthContext } from "../context/authContext"
import DeleteButton from "./DeleteButton"

function Comments({ comment, id }) {
	const { user } = useContext(AuthContext)
	return (
		<div className="comment__container">
			<div className="comment__user">
				<div className="comment__name">{comment.username}</div>
				<div>
					<span className="comment__createdAt">
						{moment(comment.createdAt).fromNow()}
					</span>
				</div>
			</div>
			<p>{comment.body}</p>
			<div className="comment__deletebtn">
				{user && user.username === comment.username && (
					<DeleteButton postId={id} commentId={comment.id} />
				)}
			</div>
		</div>
	)
}
export default Comments
