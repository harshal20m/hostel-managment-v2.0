import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import Attendance from "../components/Attendance";
import axios from "axios";

const Dashboard = () => {
	const [token, setToken] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (token) {
			const fetchUser = async () => {
				const res = await axios.get("https://hostel-managment-v2-0.onrender.com/api/auth/user", {
					headers: { "x-auth-token": token },
				});
				setUser(res.data);
			};
			fetchUser();
		}
	}, [token]);

	return (
		<div className="max-w-4xl mx-auto my-12 p-6 border rounded shadow-lg bg-white">
			{!token ? (
				<AuthForm setToken={setToken} />
			) : (
				<div>
					<h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>
					{user && (
						<div className="mb-6">
							<h3 className="text-2xl font-bold mb-2">Welcome, {user.name}</h3>
							<p className="text-gray-600">Email: {user.email}</p>
						</div>
					)}
					<Attendance token={token} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
