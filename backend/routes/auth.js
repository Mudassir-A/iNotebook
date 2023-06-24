const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "MudassirAnsari12$3";

// Create a user using: POST "/api/auth/createUser". No login required
router.post(
	"/createUser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid Email").isEmail(),
		body("password", "Password must be of atleast 8 characters").isLength({
			min: 8,
		}),
	],
	async (req, res) => {
		// If there are errors, return Bad Request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			let user = await User.findOne({ email: req.body.email });
			// Check whether the user with this email already exists
			if (user) {
				return res
					.status(400)
					.json({ error: "Sorry, a user with this email already exist" });
			}

			// Encrypting the password
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			// Create a new user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});

			const data = {
				user: {
					id: user.id,
				},
			};

			const authtoken = jwt.sign(data, JWT_SECRET);

			// res.json(req.body);
			res.json({ authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);

// Authenticating a user using: POST "/api/auth/login". No login required
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("email", "Password cannot be left blank").exists(),
	],
	async (req, res) => {
		// If there are errors, return Bad Request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					errors: "Please try to login with correct credentials",
				});
			}

			const passwordCompare = await bcrypt.compare(password, user.password);

			if (!passwordCompare) {
				return res.status(400).json({
					errors: "Please try to login with correct credentials",
				});
			}

			const data = {
				user: {
					id: user.id,
				},
			};

			const authtoken = jwt.sign(data, JWT_SECRET);

			// res.json(req.body);
			res.json({ authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);

// ROUTE 3: Get logged in user details using: POST "api/auth/getuser". Login Required
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		userid = req.user.id;
		const user = await User.findById(userid).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Some error occured");
	}
});

module.exports = router;
