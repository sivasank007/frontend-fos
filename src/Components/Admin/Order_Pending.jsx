import React,{useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'

const Order_Pending = () => {
    const [orderDetails, setOrderDetails] = useState([]);

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

    useEffect(() => {
    fetchOrderDetails();
    },[reducerValue]);

    const fetchOrderDetails = async () => {
    try {
        const response = await axios.get('https://backend-production-c84e.up.railway.app/fetchorderdetails');
        setOrderDetails(response.data);
    } catch (error) {
        console.error(error);
    }
    };
    
    const handleCooked = (id) => {
        axios.post(`https://backend-production-c84e.up.railway.app/changeMakingStatus/${id}`)
        .then(res=>res)
        .catch(err=>console.log(err))
        forceUpdate()
        
    }

    return (
    <div >
        <center className='my-4'><h2>ORDERS PENDING</h2></center>
        <div style={{overflow:'hidden',display:'flex'}}>
            <div className='d-flex justify-content-center' style={{width:'100%',maxHeight:'73vh'}}>
                <div style={{maxHeight:'95vh',width:'80%',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>
                    {(orderDetails.length>0)?<table>
                    <thead>
                        <th>CustomerID</th>
                        <th>Menu</th>
                        <th>Menuitem</th>
                        <th>Quantity</th>
                        <th>Ordered_datetime</th>
                        <th style={{textAlign:"center"}}>Status</th>
                    </thead>
                    <tbody>
                    {orderDetails.map((order) => (
                        (order.makingStatus=="pending")?<tr>
                        <td>
                            {order.customerID}
                        </td>
                        <td>
                            {order.menuname}
                        </td>
                        <td>
                            {order.menuitem}
                        </td>
                        <td>
                            {order.quantity}
                        </td>
                        <td>
                            {order.ordered_datetime}
                        </td>
                        <td style={{display:'flex',alignItems:'center'}}>
                            <button className='btn btn-warning'>pending</button>
                            <FontAwesomeIcon onClick={()=>handleCooked(order.customer_orderID)} className='ms-3 thumbshover' style={{fontSize:'1.8rem',cursor:'pointer'}} icon={faThumbsUp} />
                        </td>
                    </tr>:''
                    ))}
                    </tbody>
                    </table>:
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <h4 className='mt-5 pt-5'>Ouch! There is no current Order</h4>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default Order_Pending;