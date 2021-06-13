/** @format */

import React, { useContext, useState } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import moment from "moment"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"
import CommentAble from "./CommentAble"

function PostCard({
	props,
	post: { body, commentCount, likeCount, username, id, createdAt, likes },
}) {
	const [commentAble, setCommentAble] = useState(false)
	const { user } = useContext(AuthContext)
	function deletePostCallback() {
		window.location.reload()
		props.history.push("/")
	}
	return (
		<article className="postCard">
			<Link to={`/posts/${id}`}>
				<div className="postCard__header">
					<h3>{username}</h3>
					<h6>{moment(createdAt).fromNow()}</h6>
					<p>{body}</p>
				</div>
			</Link>
			<div className="postCard__extra">
				<div className="postCard__likebtn">
					<LikeButton user={user} post={{ id, likes, likeCount }} />
				</div>
				<div className="postCard__commentbtn">
					<Button
						as="div"
						labelPosition="right"
						onClick={() => setCommentAble(!commentAble)}>
						<Button color="purple" basic>
							<Icon name="comments" />
						</Button>
						<Label basic color="purple" pointing="left">
							{commentCount}
						</Label>
					</Button>
				</div>
				<div>
					{user && user.username === username && (
						<DeleteButton postId={id} callback={deletePostCallback} />
					)}
				</div>
			</div>
			<div className="commentArea">
				{user && commentAble && <CommentAble id={id} />}
			</div>
		</article>
		// <Card fluid>
		// 	<Card.Content as={Link} to={`/posts/${id}`}>
		// 		<Card.Header>{username}</Card.Header>
		// 		<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
		// 		<Card.Description>{body}</Card.Description>
		// 	</Card.Content>
		// 	<Card.Content extra>
		// 		<div>
		// 			<LikeButton user={user} post={{ id, likes, likeCount }} />
		// 			<Button as="div" labelPosition="right">
		// 				<Button color="purple" basic>
		// 					<Icon name="comments" />
		// 				</Button>
		// 				<Label basic color="purple" pointing="left">
		// 					{commentCount}
		// 				</Label>
		// 			</Button>
		// 			{user && user.username === username && (
		// 				<DeleteButton postId={id} callback={deletePostCallback} />
		// 			)}
		// 		</div>
		// 	</Card.Content>
		// </Card>
	)
}

export default PostCard
