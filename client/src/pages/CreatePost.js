import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const CreatePost = () => {
	const initialValues = {
		title: "",
		postText: "",
		username: "",
	};

	const onSubmit = (data) => {
		axios
			.post("http://localhost:3001/posts", data)
			.then(() => history.push("/"));
	};

	let history = useHistory();

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("You must input a Title!"),
		postText: Yup.string().required("You must input a Post!"),
		username: Yup.string()
			.min(3)
			.max(15)
			.required("You must input a Username!"),
	});

	return (
		<div className="createPostPage">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className="formContainer">
					<label>Title: </label>
					<ErrorMessage name="title" component="span" />
					<Field
						autoComplete="off"
						id="inputCreatePost"
						name="title"
						placeholder="(Ex. Title...)"
					/>
					<label>Post: </label>
					<ErrorMessage name="postText" component="span" />

					<Field
						autoComplete="off"
						id="inputCreatePost"
						name="postText"
						placeholder="(Ex. Post...)"
					/>
					<label>Username: </label>
					<ErrorMessage name="username" component="span" />

					<Field
						autoComplete="off"
						id="inputCreatePost"
						name="username"
						placeholder="(Ex. John123...)"
					/>
					<button type="submit">Create Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
