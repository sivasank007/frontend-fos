import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
function Invoice_Details() {
   const {id} = useParams();
   const [invoiceData,setInvoiceData] = useState({});
   const [addressData,setAddressData] = useState({});
   const [orderedList, setOrderedList] = useState([]);
 
   useEffect(()=>{
    axios.get('https://backend-production-c84e.up.railway.app/getinvoicedetails/'+id)
    .then(res=>setInvoiceData(res.data))
    .catch(err=>console.log(err))
   },[])

   useEffect(()=>{
    axios.get('https://backend-production-c84e.up.railway.app/getorderedlist/'+invoiceData.orderNumber)
    .then(res=>setOrderedList(res.data))
    .catch(err=>console.log(err))
   },[invoiceData.orderNumber])

   useEffect(()=>{
    axios.get('https://backend-production-c84e.up.railway.app/getaddress/'+invoiceData.addressId)
    .then(res=>setAddressData(res.data))
    .catch(err=>console.log(err))
   },[invoiceData.addressId])
   
   let totalBill = orderedList.reduce((total, { price, quantity }) => total + (price * quantity), 0) ;
	  totalBill = totalBill - (totalBill/10);

    return ( 
        <div className='pt-4'>
            <div className='px-4'>
                <center style={{color:'orange'}}><h4>INVOICE BILL</h4></center>
                <div className="d-flex justify-content-between">
                    <div>
                        <h2 className='py-2'>Receiver : </h2>
                        <div>
                            <h5 style={{fontWeight:'700'}}>{addressData.customername}</h5>
                            <h6>{addressData.mail}</h6>
                            <h6>{addressData.phnum}</h6>
                        </div>
                        <div className="address pt-2 pb-3">
                            <h6 >{addressData.address}</h6>
                            <h6>{addressData.pincode}, {addressData.city}, {addressData.state}</h6>
                        </div>
                    </div>
                    <div className='py-5 mt-2'>
                      <div className='pb-3'><b>Invoice Number : </b>{id}</div>
                      <div className='pb-3'><b>Order Number : </b>{invoiceData.orderNumber}</div>
                      <div>
                          <p> <b>Invoice Date : </b>{invoiceData.invoiceDate} </p>  
                      </div>
                    </div>
                </div>
                <div style={{
                      maxHeight: "30vh",
                      overflow: "hidden",
                      overflowY: "scroll",
                      background:'white'
                    }}>
                  <table  className="table">
                      <thead style={{background:'rgb(213, 213, 213)'}}>
                          <tr>
                              <th>MenuItem Id</th>
                              <th>MenuItem</th>
                              <th>Qty</th>
                              <th>Unit Cost</th>
                              <th>Discount</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody >
                          {orderedList.map(m=>
                            <tr>
                              <td>{m.menuitemid}</td>
                              <td>{m.menuitems}</td>
                              <td>{m.quantity}</td>
                              <td>{m.price}</td>
                              <td>10%</td>
                              <td>{(m.quantity*m.price)-(m.quantity*m.price)/10}</td>
                          </tr>
                          )}
                      </tbody>
                  </table>
                </div>
                <h5 style={{textAlign:'end'}} className='pt-3 pe-5'>Total Cost : <span><b>₹ {totalBill}</b></span></h5>
                <div style={{marginTop:'1.5rem'}} className="d-flex justify-content-end">
                    <button className="btn px-3 me-5" style={{background:'orange',height:'2.5rem',color:'white',cursor:'pointer'}}>Print Invoice</button> 
                </div>
            </div>
        </div>
     );
}

export default Invoice_Details;