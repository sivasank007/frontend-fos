import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import S_Address from "./Client/StatusBar/S_Address";

function NewAddress() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [fullAddress, setFullAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const cid = Cookies.get("id");

	const [address, setAddress] = useState([]);
	const [cusDetails,setCusDetails] = useState({});

	const navigate = useNavigate();
	const [confirmationstatus, setconfirmationstatus] = useState(false);

	useEffect(()=>{
		axios
			.get("https://backend-production-c84e.up.railway.app/getuser/" + cid)
			.then((res) => {
				setCusDetails(res.data[0])
				setName(res.data[0].customername)
				setEmail(res.data[0].mail);
				setPhoneNumber(res.data[0].phnum);
			})
			.catch((err) => console.log(err));
	},[])

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/customerexistingaddress/" + cid)
			.then((res) => setAddress(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://backend-production-c84e.up.railway.app/customeraddress", {
				cid,
				name,
				email,
				phoneNumber,
				fullAddress,
				pincode,
				city,
				state,
			})
			.then((res) => {
				console.log(res)
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 500);
				}
			})
			.catch((err) => alert(err));
			navigate("/checkout");
	};

	const backToAddress = () => {
		navigate("/checkout");
	};
	return (
		<div>
			<div className="d-flex justify-content-center mb-4"><S_Address/></div>
			{confirmationstatus === true ? (
				<p style={{position:'absolute',right:'2%'}} className="successfullanimation">
					Successfully Added
				</p>
			) : ""}
			<form
				onSubmit={handleSubmit}
				style={{ width: "33rem", marginLeft: "60px" }}
			>
				<h5 className="text-primary mb-3">Add new Address :</h5>
				{
					(address.length > 0)?
					<div>
						<div className="d-flex flex-column mt-2">
						<label className="label">Name</label>
							<input
								name="name"
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
									name="phoneNumber"
									onChange={(e) => setPhoneNumber(e.target.value)}
									type="tel"
									placeholder="enter your phonenumber"
									required
								/>
							</div>
						</div>
					</div>:
					<div className="d-flex flex-column gap-2 my-1">
						<h6>{cusDetails.customername},</h6>
						<h6>{cusDetails.mail},</h6>
						<h6>{cusDetails.phnum},</h6>
					</div>
				}
				<div className="d-flex flex-column">
					<label className="label">Address</label>
					<textarea rows="2"
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
							style={{ width: "100%" }}
							onChange={(e) => setState(e.target.value)}
							type="text"
							name="State"
							placeholder="enter your state"
							required
						/>
					</div>
				</div>

				{address.length > 0 ? (
					<h6
						onClick={() => backToAddress()}
						style={{ cursor: "pointer" }}
						className="text-primary my-4"
					>
						<u>Use Existing Address</u>
					</h6>
				) : (
					""
				)}
				<div className="d-flex mt-4 justify-content-center">
					{(address.length>0)?<Link to={"/checkout"}>
						<h3 className="btn btn-primary me-2">
							<FontAwesomeIcon className="me-1" icon={faAnglesLeft} />
							Back
						</h3>
					</Link>:''}
					<button type="submit" className="btn btn-primary ">
						CONFIRM ADDRESS
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewAddress;
