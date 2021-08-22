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
						<div className="footer">{val.username}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
