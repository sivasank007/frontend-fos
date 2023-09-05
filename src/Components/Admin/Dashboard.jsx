import React from 'react'
import TopBar from './TopBar';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return ( 
        <div className='' style={{overflow:'hidden'}}>
            <div className='d-flex' >
                <SideBar/>
                
                <main style={{width:'100%'}}>
                    <TopBar/>
                    <Outlet/>
                </main>
            </div>  
            
            
        </div>
     );
}

export default Dashboard;