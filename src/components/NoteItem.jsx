import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
	let { note, updateNote } = props;
	const context = useContext(noteContext);
	const { deleteNote } = context;

	return (
		<>
			<div className="row">
				<div
					className="card my-3 shadow rounded"
					style={{ width: "25rem" }}
				>
					<div className="card-body">
						<h5 className="card-title d-flex">
							<b className="me-auto">{note.title}</b>
							<FontAwesomeIcon
								className="mx-1"
								icon={faTrashAlt}
								onClick={() => {
									deleteNote(note._id);
								}}
							/>
							<FontAwesomeIcon
								className="mx-1"
								onClick={() => { updateNote(note) }}
								icon={faEdit}
							/>
						</h5>
						<p className="card-text">{note.description}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default NoteItem;

