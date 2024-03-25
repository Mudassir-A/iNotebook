import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import axios from "axios";

const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "default" });
	const [image, setImage] = useState(null);

	const clickHandler = async () => {
		try {
			// Prepare form data to send image file
			const formData = new FormData();
			formData.append("image", image);

			// Upload image first
			const res = await axios.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const imagePath = res.data.filePath; // Assuming server sends back the file path
			// Add note with image path
			addNote({ ...note, imagePath: imagePath });
		} catch (error) {
			console.error("Error uploading image:", error);
			// Handle error: Show a notification to the user or retry the upload
		}
	};

	const changeHandler = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const imgHandler = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<>
			<div className="container">
				<h1 className="my-4">Add a Note</h1>
				<form className="my-4">
					<div className="mb-3">
						<label htmlFor="title" className="form-label">Title</label>
						<input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter the title..."
							onChange={changeHandler} />
					</div>
					<div className="mb-3">
						<input name="imagePath" type="file" className="form-control" placeholder="Upload an image" onChange={imgHandler} />
					</div>
					<div className="mb-3">
						<label htmlFor="description" className="form-label">Description</label>
						<textarea type="text" className="form-control" rows="20" placeholder="Enter the description..." id="description" onChange={changeHandler} name="description" />
					</div>
					<div className="mb-3">
						<label htmlFor="tag" className="form-label">Tag</label>
						<input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" placeholder="Enter the tag..."
							onChange={changeHandler} />
					</div>
					<button type="button" className="btn btn-primary" onClick={clickHandler}>Add Note</button>
				</form>
			</div>
		</>
	);
};

export default AddNote;
