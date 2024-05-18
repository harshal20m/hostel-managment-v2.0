import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import Loader from "./Loader"; // Import the Loader component
import "react-calendar/dist/Calendar.css";

const Attendance = ({ token }) => {
	const [attendance, setAttendance] = useState([]);
	const [status, setStatus] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [loading, setLoading] = useState(false); // State to manage loading state

	useEffect(() => {
		const fetchAttendance = async () => {
			setLoading(true); // Set loading to true before starting the fetch
			try {
				const res = await axios.get("http://localhost:5000/api/attendance", {
					headers: { "x-auth-token": token },
				});
				setAttendance(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false); // Set loading to false after the fetch is complete
			}
		};
		fetchAttendance();
	}, [token]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Set loading to true before starting the submission
		try {
			const res = await axios.post(
				"http://localhost:5000/api/attendance",
				{ date: selectedDate, status },
				{ headers: { "x-auth-token": token } }
			);
			setAttendance([...attendance, res.data]);
			setStatus("");
			setSubmitDisabled(true);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false); // Set loading to false after the submission is complete
		}
	};

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
		setSubmitDisabled(e.target.value === "");
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 border rounded shadow-lg bg-white">
			{loading && <Loader />} {/* Show Loader while loading */}
			{!loading && (
				<>
					<form onSubmit={onSubmit} className="flex flex-col mb-6">
						<select value={status} onChange={handleStatusChange} className="mb-4 p-2 border rounded">
							<option value="">Select Status</option>
							<option value="Present">Present</option>
							<option value="Absent">Absent</option>
						</select>
						<button
							type="submit"
							className={`p-2 text-white rounded ${
								submitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
							}`}
							disabled={submitDisabled}
						>
							Mark Attendance
						</button>
					</form>
					<h3 className="text-xl font-bold mb-4">Attendance Records</h3>
					<Calendar
						className="mb-4"
						onChange={handleDateChange}
						value={selectedDate}
						tileClassName={({ date }) => {
							const formattedDate = dayjs(date).format("YYYY-MM-DD");
							const record = attendance.find(
								(record) => dayjs(record.date).format("YYYY-MM-DD") === formattedDate
							);
							return record && record.status === "Present" ? "present-date" : "";
						}}
					/>
					<ul className="list-disc pl-6">
						{attendance.map((record) => (
							<li key={record._id} className="p-2 border-b">
								{dayjs(record.date).format("MMMM D, YYYY h:mm A")} -{" "}
								<span className={record.status === "Present" ? "text-green-500" : "text-red-500"}>
									{record.status}
								</span>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default Attendance;
