import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function CustomerNavbar() {
	const id = Cookies.get("id");
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getuser/" + id)
			.then((res) => {
				if (res.data.length > 0) {
					setUserName(res.data[0].customername);
				}
			})
			.catch((err) => console.log(err));
	});
	return (
		<nav>
			<div style={{ background: "orange", padding: "18px 0" }}>
				<div className="d-flex justify-content-between align-items-center px-4">
					<div className="logo">
						<FontAwesomeIcon style={{ height: "30px" }} icon={faTruckFast} />{" "}
						<b style={{ fontSize: "2rem" }}>FOODIE</b>
					</div>
					<div className="d-flex align-items-center">
						{userName != "" ? (
							<div className="d-flex gap-4">
								<h4>{userName}</h4>
								<button
									onClick={() => {
										navigate('/myorders')
										window.location.reload();
									}}
									className="btn btn-primary"
								>
									My Orders
								</button>
								<button
									onClick={() => {
										Cookies.remove("id");
										navigate('/')
										window.location.reload();
									}}
									className="btn btn-dark"
								>
									Log out
								</button>
							</div>
						) : (
							<div>
								<Link to="/login">
									<button className="btn btn-primary me-3">LOGIN</button>
								</Link>
								<Link to="/signup">
									<button className="btn" style={{ background: "white" }}>
										SIGNUP
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default CustomerNavbar;
