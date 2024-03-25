import noteContext from "../context/notes/noteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";

const Notes = () => {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		getNotes();
	}, []);

	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

	const ref = useRef(null);
	const refClose = useRef(null);

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
	}

	const handleClick = () => {
		editNote(note.id, note.etitle, note.edescription, note.etag)
		refClose.current.click();
	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className="container">
				<button ref={ref} hidden type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Launch demo modal
				</button>

				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Edit Note
								</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<form>
									<div className="mb-3">
										<label htmlFor="title" className="form-label">Title</label>
										<input onChange={onChange} type="email" className="form-control" defaultValue={note.etitle} id="title" name="title" aria-describedby="emailHelp" />
									</div>
									<div className="mb-3">
										<label htmlFor="description" className="form-label">Description</label>
										<textarea onChange={onChange} className="form-control" id="description" rows="3" defaultValue={note.edescription} name="description"></textarea>
									</div>
									<div className="mb-3">
										<label htmlFor="tag" className="form-label">Tag</label>
										<input onChange={onChange} type="text" className="form-control" id="tag" defaultValue={note.etag} name="tag" />
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button ref={refClose} type="button" className="btn btn-secodary" data-bs-dismiss="modal">Close</button>
								<button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={() => { handleClick() }}>Save changes</button>
							</div>
						</div>
					</div>
				</div>

				<h1 className="my-4">Your Notes</h1>
				<div className="container mx-2">
					{notes.length === 0 && 'No notes to display'}
				</div>
				<div className="row">
					{notes.map((note) => {
						return (
							<div className="col-md-4" key={note._id}>
								<NoteItem updateNote={updateNote} note={note} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Notes;

// 