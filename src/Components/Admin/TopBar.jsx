import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope,faBell } from '@fortawesome/free-regular-svg-icons'
import profile from '../../assests/images/profile.png'
import axios from 'axios';
import Cookies from 'js-cookie';

function TopBar() {
    const [adminData, setAdminData] = useState({});
    const adminId = Cookies.get("adminid");
    useEffect(()=>{
        axios.get(`https://backend-production-c84e.up.railway.app/getdesiredadmin/${adminId}`)
        .then(res=>setAdminData(res.data))
    },[])

    console.log(adminData);
    console.log(adminId);
    return ( 
        <div style={{height:'5rem'}} className='ps-5 py-4 bg-white'>
            <div className="d-flex justify-content-between">
                <FontAwesomeIcon className='fs-3' icon={faBarsStaggered} />
                <div className='d-flex align-items-center'>
                    <input style={{height:'2.8rem' ,width:'20rem',borderRadius:'1rem',outline:'1px solid black'}} type="search" name="" id="" placeholder='search...'/>
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-4 ms-2' icon={faMagnifyingGlass} />
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-3 ms-5' icon={faEnvelope} />
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-3 ms-5'  icon={faBell} />
                    <h4 className='ms-4'>{adminData.adminName}</h4>
                    <img style={{width:'2.2rem',height:'2.6rem'}} className='ms-3 me-5'  src={profile}/>
                </div>
            </div>
        </div>
     );
}

export default TopBar;