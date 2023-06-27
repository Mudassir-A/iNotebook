import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "default" });

	const clickHandler = () => {
		addNote(note.title, note.description, note.tag);
	};

	const changeHandler = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
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
						<label htmlFor="description" className="form-label">Description</label>
						<textarea type="text" className="form-control" rows="3" placeholder="Enter the description..." id="description" onChange={changeHandler} name="description" />
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
