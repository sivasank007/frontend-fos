import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import AddressUpdate from "./AddressUpdate";
import S_Address from "./Client/StatusBar/S_Address";

function Address() {
	const [id, setId] = useState(0);

	const cid = Cookies.get("id");
	const [selectedId, setSelectedId] = useState(0);
	const [address, setAddress] = useState([]);

	let addressCount = -5;

	const navigate = useNavigate();
	const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
	

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/customerexistingaddress/" + cid)
			.then((res) => setAddress(res.data))
			.catch((err) => console.log(err));
	}, [reducerValue,selectedId]);

	const handlenavigate = (e) => {
		e.preventDefault();
		navigate("/checkout/payment",{state:{addressID:id}});
	};

	const handleDelete = (id) => {
		setId(id);
		axios
			.delete(`https://backend-production-c84e.up.railway.app/deleteaddress/${id}`)
			.then((res) => {
				console.log(res.data);
				forceUpdate()
			})
			.catch((err) => console.log(err));
	};
	const handleSelectedId = (res) =>{
		setSelectedId(res)
	}
	return (
		<div className=" pb-4 d-flex align-items-center flex-column">
			<div className="d-flex justify-content-center mb-4"><S_Address/></div>
			{selectedId > 0 ? (
				<AddressUpdate 
					addId={selectedId}
					handleSelectedId = {handleSelectedId}
				/>
			) : address.length > 0 ? (
				<div>
					<h5 className="text-primary mb-4">Existing Address</h5>
					<form onSubmit={handlenavigate} action="">
						<div
							style={{
								maxHeight: "19rem",
								width: "33rem",
								overflow: "hidden",
								overflowY: "scroll",
							}}
						>
							{address.map((m) => (
								<label
									className="d-flex justify-content-between my-2"
									style={{ borderBottom: "1px solid rgb(213, 213, 213)" }}
								>
									<div className="d-flex" style={{ cursor: "pointer" }}>
										<input
											onChange={(e) => setId(e.target.value)}
											className=" me-3"
											type="radio"
											name="address"
											value={m.addressID}
											required
										/>
										<div className="d-flex flex-column">
											<b className="me-1">{m.customername},</b>
											<div className="d-flex">
												<p className="me-1">{m.mail},</p>
												<p className="me-1">{m.phnum},</p>
											</div>
											<p className="me-1">{m.address},</p>
											<div className="d-flex">
												<p className="me-1">{m.pincode},</p>
												<p className="me-1">{m.city},</p>
												<p>{m.state}.</p>
											</div>
										</div>
									</div>
									<div className="ms-5 ps-5">
										<FontAwesomeIcon
											className="me-4"
											onClick={() => setSelectedId(m.addressID)}
											style={{
												cursor: "pointer",
												color: "blue",
												fontSize: "1.3rem",
											}}
											icon={faPenToSquare}
										/>

										<FontAwesomeIcon
											className="me-4"
											onClick={() => handleDelete(m.addressID)}
											style={{
												cursor: "pointer",
												color: "red",
												fontSize: "1.3rem",
											}}
											icon={faTrashCan}
										/>
									</div>
								</label>
							))}
						</div>

						{address.length > 3 ? (
							<h6
								onClick={() =>
									alert(
										`already ${address.length} address available. Delete and use`,
									)
								}
								style={{ cursor: "pointer" }}
								className="text-primary"
							>
								+ Add New Address
							</h6>
						) : (
							<h6
								style={{ cursor: "pointer" }}
								onClick={() => navigate("/checkout/newAddress")}
								className="text-primary"
							>
								+ Add New Address
							</h6>
						)}
						<div className="d-flex mt-4 justify-content-center">
							<button type="submit" className="btn btn-primary ">
								PROCEED
							</button>
						</div>
					</form>
				</div>
			) : (
				navigate("/checkout/newAddress")
			)}
		</div>
	);
}

export default Address;
