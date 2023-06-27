import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home() {
	return (
		<>
			<AddNote />
			<Notes />
		</>
	);
}
