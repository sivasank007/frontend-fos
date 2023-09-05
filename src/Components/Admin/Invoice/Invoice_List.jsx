import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Invoice_List() {
  const [invoiceData, setInvoiceData] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('https://backend-production-c84e.up.railway.app/getinvoicedetails')
    .then(res=>setInvoiceData(res.data))
    .catch(err=>console.log(err))
  },[])


  return (
    <div className='py-4 px-5'>
      <center className='mb-3'><h3>TOTAL INVOICES</h3></center>
      <table className='table'>
        <tr>
          <th>Invoice Number</th>
          <th>Order Number</th>
          <th>Customer Id</th>
          <th>Invoice Date</th>
          <th>TotalBill</th>
          <th>Action</th>
        </tr>
        {invoiceData.map((m)=>
          <tr>
            <td>{m.invoiceNumber}</td>
            <td>{m.orderNumber}</td>
            <td>1</td>
            <td>{m.invoiceDate}</td>
            <td>{m.totalBill}</td>
            <td><button onClick={()=>navigate(`/dashboard/invoicedetails/${m.invoiceNumber}`)} className='btn btn-primary'>View</button></td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Invoice_List