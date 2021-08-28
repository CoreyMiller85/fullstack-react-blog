import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Post = () => {
	let { id } = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
			setPostObject(response.data);
		});

		axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
			setComments(response.data);
		});
	}, [id]);

	const addComment = () => {
		axios
			.post(
				"http://localhost:3001/comments",
				{
					commentBody: newComment,
					PostId: id,
				},
				{
					headers: {
						accessToken: sessionStorage.getItem("accessToken"),
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					alert(JSON.stringify(response.data.error));
				}
				const commentToAdd = {
					commentBody: newComment,
					username: response.data.username,
				};
				setComments([...comments, commentToAdd]);
				setNewComment("");
			});
	};

	return (
		<div className="postPage">
			<div className="leftSide">
				<div className="post" id="individual">
					<div className="title">{postObject.title}</div>
					<div className="body">{postObject.postText}</div>
					<div className="footer">{postObject.username}</div>
				</div>
			</div>
			<div className="rightSide">
				<div className="addCommentContainer">
					<input
						type="text"
						placeholder="Comment..."
						autoComplete="off"
						value={newComment}
						onChange={(event) => {
							setNewComment(event.target.value);
						}}
					/>
					<button onClick={addComment}>Add Comment</button>
				</div>
				<div className="listOfComments">
					{comments.map((value, index) => {
						return (
							<div key={index} className="comment">
								{value.commentBody}
								<label>Username: </label>
								{value.username}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Post;
