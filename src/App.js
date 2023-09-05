import React from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Dashboard from "./Components/Admin/Dashboard";
import DashMain from "./Components/Admin/DashMain";

import Payment from "./Components/Payment";
import Address from "./Components/Address";
import CustomerView from "./Components/CustomerView";
import NewAddress from "./Components/NewAddress";
import Checkout from "./Components/Checkout";
import MyOrders from "./Components/MyOrders";
import Order_Pending from "./Components/Admin/Order_Pending";
import Order_Completed from "./Components/Admin/Orders/OrderCompleted";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forgettenpassword from "./Components/Forgettenpassword";
import AddMenuItems from "./Components/Admin/AddForm/AddMenuItems";
import ViewMenuItems from "./Components/Admin/ViewForm/ViewMenuItems";
import AddMenu from "./Components/Admin/AddForm/AddMenu";
import ViewMenu from "./Components/Admin/ViewForm/ViewMenu";
import UpdateMenuItems from "./Components/Admin/UpdateForm/UpdateMenuItems";
import Invoice_List from "./Components/Admin/Invoice/Invoice_List";
import Invoice_Details from "./Components/Admin/Invoice/Invoice_Details";
import Main from "./Components/Admin/Main";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<CustomerView />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route
					path="/forgettenpassword"
					element={<Forgettenpassword />}
				></Route> 
				<Route path="/checkout" element={<Checkout />}>
					<Route path="" element={<Address />}></Route>
					<Route path="newAddress" element={<NewAddress />}></Route>
					<Route path="payment" element={<Payment />}></Route>
				</Route>
				{/* <Route path="/checkout/summary" element={<Summary />}></Route> */}
				<Route path="/myorders" element={<MyOrders />}></Route>
				<Route path="/dashboard" element={<Main />}>
					<Route path="" element={<DashMain />}></Route>
					<Route path="addmenuitems" element={<AddMenuItems />}></Route>
					<Route path="addmenu" element={<AddMenu />}></Route>
					<Route path="viewmenu" element={<ViewMenu />}></Route>
					<Route path="viewmenuitems" element={<ViewMenuItems />}></Route>
					<Route
						path="updatemenuitems/:id"
						element={<UpdateMenuItems />}
					></Route>
					<Route path="orderpending" element={<Order_Pending />}></Route>
					<Route path="ordercompleted" element={<Order_Completed />}></Route>
					<Route path="invoicelist" element={<Invoice_List />}></Route>
					<Route path="invoicedetails/:id" element={<Invoice_Details />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
