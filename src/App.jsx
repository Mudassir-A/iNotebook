import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<div>
				<NoteState>
					<Router>
						<Navbar />
						<Alert />
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/about" element={<About />}></Route>
							<Route path="/contact" element={<Contact />}></Route>
						</Routes>
					</Router>
				</NoteState>
			</div>
		</>
	);
}

export default App;
