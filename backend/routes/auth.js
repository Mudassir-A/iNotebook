const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
					id: user.id
				}
			}

			const authtoken = jwt.sign(data, JWT_SECRET);

			// res.json(req.body);
			res.json({authtoken});


		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);

module.exports = router;
