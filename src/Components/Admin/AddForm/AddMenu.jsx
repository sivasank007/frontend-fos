import axios from "axios";
import React, { useState } from "react";

function AddMenu() {
	const [menuname, setMenuName] = useState("");
	const [menudescription, setMenuDescription] = useState("");
	const [confirmationstatus, setconfirmationstatus] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			menuname: menuname,
			menudescription: menudescription,
		};

		axios
			.post("https://backend-production-c84e.up.railway.app/addmenu", data)
			.then((res) => {
				console.log(res.data);
				//window.location.reload();
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 2000);
				}
				setMenuDescription("");
				setMenuName("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<center>
				<h5 style={{ color: "orange" }} className="py-4 light-border">
					<b>ADD MENU FORM</b>
				</h5>
			</center>
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
			<form
				onSubmit={handleSubmit}
				className="mt-4 d-flex justify-content-center"
			>
				<div>
					<div className="pro mb-2" style={{ width: "500px" }}>
						<label htmlFor="">Menu Name</label>
						<input
							onChange={(e) => setMenuName(e.target.value)}
							value={menuname}
							type="text"
							placeholder="Pizza"
							required
						/>
					</div>
					<div className="pro mt-3" style={{ width: "500px" }}>
						<label htmlFor="">Menu Description</label>
						<input
							onChange={(e) => setMenuDescription(e.target.value)}
							value={menudescription}
							type="text"
							placeholder="Description"
						/>
					</div>
					<center>
						<button className="btn btn-primary mt-4">ADD NOW</button>
					</center>
				</div>
			</form>
		</div>
	);
}

export default AddMenu;
