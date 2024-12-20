import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand text-black text-decoration-none" to="/">Contacts</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav ms-auto">
						<div className="btn btn-success text-white">
							<Link to="/createContact" className="text-white text-decoration-none">
								<button className="border border-0 bg-transparent">
									Add new contact
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};