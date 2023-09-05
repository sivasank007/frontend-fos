import React, { useEffect, useState, useReducer} from 'react'
import {Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function  ViewMenuItems () {
    const [menu,setMenu] = useState([]);
    const [menuItems,setMenuItems] = useState([]);
    const [id,setId] = useState(0);

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/getmenudata')
        .then(res=>setMenu(res.data))
        .catch(err=>console.log(err))
    },[reducerValue]);

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/getmenuitemsdata')
        .then(res=>setMenuItems(res.data))
        .catch(err=>console.log(err))
    },[reducerValue]);
 
    const handleDelete = (id)=>{
        setId(id);
        axios.delete(`https://backend-production-c84e.up.railway.app/deletemenuitems/${id}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        forceUpdate()
    }   
    
    console.log("cc"+menuItems);
    
    return ( 
        <div>
            {(menuItems.length>0)?
            <div>
                <center>
                    <h5 style={{color:'orange'}} className='py-3 light-border'><b>VIEW MENUITEM</b></h5>
                </center>
                <div className='mx-5 mt-3 p-4 bg-white ' style={{maxHeight:'38.2rem',overflow:'hidden',overflowY:'scroll'}}>
                    {menu.map(m=>
                        <Accordion className='py-2' >
                        <Accordion.Item>
                                <Accordion.Header className='py-1'><p className='mt-2' style={{fontSize:'1.3rem'}}>{m.menuname}</p></Accordion.Header>
                                {menuItems.map(n=>
                                    (m.menuid==n.menuid)?<Accordion.Body  style={{display:'flex',justifyContent:'space-between ',textAlign:'start',alignItems:'center',borderBottom:'1px solid rgb(213, 213, 213)'}} className='p-2 py-1' key={n.idmenudetails_ID}>
                                    <div style={{display:'flex',alignItems:'center',width:'400px',marginLeft:"1rem"}} >
                                        <img style={{height:'3.5rem',borderRadius:'50%',width:'3.5rem'}} src={'https://backend-production-c84e.up.railway.app/images/'+n.image} alt="" />
                                        <div style={{fontSize:'1rem', marginLeft:'1.5rem',display:'flex',justifyContent:'space-between',width:'20rem'}}>
                                            <b>{n.menuitem}</b>
                                            <b>₹ {n.price}</b>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={`../updatemenuitems/${n.menuitemsid}`}><FontAwesomeIcon className='me-4' style={{cursor:'pointer',color:'blue',fontSize:'1.4rem'}} icon={faPenToSquare} /></Link>
                                        <FontAwesomeIcon className='me-4' onClick={()=>handleDelete(n.menuitemsid)} style={{cursor:'pointer',color:'red',fontSize:'1.4rem'}} icon={faTrashCan} />
                                    </div>
                                </Accordion.Body>:''
                                )}
                            </Accordion.Item>
                        </Accordion>
                
                    )}  

                </div>
            </div>:
            <div className="d-flex mt-5 justify-content-center w-100">
                <center style={{ border: '.2px solid grey', height: '200px', width: '350px' ,background:'white'}} className='mt-5 pt-5'>
                <h5>NO MENU ITEMS DATA AVAILABLE</h5>
                <Link to={`/dashboard/addmenuitems`}><button className='btn btn-primary mt-4'>ADD MENU ITEMS</button></Link>
                </center>
            </div>
            }
        </div>
     );
}

export default  ViewMenuItems ;