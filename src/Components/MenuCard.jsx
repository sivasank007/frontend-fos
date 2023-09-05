import React,{useEffect, useReducer, useState} from 'react';
import {Accordion} from 'react-bootstrap';
import axios from 'axios'

// sweetalert
import Swal from 'sweetalert2';


function Menu() {

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);
    
    const[menu,setMenu] = useState([]);
    const [menuitem,setMenuItem] = useState([]);
    
    const [cart,setCart]= useState([]);
    
    const menuname = '';

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/data')
        .then(res=>setMenuItem(res.data))
        .catch(err=>console.log(err))
    },[]);

    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/cartdata')
        .then(res=>setCart(res.data))
        .catch(err=>console.log(err))
    },[reducerValue])


    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/data1')
        .then(res=>setMenu(res.data))
        .catch(err=>console.log(err))
    },[]);

    function handleAdd(item) {
        if(cart.find(k=>k.menuitemid===item.menuitemsid)){
            Swal.fire(`<b>"${item.menuitem}"</b> is already in cart`)
            return;
        }
        else{
        axios.post('https://backend-production-c84e.up.railway.app/cart',{menuid:item.menuid, menuitemid:item.menuitemsid, menuname:item.menuitem, price:item.price, quantity:item.quantity,count:1, image:item.image})
        .then(res=>res)
        .catch(err=>console.log(err))
        }
        window.location.reload();
        forceUpdate()
                   
    }
  
    return ( 
        <div >
            <h3>{menuname}</h3>
            <div style={{maxHeight:'100vh',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>

                <h3 className='my-4 bg-white' style={{borderBottom:'1px solid rgb(213, 213, 213)',color:'orangered',position:'sticky',top:'0',zIndex:'33'}}>MENU LIST</h3>

                {menu.map(m=>
                <Accordion className='py-2' >
                <Accordion.Item>
                        <Accordion.Header>{m.menuname}</Accordion.Header>
                        {menuitem.map(n=> 
                            (m.menuid==n.menuid)?<Accordion.Body  style={{display:'flex',justifyContent:'space-between ',textAlign:'start',alignItems:'center',borderBottom:'1px solid rgb(213, 213, 213)'}} className='p-2' key={n.id}>
                            <div style={{display:'flex',alignItems:'center',width:'400px',marginLeft:"1rem"}} >
                                <img style={{height:'3.5rem',borderRadius:'50%',width:'3.5rem'}} src={'https://backend-production-c84e.up.railway.app/images/'+n.image} alt="" />
                                <div style={{fontSize:'1.1rem', marginLeft:'1.5rem',display:'flex',justifyContent:'space-between',width:'20rem'}}>
                                    <b>{n.menuitem}</b>
                                    <b>{n.price}</b>
                                </div>
                            </div>
                            <button style={{background:'#609dfe'}} onClick={()=>handleAdd(n)} className="btn">ADD</button>
                        </Accordion.Body>:''
                        )}
                    </Accordion.Item>
                </Accordion>
                )}
            </div>
        </div>
     );
}

export default Menu;