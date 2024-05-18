import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="text-center mt-12">
			<h1 className="text-4xl font-bold text-gray-800">Hostel Management System</h1>
			<Link
				to="/dashboard"
				className="inline-block mt-5 px-5 py-3 text-white bg-blue-500 rounded hover:bg-blue-700"
			>
				Go to Dashboard
			</Link>
		</div>
	);
};

export default HomePage;
