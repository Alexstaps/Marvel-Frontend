import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Cookies from "js-cookie";

// pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsCharacterId from "./pages/ComicsCharacterId";
import ComicsComicId from "./pages/ComicsComicId";
import Favoris from "./pages/favoris";

//composant
import Header from "./components/Header";
// import Footer from "./components/Footer";

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
					<Route path="/favoris" element={<Favoris />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
