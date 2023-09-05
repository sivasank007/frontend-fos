import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import Cookies from 'js-cookie';

const MyOrders = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const cid = Cookies.get("id");

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/getorderdetails/'+cid)
        .then(res=>setOrderDetails(res.data))
        .catch(err=>console.log(err))
    },[])

    console.log();
 
    return (
    <div >
        <CustomerNavbar/>
        <Link style={{position:'absolute',left:'10%',top:'19%'}} to={'/'}>BACK TO HOME</Link>
        <center className='my-5'><h2>MY ORDERS</h2></center>
        <div style={{overflow:'hidden',display:'flex'}}>
            <div className='d-flex justify-content-center' style={{width:'100%',maxHeight:'75vh'}}>
                <div style={{maxHeight:'95vh',width:'80%',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>
                    {(orderDetails.length>0)?<table>
                    <thead>
                        <th>Menuitem</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Ordered_datetime</th>
                    </thead>
                    <tbody>
                    {orderDetails.map((order) => (
                        <tr>
                            <td>
                                {order.menuitems}
                            </td>
                            <td>
                                {order.quantity}
                            </td>
                            <td>
                                {order.quantity*order.price}
                            </td>
                            <td>
                                {order.orderdeddatetime}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    
                    </table>:
                    <div className='d-flex mb-4 justify-content-center align-items-center flex-column'>
                        <h4 className='mt-5 pt-5'>Ouch! There is no previous Order</h4>
                        <Link to="/"><button className='btn btn-primary my-4'>Order Now</button></Link>
                        <p className='mb-4'>Big sale is ON! Keep Order</p>
                        <Link to={'/'}>BACK TO HOME</Link>
                    </div>
                    
                    }
                </div>
                
            </div>
        </div>
    </div>
    );
};

export default MyOrders;