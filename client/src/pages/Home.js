import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Home = () => {
	const [listOfPosts, setListOfPosts] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios
			.get("http://localhost:3001/posts")
			.then((response) => setListOfPosts(response.data));
	}, []);

	const likeAPost = (postId) => {
		axios
			.post(
				"http://localhost:3001/likes",
				{
					PostId: postId,
				},
				{
					headers: {
						accessToken: localStorage.getItem("accessToken"),
					},
				}
			)
			.then((response) => {
				setListOfPosts(
					listOfPosts.map((post) => {
						if (post.id === postId) {
							if (response.data.liked) {
								return { ...post, Likes: [...post.Likes, ""] };
							} else {
								const likesArray = post.Likes;
								likesArray.pop();
								return { ...post, Likes: [...likesArray] };
							}
						} else {
							return post;
						}
					})
				);
			});
	};

	return (
		<div>
			{listOfPosts.map((val, key) => {
				return (
					<div
						className="post"
						onClick={() => {
							history.push(`/post/${val.id}`);
						}}
					>
						<div className="title">{val.title}</div>
						<div className="body">{val.postText}</div>
						<div className="footer">
							{val.username}{" "}
							<button
								onClick={() => {
									likeAPost(val.id);
								}}
							>
								{" "}
								Like{" "}
							</button>
							<label>{val.Likes.length}</label>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
