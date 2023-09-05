import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

function AddressUpdate({addId,handleSelectedId}) {
	

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [fullAddress, setFullAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [confirmationstatus, setconfirmationstatus] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getaddress/" + addId)
			.then((res) => {
				setName(res.data[0].customername);
				setEmail(res.data[0].mail);
				setPhoneNumber(res.data[0].phnum);
				setFullAddress(res.data[0].address);
				setPincode(res.data[0].pincode);
				setCity(res.data[0].city);
				setState(res.data[0].state);
			})
			.catch((err) => console.log(err));
	}, [addId]);

	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put("https://backend-production-c84e.up.railway.app/editaddress/" + addId, {
				name,
				email,
				phoneNumber,
				fullAddress,
				pincode,
				city,
				state,
			})
			.then((res) => {
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 500);
				}
				setTimeout(()=>{handleSelectedId(0)},700)
			})
			.catch(err=>alert(err))
			
		
	};

	return (
		<div className="d-flex align-items-center flex-column">
			
			{confirmationstatus === true ? (
				<p style={{position:'absolute',right:'2%'}} className="successfullanimation">
					Successfully Updated
				</p>
			) : ""}
			<form onSubmit={handleUpdate} style={{ width: "33rem" }}>
				<h5 className="text-primary mb-4">
					UPDATE ADDRESS{" "}
					<FontAwesomeIcon
						className="ms-2 "
						style={{ cursor: "pointer", color: "blue", fontSize: "1.4rem" }}
						icon={faPenToSquare}
					/>
				</h5>
				<div className="d-flex flex-column mt-2">
					<label>Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="enter your name"
						required
					/>
				</div>
				<div className="d-flex gap-2">
					<div className="d-flex w-100 flex-column my-3">
						<label className="label">Email</label>
						<input
							value={email}
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="enter your email"
							required
						/>
					</div>
					<div className="d-flex w-85 flex-column my-3">
						<label className="label">PhoneNumber</label>
						<input
							value={phoneNumber}
							name="phoneNumber"
							onChange={(e) => setPhoneNumber(e.target.value)}
							type="tel"
							placeholder="enter your phonenumber"
							required
						/>
					</div>
				</div>
				<div className="d-flex flex-column">
					<label className="label">Address</label>
					<textarea rows="2"
						value={fullAddress}
						onChange={(e) => setFullAddress(e.target.value)}
						type="fullAddress"
						placeholder="eg 115/A, 2nd abc streat, landmark .."
						required
					/>
				</div>
				<div className="d-flex justify-content-between my-3 gap-2">
					<div className="d-flex flex-column">
						<label className="label">Pincode</label>
						<input
							value={pincode}
							style={{ width: "100%" }}
							onChange={(e) => setPincode(e.target.value)}
							type="text"
							name="pincode"
							placeholder="123 456"
							required
						/>
					</div>
					<div className="d-flex flex-column">
						<label className="label">City</label>
						<input
							value={city}
							style={{ width: "100%" }}
							onChange={(e) => setCity(e.target.value)}
							type="text"
							name="City"
							placeholder="enter your city"
							required
						/>
					</div>
					<div className="d-flex flex-column">
						<label className="label">State</label>
						<input
							value={state}
							style={{ width: "100%" }}
							onChange={(e) => setState(e.target.value)}
							type="text"
							name="State"
							placeholder="enter your state"
							required
						/>
					</div>
				</div>

				<div
					style={{ marginTop: "2.6rem" }}
					className="d-flex justify-content-center"
				>
					<div onClick={() => handleSelectedId(0)}>
						<h3 className="btn btn-primary me-2">
							<FontAwesomeIcon className="me-1" icon={faAnglesLeft} />
							Back
						</h3>
					</div>
					<button type="submit" className="btn btn-primary ">
						UPDATE ADDRESS
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddressUpdate;
