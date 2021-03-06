import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router";
import axios from "axios";
import * as Yup from "yup";

function Registration() {
	const initialValues = {
		username: "",
		password: "",
	};

	const history = useHistory();

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(3)
			.max(15)
			.required("You must input a Username!"),
		password: Yup.string().min(4).max(20).required(),
	});

	const onSubmit = (data) => {
		axios.post("http://localhost:3001/auth", data).then(() => {
			console.log(data);
		});
		history.push("/");
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className="formContainer">
					<label>Username: </label>
					<ErrorMessage name="username" component="span" />

					<Field
						autoComplete="off"
						id="inputCreatePost"
						name="username"
						placeholder="(Ex. John123...)"
					/>
					<label>Password: </label>
					<ErrorMessage name="password" component="span" />

					<Field
						autoComplete="off"
						id="inputCreatePost"
						name="password"
						placeholder="Your Password..."
						type="password"
					/>
					<button type="submit">Register</button>
				</Form>
			</Formik>
		</div>
	);
}

export default Registration;
