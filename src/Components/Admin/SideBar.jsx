import React from 'react';
import { Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard, faSquareMinus,faFolderTree,faFileInvoiceDollar,faUsers,faMoneyCheckDollar,faList} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function SideBar() {
    const menuItem=[
        {
            name:"Dashboard",
            sub:[
                {cat:'Statistics',path:'/dashboard/'},
            ],
            icon:faChessBoard, 
        },
        {
            name:"Menus",
            sub:[
                {cat:'Add Menu',path:'/dashboard/addmenu'},
                {cat:'Add MenuItems',path:'/dashboard/addmenuitems'},
                {cat:'View Menu',path:'/dashboard/viewmenu'},
                {cat:'View MenuItems',path:'/dashboard/viewmenuitems'},
            ],
            icon:faSquareMinus
        },
        {
            name:"Orders",
            sub:[
                {cat:'Pending',path:'/dashboard/orderpending'},
                {cat:'Completed',path:'/dashboard/ordercompleted'},
            ],
            icon:faFolderTree
        },
        {
            name:"Invoice",
            sub:[
                {cat:'Invoice List',path:'/dashboard/invoicelist'}
            ],
            icon:faFileInvoiceDollar
        }
    ]
    return ( 
        <div className='pb-3' style={{width:'28%',height:'100vh',background:'white',overflowY:'scroll'}}>
            <h2 className='ps-5 py-3' style={{zIndex:'99', letterSpacing:'5px',background:'rgb(213, 213, 210)',height:'5rem',position:'sticky',top:0,borderBottom:'0.5px solid grey'}}><span style={{color:'orangered'}}>FOOD</span>IE</h2>
            {menuItem.map(item=>
                <Accordion className='py-2' style={{maxHeight:'38.2rem'}} defaultActiveKey={null}>
                    <Accordion.Item >
                        <Accordion.Header style={{boxShadow:'none',border:'transparent',outline:'none'}}>
                        <FontAwesomeIcon className='pe-3 fs-4' icon={item.icon} />
                            <span className='fs-5 '>{item.name}</span>
                        </Accordion.Header>
                        <Accordion.Body style={{background:'rgb(213, 213, 213,0.5)'}}>
                        
                            {item.sub.map(n=>
                                <h6 className='p-3' >
                                    <Link  style={{textDecoration:'none',color:'black'}} to={n.path}>{n.cat}</Link>
                                </h6>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
     );
}

export default SideBar;