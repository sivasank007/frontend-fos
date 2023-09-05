import React, { useEffect, useState, useRef } from "react";
import pre_preview from "../../../assests/images/previww.png";
import axios from "axios";

function AddMenuItems() {
	const [Currency, setCurrency] = useState(1);
	const [menu, setMenu] = useState([]);
	const [menuitem, setMenuItem] = useState("");
	const [menuid, setMenuId] = useState(-1);
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [description, setDescription] = useState("");
	const count = 1; 

	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(0);
	const [confirmationstatus, setconfirmationstatus] = useState(false);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenudata")
			.then((res) => setMenu(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleFile = (e) => {
		setFile(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

	function handlesumbit(e) {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append("image", file);
		formdata.append("menuitem", menuitem);
		formdata.append("menuid", menuid);
		formdata.append("price", price);
		formdata.append("quantity", quantity);
		formdata.append("description", description);
		formdata.append("count", count);

		axios
			.post("https://backend-production-c84e.up.railway.app/insertproduct", formdata)
			.then((res) => {
				console.log(res.data);
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 2000);
				}
				window.location.reload();
			})
			.catch((err) => console.log(err));
	}

	return (
		<div style={{ width: "100%" }}>
			{confirmationstatus === true ? (
				<p
					style={{ width: "13rem", position: "absolute", right: 5 }}
					className="successfullanimation"
				>
					Successfully added 🥳
				</p>
			) : (
				""
			)}
			<center>
				<h5 style={{ color: "orange" }} className="py-3 light-border">
					<b>ADD MENUITEMS FORM</b>
				</h5>
			</center>

			<form onSubmit={handlesumbit} style={{ height: "100%" }} className="row">
				<div className="col-6 px-4">
					<div action="">
						<div className="pro">
							<label htmlFor="">Menu Item Name</label>
							<input
								onChange={(e) => setMenuItem(e.target.value)}
								type="text"
								placeholder="Pizza"
								required
							/>
						</div>
						<div className="row">
							<div className="pro col-6">
								<label htmlFor="">Select Categories</label>
								<select onChange={(e) => setMenuId(e.target.value)} required>
									<option value="">select menu</option>
									{menu.map((m) => (
										<option value={m.menuid}>{m.menuname}</option>
									))}
								</select>
							</div>
							<div className="pro col-6">
								<label htmlFor="">Currency</label>
								<select
									onChange={(e) => setCurrency(e.target.value)}
									name=""
									id=""
									required
								>
									<option value={1}>INR</option>
									<option value={2}>USD</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="pro col-6">
								<label htmlFor="">Quantity</label>
								<input
									onChange={(e) => setQuantity(e.target.value)}
									type="text"
									placeholder="01"
									required
								/>
							</div>
							<div className="pro col-6">
								<label htmlFor="">Price</label>
								<div className="d-flex">
									{Currency == 1 ? (
										<span class="input-group-text">₹</span>
									) : (
										<span class="input-group-text">$</span>
									)}
									<input
										onChange={(e) => setPrice(e.target.value)}
										style={{ width: "100%" }}
										type="text"
										placeholder="100"
										required
									/>
								</div>
							</div>
						</div>
						<div className="pro">
							<label htmlFor="">Description</label>
							<textarea
								onChange={(e) => setDescription(e.target.value)}
								rows="5"
								placeholder="Message"
							></textarea>
						</div>
						<div className="pro">
							<label htmlFor="">Product Image</label>
							<div>
								<input
									onChange={handleFile}
									style={{ padding: "0.5rem 1rem", height: "3rem" }}
									type="file"
									required
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="col-5">
					<img
						className="food_1 py-3 px-3 ps-5"
						src={preview == 0 ? pre_preview : preview}
						alt=""
					/>
					<div className="d-flex justify-content-between py-4 light-border">
						<label htmlFor="">Status Available</label>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round"></span>
						</label>
					</div>
					<div className="d-flex justify-content-between py-4 light-border">
						<label htmlFor="">Discount Active</label>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider round"></span>
						</label>
					</div>
					<div className="d-flex justify-content-end py-4">
						<button
							type="submit"
							style={{ background: "orange", color: "white", height: "3rem" }}
							className="btn px-4"
						>
							Save and Add
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddMenuItems;
