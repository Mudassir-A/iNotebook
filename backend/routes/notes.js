const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// Route 1: Get all the Notes using : GET "/api/notes/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	const notes = await Notes.find({ user: req.user.id });
	res.json(notes);
});

// Route 2: Get all the Notes using : POST "/api/notes/addnote" Login Required
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body(
			"description",
			"Description must be of atleast 8 characters"
		).isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;

			// If there are errors, return Bad Request and the errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const note = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});

			const savedNote = await note.save();

			res.json(savedNote);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);

// Route 3: Update an existing note using : PUT "/api/notes/updatenote" Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;

	try {
		// Create a newNote Object;
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Find the note to be update
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).res.send("Not Found");
		}

		if (note.user.toString() !== req.user.id) {
			return res.status(401).res.send("Not Allowed");
		}

		// Updating the note
		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json({ note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Some error occured");
	}
});

// Route 4: Delete an existing note using : DELETE "/api/notes/deletenote" Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;
	try {
		// Find the note to be update
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).res.send("Not Found");
		}

		if (note.user.toString() !== req.user.id) {
			return res.status(401).res.send("Not Allowed");
		}

		// Updating the note
		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({ Success: "Note deleted successfully", note: note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Some error occured");
	}
});

module.exports = router;
