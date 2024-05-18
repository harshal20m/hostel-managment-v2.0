import { useState } from "react";
import axios from "axios";

const AuthForm = ({ setToken }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`http://localhost:5000/api/auth/${isLogin ? "login" : "signup"}`, formData);
			setToken(res.data.token);
		} catch (err) {
			console.error(err.response ? err.response.data : err.message);
			alert("Error: " + (err.response ? err.response.data.msg : "Server not reachable"));
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 border rounded shadow-lg bg-white">
			<form onSubmit={onSubmit} className="flex flex-col">
				{!isLogin && (
					<input
						type="text"
						name="name"
						value={name}
						onChange={onChange}
						placeholder="Name"
						className="mb-4 p-2 border rounded"
					/>
				)}
				<input
					type="email"
					name="email"
					value={email}
					onChange={onChange}
					placeholder="Email"
					className="mb-4 p-2 border rounded"
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={onChange}
					placeholder="Password"
					className="mb-4 p-2 border rounded"
				/>
				<button type="submit" className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700">
					{isLogin ? "Login" : "Sign Up"}
				</button>
			</form>
			<button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500 hover:underline">
				{isLogin ? "Switch to Sign Up" : "Switch to Login"}
			</button>
		</div>
	);
};

export default AuthForm;
