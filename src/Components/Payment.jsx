import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import upiImg from "../assests/images/UPI.png";
import cardImg from "../assests/images/card.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRetweet,
	faHandHoldingDollar,
	faAnglesLeft
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import S_Payment from "./Client/StatusBar/S_Payment";

function Payment() {
	const [value, setValue] = useState(null);
	const [paymentMode, setPaymentMode] = useState("");
	const cid = Cookies.get("id");

	const location = useLocation();
	const addressID = location?.state?.addressID || null;

	const [cart, setCart] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/cartdata/"+cid)
			.then((res) => setCart(res.data))
			.catch((err) => console.log(err));
	}, []);

	const [address, setAddress] = useState({});

	useEffect(() => {
		axios
			.get(`https://backend-production-c84e.up.railway.app/getaddress/${addressID}`)
			.then((res) => setAddress(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handlepay = (e) => {
		e.preventDefault();
		if (cart.length > 0) {
			axios.post("https://backend-production-c84e.up.railway.app/orderdetails", {
				cart,
				paymentMode,
				cid,
				addressID
			});
			axios.post("https://backend-production-c84e.up.railway.app/handleResetCart/" + cid);
			Swal.fire({
				icon: "success",
				title: "🥳 ORDER PLACED 🥳",
				text: "Continue Shopping To Extra Discounts",
				footer: '<h5>Check order status in "My Orders" </h5>',
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
		navigate("/");
	};

	console.log("--> " + value);
	return (
		<div>
			<div className="d-flex justify-content-center mb-4"><S_Payment/></div>
			<div style={{ width: "33rem", marginLeft: "50px" }}>
			
				<label
					className="d-flex py-2 px-3"
					style={{ border: "1px solid rgb(213, 213, 213)" }}
				>
					
				<div>
					<div className="d-flex ">
						<div>
							<div className="d-flex">
								<b className="me-1">{address.customername},</b>
								<p className="me-1">{address.mail},</p>
								<p className="me-1">{address.phnum},</p>
							</div>
							<div className="d-flex">
								<p className="me-1">{address.city},</p>
								<p>{address.state}.</p>
								<div className="ms-3">
									<Link to={'/checkout'}>
										<FontAwesomeIcon
											className="me-4"
											style={{
												cursor: "pointer",
												color: "blue",
												fontSize: "1.6rem",
											}}
											icon={faRetweet}
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				</label>
				{/* <center className='mt-3'>
							<h3>Payment</h3>
							<h5>Choose payment method below</h5>
						</center> */}
				<div className="d-flex flex-column mt-4">
					<form onSubmit={handlepay} className="d-flex flex-column" action="">
						<label style={{ cursor: "pointer", marginBottom: "1.3rem" }}>
							<div className="d-flex align-items-center ">
								<input
									className=" me-4"
									onChange={(e) => setPaymentMode(e.target.value)}
									type="radio"
									value="upi"
									name="address"
									required
								/>
								<h6 style={{ fontSize: "1.15rem" }}>
									GPay, Phonepy and all UPI's{" "}
								</h6>
								<span className="ms-2">(All type of UPI available)</span>
							</div>
							<img
								style={{ width: "13rem", marginLeft: "2.5rem" }}
								src={upiImg}
								alt=""
							/>
						</label>
						<label style={{ cursor: "pointer", marginBottom: "1.3rem" }}>
							<div className="d-flex align-items-center">
								<input
									className=" me-4"
									type="radio"
									onChange={(e) => setPaymentMode(e.target.value)}
									value="card"
									name="address"
									required
								/>
								<h6 style={{ fontSize: "1.15rem" }}>
									Credit / Debit / ATM Card{" "}
								</h6>
								<span className="ms-2">(All type of card accepted)</span>
							</div>
							<img
								style={{ width: "13rem", marginLeft: "2.5rem" }}
								src={cardImg}
								alt=""
							/>
						</label>
						<label style={{ cursor: "pointer", marginBottom: "1.3rem" }}>
							<div className="d-flex align-items-center">
								<input
									className=" me-4"
									type="radio"
									onChange={(e) => setPaymentMode(e.target.value)}
									value="cod"
									name="address"
									required
								/>
								<h6 style={{ fontSize: "1.15rem" }}>Cash On Delivery</h6>
							</div>
							<p style={{ marginLeft: "2.5rem" }}>
								(use online payment to get extra rewards)
							</p>
						</label>
						<p className="d-flex justify-content-center">
							<p onClick={()=>{
								navigate('/checkout')
								}} >
								<h3 className="btn btn-primary me-2">
									<FontAwesomeIcon className="me-1" icon={faAnglesLeft} />
									Back
								</h3>
							</p>
							<button type="submit" className="px-3 btn btn-primary">
								Pay <FontAwesomeIcon icon={faHandHoldingDollar} />
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
