import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderCompleted = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const cid = Cookies.get("id");
    const [customerData, setCustomerData] = useState([]);
    const [orderr, setOrder] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;

    useEffect(() => {
        axios.get('https://backend-production-c84e.up.railway.app/getuser')
            .then(res => setCustomerData(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('https://backend-production-c84e.up.railway.app/getorderdetails')
            .then(res => setOrderDetails(res.data))
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        axios.get('https://backend-production-c84e.up.railway.app/getorder')
            .then(res => setOrder(res.data))
            .catch(err => console.log(err));
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderDetails.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <center className='my-4'><h3>TOTAL ORDERS</h3></center>
            <div style={{display: 'flex' }}>
                <div className='d-flex justify-content-center' style={{ width: '100%', maxHeight: '75vh' }}>
                    <div style={{width: '90%', background: 'white'}}>
                        {(currentOrders.length > 0) ? <table>
                            <thead>
                                <th>CustomerID</th>
                                <th>OrderNumber</th>
                                <th>Customer Name</th>
                                <th>Menuitem</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Ordered_datetime</th>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.orderID}>
                                        <td>
                                            {order.customerID}
                                        </td>
                                        <td>
                                            {order.orderNumber}
                                        </td>
                                        <td>
                                            {customerData.find((c) => c.customerID === order.customerID)?.customername}
                                        </td>
                                        <td>
                                            {order.menuitems}
                                        </td>
                                        <td>
                                            {order.quantity}
                                        </td>
                                        <td>
                                            {order.quantity * order.price}
                                        </td>
                                        <td>
                                            {order.orderdeddatetime}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <h4 className='mt-5 pt-5'>Ouch! There is no Order</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="pagination mt-4">
                {Array.from({ length: Math.ceil(orderDetails.length / ordersPerPage) }, (_, i) => (
                    <button 
                    key={i} 
                    onClick={() => paginate(i + 1)}
                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderCompleted;
