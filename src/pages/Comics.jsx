import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";

import Footer from "../components/Footer";

const addEllipsis = (text, maxLength) => {
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Comics = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [offsetComics, setOffsetComics] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}/comics?title=${search}&skip=${offsetComics}`
				);
				// console.log("data =>", response.data);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [search, offsetComics]);
	return isLoading ? (
		<p>Loading ...</p>
	) : (
		<main>
			<section className="hero">
				<img
					src="https://www.disneyphile.fr/wp-content/uploads/2019/12/saison-des-super-h%C3%A9ros-marvel-960x461.png"
					alt=""
					className="img-hero"
				/>
			</section>
			<div className="research">
				<input
					type="text"
					placeholder="Recherche de Comics"
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
					{data.results.map((comic) => {
						return (
							<>
								<Link
									to={`/comic/${comic._id}`}
									key={comic._id}
									className="cards-comic"
								>
									<div className="middle-card-comic">
										<img
											src={
												comic.thumbnail.path + "." + comic.thumbnail.extension
											}
											alt=""
											className="comic-img"
										/>
									</div>
									<div className="top-card-comic">
										<h2 className="character-name">
											{addEllipsis(comic.title, 20)}
										</h2>
									</div>
								</Link>
							</>
						);
					})}
				</div>

				<div className="pagination">
					{offsetComics > 0 ? (
						<button
							onClick={(event) => {
								event.preventDefault();

								let newOffset = offsetComics - 100;
								setOffsetComics(newOffset);
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

							let newOffset = offsetComics + 100;
							setOffsetComics(newOffset);
						}}
						className="pagination-button"
					>
						page suivante
					</button>
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default Comics;
