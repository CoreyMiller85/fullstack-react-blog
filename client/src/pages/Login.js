import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();

	const login = () => {
		const data = { username: username, password: password };
		axios.post("http://localhost:3001/auth/login", data).then((response) => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				sessionStorage.setItem("accessToken", response.data);
				history.push("/");
			}
		});
	};

	return (
		<div className="loginContainer">
			<label htmlFor="username">Username: </label>
			<input
				type="text"
				name="username"
				onChange={(event) => setUsername(event.target.value)}
				value={username}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				onChange={(event) => setPassword(event.target.value)}
				value={password}
			/>
			<button type="submit" onClick={login}>
				Login
			</button>
		</div>
	);
}

export default Login;
