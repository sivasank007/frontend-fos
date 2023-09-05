import React, { useState } from "react";
import Cart from "./Cart";
import CustomerNavbar from "./CustomerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import AccLogin from "./AccLogin";
import AccSignup from "./AccSignup";

function Checkout() {
	const id = Cookies.get("id");
	const addr = Cookies.get("addr");
	const [login, setLogin] = useState(true);

	const signup = (page) => {
		setLogin(page);
	};

	return (
		<div>
			<CustomerNavbar />
			<div className="d-flex justify-content-center">
				<div style={{ width: "50%" }}>
					<Cart />
				</div>
				<div style={{ width: "50%", background: "white", height: "88vh" }}>
					<center
						className="pt-3 pb-2"
						style={{ borderBottom: "1px solid rgb(213, 213, 213)" }}
					>
						<h3>ORDER STATUS</h3>
					</center>
					
					<div className="mt-4">
						{id == null ? (
							login === true ? (
								<AccLogin change={signup} />
							) : (
								<AccSignup change={signup} />
							)
						) : (
							<Outlet />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
