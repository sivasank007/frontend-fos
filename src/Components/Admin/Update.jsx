import React, { useEffect, useState ,useRef} from 'react'
import pre_preview from '../../assests/images/previww.png'
import axios from 'axios';
import { useParams,Link ,useNavigate} from 'react-router-dom';

function AddProduct () {

    const {id} = useParams();

    const [menu,setMenu] = useState([]);
    const [Currency,setCurrency] = useState(1)



    const [menuitem,setMenuItem] = useState('');
    const [menuid,setMenuId] = useState();
    const [price,setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);
    const [description,setDescription] = useState('');
    const [img,setImg] = useState('');
       
    const [preview,setPreview] = useState(0);

    const [need,setNeed] = useState([]);


    //getting menu data
    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/data1')
        .then(res=>setMenu(res.data))
        .catch(err=>console.log(err))
    },[])

   

    //getting desired data
    useEffect(()=>{
        axios.get('https://backend-production-c84e.up.railway.app/need/'+id )
        .then(res=>{
            setMenuItem(res.data[0].menuitem);
            setMenuId(res.data[0].menuid);
            setPrice(res.data[0].price);
            setQuantity(res.data[0].quantity);
            setDescription(res.data[0].description)
            setImg(res.data[0].image)
        })
        .catch(err=>console.log(err))
    },[])

    //preview image
    const handleFile = (e) =>{
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    //handle submit

    function handleUpdate(e){
        e.preventDefault();

        axios.put('https://backend-production-c84e.up.railway.app/update/'+id,{menuitem,price})
        .then(res=>{
            if(res.data.updated){
                alert('Updated')
            }
            else{
                alert('not updated')
            }
        })
        
        
    }

    

    console.log(menuitem);
    console.log(price);
    

    return ( 
        
        <div style={{width:'100%'}}>
            
            <form style={{height:'100%'}} className="row" >
                <div  className="col-6 px-4">
                    <h5 style={{color:'orange'}} className='py-3 light-border'><b>UPDATE FORM !</b></h5>
                    <div action="">
                        <div className="pro">
                            <label htmlFor="">ProductName</label>
                            <input value={menuitem} onChange={(e)=>setMenuItem(e.target.value)} type="text" placeholder='Pizza' required/>
                        </div>
                        <div className='row'>
                            <div className="pro col-6">
                                <label htmlFor="">Select Categories</label>
                                <select onChange={(e)=>setMenuId(e.target.value)} name="" id="" required>
                                {menu.map(m=><option value={m.menuid}>{m.menuname}</option>)}
                                </select>
                            </div>
                            <div className="pro col-6">
                                <label htmlFor="">Currency</label>
                                <select onChange={(e)=>setCurrency(e.target.value)} name="" id="" required>
                                    <option value={1}>INR</option>
                                    <option value={2}>USD</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="pro col-6">
                                <label htmlFor="">Quantity</label>
                                <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="text" placeholder='01' required/>
                            </div>
                            <div className="pro col-6">
                                <label htmlFor="">Price</label>
                                <div className='d-flex'>
                                    {(Currency==1)?<span class="input-group-text">₹</span>:<span class="input-group-text">$</span>}
                                    <input value={price} onChange={(e)=>setPrice(e.target.value)} style={{width:'100%'}} type="text" placeholder='100' required/>
                                </div>
                            </div>
                        </div>
                        <div className="pro">
                            <label htmlFor="">Description</label>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="" id="" cols="" rows="5" placeholder='Message'></textarea>
                        </div>
                        <div className="pro">
                            <label htmlFor="">Product Image</label>
                            <div>
                                <input onChange={handleFile} style={{padding:'0.5rem 1rem',height:'3rem'}} type="file" required/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-5">
                    <h5 className='py-4 light-border'><b>PRODUCT</b></h5>
                    <img className='food_1 py-3 px-3 ps-5' src={'https://backend-production-c84e.up.railway.app/images/'+img} alt="" />
                    <div className='d-flex justify-content-between py-4 light-border'>
                        <label htmlFor="">Status Available</label>
                        <label class="switch">
                            <input type="checkbox"/>
                            <span class="slider round"></span>
                        </label>
                        
                    </div>
                    <div className='d-flex justify-content-between py-4 light-border'>
                        <label htmlFor="">Discount Active</label>
                        <label class="switch">
                            <input type="checkbox"/>
                            <span class="slider round"></span>
                        </label>
                        
                    </div>
                    <div className='d-flex justify-content-end py-4'>
                        <Link to='../menulist'><button style={{height:'3rem'}} className='btn me-3 px-4 py-2 btn-primary'> Back</button></Link>
                        <button  onClick={handleUpdate} type='submit' style={{background:'orange',color:'white',height:'3rem'}} className='btn px-4'>Update</button>
                    </div>
                </div>
            </form  >
        </div>
     );
}

export default AddProduct ;




