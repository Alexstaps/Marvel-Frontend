import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsCharacterId from "./pages/ComicsCharacterId";
import ComicsComicId from "./pages/ComicsComicId";

import Header from "./components/Header";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/comics" element={<Comics />} />
					<Route path="/comics/:characterId" element={<ComicsCharacterId />} />
					<Route path="/comic/:comicId" element={<ComicsComicId />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
