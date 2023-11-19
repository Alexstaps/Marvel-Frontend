import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
// import useLocalStorage from "use-local-storage";

import Footer from "../components/Footer";

const addEllipsis = (text, maxLength) => {
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Home = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [offsetCharacter, setOffsetCharacter] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}/?name=${search}&skip=${offsetCharacter}`
				);
				// console.log("data =>", response.data);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [search, offsetCharacter]);

	//FAVORIS

	return isLoading ? (
		<p>Loading ...</p>
	) : (
		<>
			<main>
				<section className="hero">
					<img
						src="https://www.disneyphile.fr/wp-content/uploads/2019/12/saison-des-super-h%C3%A9ros-marvel-960x461.png"
						alt=""
						className="img-hero"
					/>
				</section>
				<h2 className="citation container">
					"Les héros ne sont pas ceux qui ne tombent pas, mais ceux qui se
					relèvent après avoir chuté..."
				</h2>
				<div className="research">
					<input
						type="text"
						placeholder="Recherche des personnages"
						value={search}
						onChange={(event) => {
							// console.log("event=>", event);
							setSearch(event.target.value);
						}}
						className="research-character"
					/>
				</div>
				<section className="container">
					<div className="flex-parent">
						{data.results.map((character) => {
							// console.log("INFOS POUR LE PERSO ====>", character);
							return (
								<div key={character._id} className="complete-cards">
									<Link
										to={`/comics/${character._id}`}
										data={character}
										className="cards"
									>
										<div className="top-card">
											<h2 className="character-name">
												{addEllipsis(character.name, 20)}
											</h2>
										</div>
										<div className="middle-card">
											<img
												src={
													character.thumbnail.path +
													"." +
													character.thumbnail.extension
												}
												alt=""
												className="character-img"
											/>
										</div>
									</Link>
									<button
										onClick={() => {
											const characterFav = {
												nameChar: character.name,
												imgChar:
													character.thumbnail.path +
													"." +
													character.thumbnail.extension,
												id: character._id,
											};

											localStorage.setItem(
												"characterFav",
												JSON.stringify(characterFav)
											);
										}}
										className="addfav"
									>
										Ajouter en Favoris
									</button>
								</div>
							);
						})}
					</div>
					<div className="pagination">
						{offsetCharacter > 0 ? (
							<button
								onClick={(event) => {
									event.preventDefault();

									let newOffset = offsetCharacter - 100;
									setOffsetCharacter(newOffset);
								}}
								className="pagination-button"
							>
								page précédente
							</button>
						) : (
							<button className="pagination-button">page précédente</button>
						)}

						<button
							onClick={(event) => {
								event.preventDefault();

								let newOffset = offsetCharacter + 100;
								setOffsetCharacter(newOffset);
							}}
							className="pagination-button"
						>
							page suivante
						</button>
					</div>
				</section>
				<Footer />
			</main>
		</>
	);
};

export default Home;
