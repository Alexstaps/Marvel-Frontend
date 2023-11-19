import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";

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
	}, [search, offsetCharacter]); //offset ]);
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
						{data.results.map((elem) => {
							// console.log("MA REPONSE EST ICI", elem);
							return (
								<Link
									to={`/comics/${elem._id}`}
									key={elem._id}
									className="cards"
								>
									<div className="top-card">
										<h2 className="character-name">
											{addEllipsis(elem.name, 20)}
										</h2>
									</div>
									<div className="middle-card">
										<img
											src={elem.thumbnail.path + "." + elem.thumbnail.extension}
											alt=""
											className="character-img"
										/>
									</div>
									<div className="bottom-card">
										{elem.description ? (
											<h3 className="character-description">
												{addEllipsis(elem.description, 10)}
											</h3>
										) : (
											<h3>Description non disponible</h3>
										)}
									</div>
								</Link>
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
							>
								page précédente
							</button>
						) : (
							<button className="display-none">page précédente</button>
						)}

						<button
							onClick={(event) => {
								event.preventDefault();

								let newOffset = offsetCharacter + 100;
								setOffsetCharacter(newOffset);
							}}
						>
							page suivante
						</button>
					</div>
				</section>
				<footer className="container">Je suis le footer</footer>
			</main>
		</>
	);
};

export default Home;
