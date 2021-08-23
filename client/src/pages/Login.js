import React, { useState } from "react";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {};

	return (
		<div>
			<input
				type="text"
				name=""
				id=""
				onChange={(event) => setUsername(event.target.value)}
				value={username}
			/>
			<input
				type="password"
				name=""
				id=""
				onChange={(event) => setPassword(event.target.value)}
				value={password}
			/>
			<button type="submit" onSubmit={login}>
				Login
			</button>
		</div>
	);
}

export default Login;
