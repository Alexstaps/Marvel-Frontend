import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { baseUrl } from "../api";

const ComicsComicId = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const id = params.comicId;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${baseUrl}/comic/${id}`);
				console.log("data =>", response.data);

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
		<section className="display-film ">
			<div className="card-comicId">
				<div className="top-comicId">
					<img
						src={data.thumbnail.path + "." + data.thumbnail.extension}
						alt=""
						className="comicId-img"
					/>
				</div>
			</div>

			<div>
				<div className="comicId-title-container">
					<h2 className="comicId-title">{data.title}</h2>
				</div>
				<div className="comicId-description-container">
					{data.description ? (
						<h3 className="comicId-description">{data.description}</h3>
					) : (
						<h3>Description du film non disponible</h3>
					)}
				</div>
			</div>
		</section>
	);
};

export default ComicsComicId;
