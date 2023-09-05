import React, { useEffect, useReducer, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// sweetalert
import Swal from "sweetalert2";
import CustomerNavbar from "./CustomerNavbar";
import Cookies from "js-cookie";

function CustomerView() {
	//------------ menucard

	const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

	const [menu, setMenu] = useState([]);
	const [menuitem, setMenuItem] = useState([]);

	const [cart, setCart] = useState([]);
	const [localCart, setLocalCart] = useState([]);

	const [confirmationstatus, setconfirmationstatus] = useState(false);

	const cid = Cookies.get("id");

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate an API call or data loading process
		setTimeout(() => {
			setLoading(false);
		}, 2000); // Simulating a 2-second loading time
	}, []);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenuitemsdata")
			.then((res) => setMenuItem(res.data))
			.catch((err) => console.log(err));
	}, [reducerValue]);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/cartdata/" + cid)
			.then((res) => {
				if (cid > 0) {
					setCart(res.data);
				} else {
					setCart([]);
				}
			})
			.catch((err) => console.log(err));
	}, [reducerValue, cid]);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenudata")
			.then((res) => setMenu(res.data))
			.catch((err) => console.log(err));
	}, []);

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

	function handleAdd(item) {
		if (
			cart.find((k) => k.menuitemid === item.menuitemsid) ||
			localCart.find((k) => k.menuitemid === item.menuitemsid)
		) {
			let timerInterval;
			Swal.fire({
				title: "Please Check cart",
				text: `"${item.menuitem}" is already in cart`,
				timer: 4000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
					const b = Swal.getHtmlContainer()?.querySelector("b"); // Use optional chaining
					if (b) {
						timerInterval = setInterval(() => {
							b.textContent = Swal.getTimerLeft();
						}, 100);
					}
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			}).then((result) => {
				if (result.dismiss === Swal.DismissReason.timer) {
					console.log("I was closed by the timer");
				}
			});
			return;
		} else {
			if (cid > 0) {
				axios
					.post("https://backend-production-c84e.up.railway.app/cart", {
						menuid: item.menuid,
						menuitemid: item.menuitemsid,
						menuname: item.menuitem,
						price: item.price,
						quantity: item.quantity,
						count: 1,
						image: item.image,
						cid: cid,
					})
					.then((res) => res)
					.catch((err) => console.log(err));
				forceUpdate();
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 2000);
				}
			} else {
				const updatedLocalCart = [
					...localCart,
					{
						cartid: localCart.length + 1,
						menuid: item.menuid,
						menuitemid: item.menuitemsid,
						menuname: item.menuitem,
						price: item.price,
						quantity: item.quantity,
						count: 1,
						image: item.image,
						cid: cid,
					},
				];
				setLocalCart(updatedLocalCart);
				localStorage.setItem("localCart", JSON.stringify(updatedLocalCart));
			}
		}
	}

	//-----------cart items

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
		axios
			.put("https://backend-production-c84e.up.railway.app/cartincrement/" + itemId)
			.then((res) => res)
			.catch((err) => console.log(err));
		forceUpdate();
	}
	const handleDelete = (id) => {
		axios
			.delete(`https://backend-production-c84e.up.railway.app/deletecartitem/${id}`)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		forceUpdate();
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

	function clearAllCartValue() {
		axios
			.post("https://backend-production-c84e.up.railway.app/handleResetCart/" + cid)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		forceUpdate();
	}

	//~LOCAL CART

	const clearAllLocalCartValue = () => {
		localStorage.removeItem("localCart");
		setLocalCart([]);
	};

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
		<div>
			{loading == false ? (
				<div className="mainclass">
					<CustomerNavbar />

					<main style={{ overflow: "hidden", display: "flex" }}>
						{/*------Menu List -------*/}
						<div style={{ width: "60%", maxHeight: "88.5vh" }} className="">
							<div>
								<div
									style={{
										maxHeight: "90vh",
										background: "white",
										overflowY: "scroll",
										scrollBehavior: "smooth",
									}}
								>
									<div
										style={{
											borderBottom: "1px solid rgb(213, 213, 213)",
											position: "sticky",
											top: "0%",
											zIndex: "33",
											paddingLeft: "1rem",
										}}
										className="d-flex justify-content-between align-items-center bg-white"
									>
										<h3 className=" py-3" style={{ color: "orangered" }}>
											MENU LIST
										</h3>
										{confirmationstatus === true ? (
											<p className="successfullanimation">
												Successfully added 🥳
											</p>
										) : ""}
									</div>

									{menu.map((m) => (
										<Accordion className="py-2 px-2" key={m.menuid}>
											<Accordion.Item>
												<Accordion.Header>{m.menuname}</Accordion.Header>
												{menuitem.map((n) =>
													m.menuid == n.menuid ? (
														<Accordion.Body
															style={{
																display: "flex",
																justifyContent: "space-between ",
																textAlign: "start",
																alignItems: "center",
																borderBottom: "1px solid rgb(213, 213, 213)",
															}}
															className="p-2"
															key={n.id}
														>
															<div
																style={{
																	display: "flex",
																	alignItems: "center",
																	width: "400px",
																	marginLeft: "1rem",
																}}
															>
																<img
																	style={{
																		height: "3.5rem",
																		borderRadius: "50%",
																		width: "3.5rem",
																	}}
																	src={
																		"https://backend-production-c84e.up.railway.app/images/" + n.image
																	}
																	alt=""
																/>
																<div
																	style={{
																		fontSize: "1.1rem",
																		marginLeft: "1.5rem",
																		display: "flex",
																		justifyContent: "space-between",
																		width: "20rem",
																	}}
																>
																	<b>{n.menuitem}</b>
																	<b>{n.price}</b>
																</div>
															</div>
															<button
																style={{ background: "#609dfe" }}
																onClick={() => handleAdd(n)}
																className="btn"
															>
																ADD
															</button>
														</Accordion.Body>
													) : (
														""
													),
												)}
											</Accordion.Item>
										</Accordion>
									))}
								</div>
							</div>
						</div>

						{/*------Cart Items -------*/}

						<div style={{ width: "40%", maxHeight: "88.5vh" }} className="">
							<div className="border">
								<div className="head py-2 px-4">
									<div>
										<h5>Your Order</h5>
										<h6 style={{ fontSize: "1.4rem" }}>
											<b>"{cid > 0 ? cart.length : localCart.length}"</b> items
										</h6>
									</div>
									<u
										onClick={
											cid > 0
												? () => clearAllCartValue()
												: () => clearAllLocalCartValue()
										}
										style={{
											cursor: "pointer",
											marginTop: "2rem",
											fontWeight: "bolder",
										}}
									>
										Clear all
									</u>
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
																	src={
																		"https://backend-production-c84e.up.railway.app/images/" + item.image
																	}
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
											<p style={{ textAlign: "end" }}>
												<Link to="/checkout" className="mb-3 me-3">
													<button className="btn btn-primary">
														Checkout Order
													</button>
												</Link>
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
																src={
																	"https://backend-production-c84e.up.railway.app/images/" + item.image
																}
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
															onClick={() =>
																handleLocalCartDecrement(item.cartid)
															}
															className="py-1 px-2 mx-2"
														>
															-
														</button>
														<button className="btn btn-primary  mx-2">
															{item.count}
														</button>
														<button
															onClick={() =>
																handleLocalCartIncrement(item.cartid)
															}
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
										<p style={{ textAlign: "end" }}>
											<Link to="/checkout" className="mb-3 me-3">
												<button className="btn btn-primary">
													Checkout Order
												</button>
											</Link>
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
						</div>
					</main>
				</div>
			) : (
				<div style={{ background: "#ffa500", height: "100vh" }}>
					<h1>Cooking in progress..</h1>
					<div id="cooking">
						<div class="bubble"></div>
						<div class="bubble"></div>
						<div class="bubble"></div>
						<div class="bubble"></div>
						<div class="bubble"></div>
						<div id="area">
							<div id="sides">
								<div id="pan"></div>
								<div id="handle"></div>
							</div>
							<div id="pancake">
								<div id="pastry"></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CustomerView;
