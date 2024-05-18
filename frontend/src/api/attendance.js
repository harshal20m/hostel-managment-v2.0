// attendance.js

import express from "express";
import auth from "../middleware/auth.js"; // Assuming you have authentication middleware
import Attendance from "../models/Attendance.js"; // Assuming you have a Mongoose model for Attendance

const router = express.Router();

// @route   GET api/attendance
// @desc    Get all attendance records
// @access  Private (requires authentication)
router.get("/", auth, async (req, res) => {
	try {
		// Fetch attendance records from the database
		const attendanceRecords = await Attendance.find({ user: req.user.id }).sort({ date: -1 });

		// Send the attendance records as JSON response
		res.json(attendanceRecords);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   POST api/attendance
// @desc    Add new attendance record
// @access  Private (requires authentication)
router.post("/", auth, async (req, res) => {
	const { status } = req.body;

	try {
		// Create a new attendance record
		const newAttendance = new Attendance({
			user: req.user.id,
			status,
		});

		// Save the attendance record to the database
		const attendanceRecord = await newAttendance.save();

		// Send the newly created attendance record as JSON response
		res.json(attendanceRecord);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

export default router;
