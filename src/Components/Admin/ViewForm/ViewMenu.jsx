import React, { useEffect, useState, useReducer} from 'react'
import {Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import UpdateMenu from '../UpdateForm/UpdateMenu';

function  ViewMenu () {
    const [menu,setMenu] = useState([]);
    const [id,setId] = useState(0);
    let count = 1;

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/getmenudata')
        .then(res=>setMenu(res.data))
        .catch(err=>console.log(err))
    },[reducerValue]);

    const handleDelete = (id)=>{
        axios.delete(`https://backend-production-c84e.up.railway.app/deletemenu/${id}`)
        axios.delete(`https://backend-production-c84e.up.railway.app/deletemenuitemsmenu/${id}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        forceUpdate()
    }  
    return ( 
        <div>
          {(menu.length>0)?
            <div> 
              {(id > 0) ?
              <div  style={{ padding:'5rem',position: 'absolute',top:'20.7%',right:"18%", background: 'white', border: '.1px solid gray', zIndex: '999'}}>
                <div onClick={() => setId(-1)} style={{ fontSize: '2rem', position: 'absolute', top: '3%', left: '91%', cursor: 'pointer' }}><FontAwesomeIcon icon={faXmark} /></div>
                <UpdateMenu menuID={id} />
              </div>
              : ''}
              <center>
                  <h5 style={{color:'orange'}} className='py-3 light-border'><b>VIEW MENU</b></h5>
              </center>
              <div className='mx-5 mt-3 p-4 bg-white ' style={{maxHeight:'38.2rem',overflow:'hidden',overflowY:'scroll'}}>
                <table>
                  <tr>
                    <th>S.no</th>
                    <th>Menu Name</th>
                    <th>Menu created date</th>
                    <th>Actions</th>
                  </tr>
                  {menu.map(m=>
                      <tr>
                          <td>{count++}</td>
                          <td><b>{m.menuname}</b></td>
                          <td>{m.menu_addeddate}</td>
                          <td><Link onClick={()=>setId(m.menuid)}><FontAwesomeIcon className='me-4' style={{cursor:'pointer',color:'blue',fontSize:'1.4rem'}} icon={faPenToSquare} /></Link>
                          <FontAwesomeIcon className='me-4' onClick={()=>handleDelete(m.menuid)} style={{cursor:'pointer',color:'red',fontSize:'1.4rem'}} icon={faTrashCan} /></td>
                      </tr>
                  )}
                </table>
              </div>
          </div>
          :
          <div className="d-flex mt-5 justify-content-center w-100">
            <center style={{ border: '.2px solid grey', height: '200px', width: '350px' ,background:'white'}} className='mt-5 pt-5'>
              <h5>NO MENU DATA AVAILABLE</h5>
              <Link to={`/dashboard/addmenu`}><button className='btn btn-primary mt-4'>ADD MENU</button></Link>
            </center>
          </div>
          
          }
        </div>
     );
}

export default  ViewMenu ;