import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
	let { title, description, id, note, updateNote } = props;
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
							<b className="me-auto">{title}</b>
							<FontAwesomeIcon
								className="mx-1"
								icon={faTrashAlt}
								onClick={() => {
									deleteNote(id);
								}}
							/>
							<FontAwesomeIcon
								className="mx-1"
								onClick={() => { updateNote(note) }}
								icon={faEdit}
							/>
						</h5>
						<p className="card-text">{description}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default NoteItem;

//
