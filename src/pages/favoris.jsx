import Footer from "../components/Footer";

const Favoris = () => {
	const charFav = JSON.parse(localStorage.getItem("characterFav"));
	console.log(charFav);
	return (
		<>
			<section className="section-favoris">
				<h2 className="title-fav">Bienvenue sur vos favoris</h2>
				{charFav ? (
					<div className="complete-cards ">
						<div className="top-card">
							<h2 className="favName">{charFav.nameChar}</h2>
						</div>
						<div className="middle-card">
							<img src={charFav.imgChar} alt="" className="character-img" />
						</div>
						<button
							onClick={() => {
								localStorage.clear();
							}}
							className="addfav"
						>
							Retirer des Favoris
						</button>
					</div>
				) : (
					<h2 className="noFavoris">Vous n'avez pas encore de favoris</h2>
				)}
			</section>
			<Footer />
		</>
	);
};

export default Favoris;
