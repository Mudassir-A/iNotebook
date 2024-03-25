import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:3000";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	// * Fetch notes start
	const getNotes = async () => {
		// API CALL
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NjgxNWZlMzE2ODc2NmUzNThjZWZlIn0sImlhdCI6MTY4NzU4NTExOX0.lntAOOH8NT1pNW2tEpF9xx7TA1swcB90QDjfelaH1Tw",
			},
		});
		
		// API CALL
		const json = await response.json();
		// console.log(json);
		setNotes(json);
	};
	// * Fetch notes end

	// * Add a note start
	const addNote = async (title, description, tag) => {
		// API CALL
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NjgxNWZlMzE2ODc2NmUzNThjZWZlIn0sImlhdCI6MTY4NzU4NTExOX0.lntAOOH8NT1pNW2tEpF9xx7TA1swcB90QDjfelaH1Tw",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		// API CALL
		const json = await response.json();

		setNotes(notes.concat(json));
	};
	// * Add a note end

	// * Edit a note start
	const editNote = async (id, title, description, tag) => {
		// API Call 
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NjgxNWZlMzE2ODc2NmUzNThjZWZlIn0sImlhdCI6MTY4NzU4NTExOX0.lntAOOH8NT1pNW2tEpF9xx7TA1swcB90QDjfelaH1Tw'
			},
			body: JSON.stringify({title, description, tag })
		});
		const json = await response.json();
		console.log(json);

		let newNotes = JSON.parse(JSON.stringify(notes))
		// Logic to edit in client
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	}
	// * Edit a note end

	// * Delete a note start
	const deleteNote = async (id) => {
		// API CALL
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NjgxNWZlMzE2ODc2NmUzNThjZWZlIn0sImlhdCI6MTY4NzU4NTExOX0.lntAOOH8NT1pNW2tEpF9xx7TA1swcB90QDjfelaH1Tw",
			},
		});
		// API CALL

		const json = await response.json();
		console.log(json);

		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};
	// * Delete a note end

	return (
		<NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
