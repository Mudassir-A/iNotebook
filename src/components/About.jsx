import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function About() {
	const a = useContext(noteContext);

	useEffect(() => {
		a.update();
	}, []);

	return (
		<div>
			<h1>This is About. {a.state.name} is a good boy</h1>
		</div>
	);
}
