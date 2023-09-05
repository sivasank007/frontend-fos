import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateMenuItems() {
    const {id} = useParams();
	const [Currency, setCurrency] = useState(1);
	const [menu, setMenu] = useState([]);
	const [menuitem, setMenuItem] = useState("");
	const [menuid, setMenuId] = useState(-1);
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [description, setDescription] = useState("");
    const [img,setImg] = useState("");
	const count = 1;

    const navigate = useNavigate();

	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(0);
	const [confirmationstatus, setconfirmationstatus] = useState(false);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenudata")
			.then((res) => setMenu(res.data))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get("https://backend-production-c84e.up.railway.app/getmenuitemsdesireddata/" +id)
            .then(res=>{
                const data = res.data;
                setMenuItem(data.menuitem);
                setMenuId(data.menuid);
                setPrice(data.price);
                setQuantity(data.quantity);
                setDescription(data.description);
                setImg(data.image); 
            })
			.catch((err) => console.log(err));
	}, []);

	const handleFile = (e) => {
		setFile(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

    

	function handleUpdate(e) {
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
			.put(`https://backend-production-c84e.up.railway.app/updateproduct/${id}`,formdata )
			.then((res) => {
				if (confirmationstatus === false) {
					setconfirmationstatus(true);
					setTimeout(() => {
						setconfirmationstatus(false);
					}, 2000);
				}
				
				navigate("/dashboard/viewmenuitems")
			})
			.catch((err) => console.log('-> from client'+err));
	}
    console.log(img);

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
					<b>UPDATE MENUITEMS FORM</b>
				</h5>
			</center>

			<form onSubmit={handleUpdate} style={{ height: "100%" }} className="row">
				<div className="col-6 px-4">
					<div action="">
						<div className="pro">
							<label htmlFor="">Menu Item Name</label>
							<input
                                value={menuitem}
								onChange={(e) => setMenuItem(e.target.value)}
								type="text"
								placeholder="Pizza"
								required
							/>
						</div>
						<div className="row">
							<div className="pro col-6">
								<label htmlFor="">Select Categories</label>
								<select onChange={(e)=>setMenuId(e.target.value)} name="" id="">
                                    <option style={{background:'#428FF5'}} value="">{menu.find((m)=>m.menuid==menuid)?.menuname}</option>
                                    {menu.map(m=>
                                        (m.menuid!=menuid)?<option value={m.menuid}>{m.menuname}</option>:''
                                    )}
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
                                value={quantity}
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
                                    value={price}
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
                            value={description}
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
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="col-5">
					<img
						className="food_1 py-3 px-3 ps-5"
						src={(preview==0)?('https://backend-production-c84e.up.railway.app/images/'+img):preview}
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
						<button onClick={()=>navigate('/dashboard/viewmenuitems')} className="btn btn-primary px-4 me-3" style={{height:'3rem'}}>
							BACK
						</button>
						<button
							type="submit"
							style={{ background: "orange", color: "white", height: "3rem" }}
							className="btn px-4"
						>
							UPDATE
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default UpdateMenuItems;
