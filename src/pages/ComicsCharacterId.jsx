import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../api";
import Footer from "../components/Footer";

const addEllipsis = (text, maxLength) => {
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ComicsCharacterId = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const id = params.characterId;
	// console.log("lES PARAMS =>", params);

	useEffect(() => {
		// console.log("JE SUIS UNE NOUVELLE REPONSE");
		const fetchData = async () => {
			try {
				const response = await axios.get(`${baseUrl}/comics/${id}`);
				// console.log("data =>", response.data);
				// console.log(response.data.offers.owner.account.avatar.secure_url);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);
	return isLoading ? (
		<p>Loading ...</p>
	) : (
		<main>
			{console.log(data)}
			<section className="container neon-rouge">
				<h2 className="intro-comics">Liste des films du héros</h2>
				<div className="flex-parent">
					{data.comics.map((elem) => {
						console.log("data à récuperer pour l'affichage ===>", elem);
						return (
							<Link
								to={`/comic/${elem._id}`}
								key={elem._id}
								className="cards-comic"
							>
								<div className="middle-card-comic">
									<img
										src={elem.thumbnail.path + "." + elem.thumbnail.extension}
										alt=""
										className="comic-img"
									/>
								</div>
								<div className="top-card">
									<h2 className="character-name">
										{addEllipsis(elem.title, 20)}
									</h2>
								</div>
								<div className="bottom-card">
									{elem.description ? (
										<h3 className="character-description">
											{addEllipsis(elem.description, 20)}
										</h3>
									) : (
										<h3>Description non disponible</h3>
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default ComicsCharacterId;
