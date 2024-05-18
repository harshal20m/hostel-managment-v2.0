const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

// @route POST /api/attendance
// @desc Mark attendance
// @access Private
router.post("/", auth, async (req, res) => {
	const { date, status } = req.body;
	try {
		const newAttendance = new Attendance({
			user: req.user.id,
			date,
			status,
		});
		const attendance = await newAttendance.save();
		res.json(attendance);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// @route GET /api/attendance
// @desc Get attendance records
// @access Private
router.get("/", auth, async (req, res) => {
	try {
		const attendance = await Attendance.find({ user: req.user.id });
		res.json(attendance);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
