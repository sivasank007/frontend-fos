import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Cart() {
	const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

	const [menu, setMenu] = useState([]);
	const [menuitem, setMenuItem] = useState([]);

	const [cart, setCart] = useState([]);
	const [localCart, setLocalCart] = useState([]);
	const cid = Cookies.get("id");
	const navigate = useNavigate();

	useEffect(() => {
		const LocalcartData = JSON.parse(localStorage.getItem("localCart"));
		if (cid > 0) {
			localStorage.removeItem("localCart");
		} else {
			if (LocalcartData) {
				setLocalCart(LocalcartData);
			}
		}
	}, [cid]);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenuitemsdata")
			.then((res) => setMenuItem(res.data))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/cartdata/" + cid)
			.then((res) => setCart(res.data))
			.catch((err) => console.log(err));
	}, [reducerValue]);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenudata")
			.then((res) => setMenu(res.data))
			.catch((err) => console.log(err));
	}, []);

	function handleDecrement(itemId) {
		const clone = [...cart];
		const itemIndex = clone.findIndex((item) => item.cartid === itemId);
		if (clone[itemIndex].count > 1) {
			axios
				.put("https://backend-production-c84e.up.railway.app/cartdecrement/" + itemId)
				.then((res) => res)
				.catch((err) => console.log(err));
			forceUpdate();
		}
	}

	function handleIncrement(itemId) {
		const clone = [...cart];
		const itemIndex = clone.findIndex((item) => item.cartid === itemId);

		axios
			.put("https://backend-production-c84e.up.railway.app/cartincrement/" + itemId)
			.then((res) => res)
			.catch((err) => console.log(err));
		forceUpdate();
	}
	const handleDelete = (id) => {
		if (cart.length > 1) {
			axios
				.delete(`https://backend-production-c84e.up.railway.app/deletecartitem/${id}`)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
				forceUpdate();
		} else {
			axios
				.delete(`https://backend-production-c84e.up.railway.app/deletecartitem/${id}`)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
				navigate("/")
		}
	};
	function handlePrice() {
		let amount = 0;
		if (cid > 0) {
			cart.map((m) => (amount += m.price * m.count));
		} else {
			localCart.map((m) => (amount += m.price * m.count));
		}
		return amount;
	}
	const handleLocalCartDecrement = (itemId) => {
		const clone = [...localCart];
		const itemIndex = clone.findIndex((item) => item.cartid === itemId);

		if (clone[itemIndex].count > 1) {
			clone[itemIndex].count--;
			setLocalCart(clone);
			localStorage.setItem("localCart", JSON.stringify(clone));
		}
	};

	const handleLocalCartIncrement = (itemId) => {
		const clone = [...localCart];
		const itemIndex = clone.findIndex((item) => item.cartid === itemId);

		clone[itemIndex].count++;
		setLocalCart(clone);
		localStorage.setItem("localCart", JSON.stringify(clone));
	};

	const handleLocalCartDelete = (itemId) => {
		const updatedLocalCart = localCart.filter((item) => item.cartid !== itemId);
		setLocalCart(updatedLocalCart);
		localStorage.setItem("localCart", JSON.stringify(updatedLocalCart));
	};
	return (
		<div className="border">
			<div className="head py-3 px-4">
				<h5>Your Order</h5>
				<h6 style={{ fontSize: "1.4rem" }}>
					<b>"{cid > 0 ? cart.length : localCart.length}"</b> items
				</h6>
			</div>

			{cid > 0 ? (
				cart.length >= 1 ? (
					<div>
						<div
							className="py-1"
							style={{
								maxHeight: "40vh",
								overflow: "hidden",
								overflowY: "scroll",
							}}
						>
							{cart.map((item) => (
								<div
									className="d-flex  justify-content-between border p-3"
									key={item.cartid}
								>
									<div
										style={{ width: "200x" }}
										className="d-flex w-75 align-items-center "
									>
										<div className="d-flex w-50">
											<img
												src={"https://backend-production-c84e.up.railway.app/images/" + item.image}
												style={{
													height: "2.5rem",
													borderRadius: "50%",
													width: "2.5rem",
												}}
												alt=""
											/>

											<p className="ms-3">{item.menuitem}</p>
										</div>
										<div className="d-flex w-50 ms-">
											<div className="ms-4">
												<p>
													Qty : <b>{item.count}</b>
												</p>
											</div>
											<div className="ms-2">
												<p>(₹ {item.price * item.count})</p>
											</div>
										</div>
									</div>
									<div className="d-flex align-items-center">
										<button
											onClick={() => handleDecrement(item.cartid)}
											className="py-1 px-2 mx-2"
										>
											-
										</button>
										<button className="btn btn-primary  mx-2">
											{item.count}
										</button>
										<button
											onClick={() => handleIncrement(item.cartid)}
											className="py-1 px-2 mx-2"
										>
											+
										</button>
										<FontAwesomeIcon
											className="mx-1"
											onClick={() => handleDelete(item.cartid)}
											icon={faTrash}
											style={{
												color: "#c20000",
												height: "1.4rem",
												cursor: "pointer",
											}}
										/>
									</div>
								</div>
							))}
						</div>
						<div className="amount pt-1 p-3">
							<div className="item pt-3 d-flex justify-content-between">
								<h6>Total </h6>
								<h6>₹ {handlePrice()} </h6>
							</div>
							<div className="item pt-3 d-flex justify-content-between">
								<h6>Discount</h6>
								<h6>₹ {handlePrice() / 10} </h6>
							</div>
							<small>
								<b>(10% discount applied)*</b>
							</small>
							<div className="item pt-3 d-flex justify-content-between">
								<h6>Delivery Charge</h6>
								<h6>₹ 0 </h6>
							</div>
							<div className="item pt-3 d-flex justify-content-between">
								<h4 style={{ fontWeight: "bolder" }}>
									<b>Order Total</b>
								</h4>
								<h4 style={{ fontWeight: "bolder" }}>
									<b> ₹ {handlePrice() - handlePrice() / 10} </b>
								</h4>
							</div>
						</div>
						<p style={{ textAlign: "center" }}>
							<div
								onClick={() => {
									Cookies.remove("addr");
									navigate("/");
								}}
								className="mb-3 me-3"
							>
								<button className="btn btn-primary">
									<FontAwesomeIcon className="me-1" icon={faAnglesLeft} />
									Order More
								</button>
							</div>
						</p>
					</div>
				) : (
					<div className="py-5 my-2" style={{ textAlign: "center" }}>
						<h2>
							<b>Ouch !!!</b>
						</h2>
						<h4>Your cart is Empty</h4>{" "}
						<h6 className="mt-4 text-primary">
							*** Choose your favorite food ***
						</h6>
					</div>
				)
			) : localCart.length >= 1 ? (
				<div>
					<div
						className="py-1"
						style={{
							maxHeight: "40vh",
							overflow: "hidden",
							overflowY: "scroll",
						}}
					>
						{localCart.map((item) => (
							<div
								className="d-flex  justify-content-between border p-3"
								key={item.cartid}
							>
								<div
									style={{ width: "200x" }}
									className="d-flex w-75 align-items-center "
								>
									<div className="d-flex w-50">
										<img
											src={"https://backend-production-c84e.up.railway.app/images/" + item.image}
											style={{
												height: "2.5rem",
												borderRadius: "50%",
												width: "2.5rem",
											}}
											alt=""
										/>

										<p className="ms-3">{item.menuname}</p>
									</div>
									<div className="d-flex w-50 ms-">
										<div className="ms-4">
											<p>
												Qty : <b>{item.count}</b>
											</p>
										</div>
										<div className="ms-2">
											<p>(₹ {item.price * item.count})</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center">
									<button
										onClick={() => handleLocalCartDecrement(item.cartid)}
										className="py-1 px-2 mx-2"
									>
										-
									</button>
									<button className="btn btn-primary  mx-2">
										{item.count}
									</button>
									<button
										onClick={() => handleLocalCartIncrement(item.cartid)}
										className="py-1 px-2 mx-2"
									>
										+
									</button>
									<FontAwesomeIcon
										className="mx-1"
										onClick={() => handleLocalCartDelete(item.cartid)}
										icon={faTrash}
										style={{
											color: "#c20000",
											height: "1.4rem",
											cursor: "pointer",
										}}
									/>
								</div>
							</div>
						))}
					</div>
					<div className="amount pt-1 p-3">
						<div className="item pt-3 d-flex justify-content-between">
							<h6>Total </h6>
							<h6>₹ {handlePrice()} </h6>
						</div>
						<div className="item pt-3 d-flex justify-content-between">
							<h6>Discount</h6>
							<h6>₹ {handlePrice() / 10} </h6>
						</div>
						<small>
							<b>(10% discount applied)*</b>
						</small>
						<div className="item pt-3 d-flex justify-content-between">
							<h6>Delivery Charge</h6>
							<h6>₹ 0 </h6>
						</div>
						<div className="item pt-3 d-flex justify-content-between">
							<h4 style={{ fontWeight: "bolder" }}>
								<b>Order Total</b>
							</h4>
							<h4 style={{ fontWeight: "bolder" }}>
								<b> ₹ {handlePrice() - handlePrice() / 10} </b>
							</h4>
						</div>
					</div>
					<p style={{ textAlign: "center" }}>
						<div
							onClick={() => {
								Cookies.remove("addr");
								navigate("/");
							}}
							className="mb-3 me-3"
						>
							<button className="btn btn-primary">
								<FontAwesomeIcon className="me-1" icon={faAnglesLeft} />
								Order More
							</button>
						</div>
					</p>
				</div>
			) : (
				<div className="py-5 my-2" style={{ textAlign: "center" }}>
					<h2>
						<b>Ouch !!!</b>
					</h2>
					<h4>Your cart is Empty</h4>{" "}
					<h6 className="mt-4 text-primary">
						*** Choose your favorite food ***
					</h6>
				</div>
			)}
		</div>
	);
}

export default Cart;
