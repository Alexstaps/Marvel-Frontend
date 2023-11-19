import { Link } from "react-router-dom";

const Header = () => {
	return (
		<>
			<header>
				<div className="container between">
					<Link to="/">
						<img
							src="https://lereacteur-marvel-api.netlify.app/static/media/logo.ad6c786b.svg"
							alt="logo marvel ecrit en rouge"
							className="logo-header"
						/>
					</Link>

					<div className="navigation-item">
						<Link to="/">
							<button className="header-button">Personnages</button>
						</Link>
						<Link to="/comics">
							<button className="header-button">Comics</button>
						</Link>
						<Link to="/favoris">
							<button className="header-button">Favoris</button>
						</Link>
					</div>
					<div>
						<button className="header-button login">Login</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
