import React from 'react'
import img1 from '../../assests/images/new.png'
import img2 from '../../assests/images/new_wave_152.53060010913688.png'
import img3 from '../../assests/images/new2.png'
import img4 from '../../assests/images/new3.png'

function DashMain() {
    return ( 
        <div >
            <h2 className='p-4'>Welcome, <span style={{color:'orangered'}}>Anna</span></h2>

            <div className="boxes">
                <div className="box">
                    <div className="box-child">
                        <div>
                            <h3>Sells Graph</h3>
                            <h4 >^ 3.2%</h4>
                        </div><h2>$8,451</h2>
                    </div>
                    <img src={img1} alt="888" height="80px" width="250"/>
                </div>
                <div className="box">
                    <div className="box-child">
                        <div>
                            <h3>Sells Graph</h3>
                            <h4 style={{backgroundColor: 'orange'}}>^ 3.2%</h4>
                        </div>
                        <h2>$8,451</h2>
                    </div>
                    <img src={img2} alt="888" height="80px" width="250"/>
                </div>
                <div className="box">
                    <div className="box-child">
                        <div>
                            <h3>Sells Graph</h3>
                            <h4>^ 3.2%</h4>
                        </div>
                        <h2>$8,451</h2>
                    </div>
                    <img src={img3} alt="888" height="80px" width="250"/>
                </div>  
                <div className="box">
                    <div className="box-child">
                        <div>
                            <h3>Sells Graph</h3>
                            <h4 style={{backgroundColor: 'orange'}}>^ 3.2%</h4>
                        </div>
                        <h2>$8,451</h2>
                    </div>
                    <img src={img4} alt="888" height="80px" width="250"/>
                </div>
            </div>

            <div className="parent-boxes">
                <div className="box-child1">
                    <div className="box-heading">
                        <h4>RECENT ORDERS REQUEST</h4>
                        <button>View All</button>
                    </div><hr/>
                    <div className="child2"><table>
                        <thead>
                            <tr>
                                <th>Food Items</th>
                                <th>Price</th>
                                <th>Product ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Burger</td>
                                <td>$5.99</td>
                                <td>1001</td>
                            </tr>
                            <tr>
                                <td>Pizza</td>
                                <td>$8.99</td>
                                <td>1002</td>
                            </tr>
                            <tr>
                                <td>Chicken Sandwich</td>
                                <td>$6.99</td>
                                <td>1003</td>
                            </tr>
                            <tr>
                                <td>Onion Rings</td>
                                <td>$3.99</td>
                                <td>1005</td>
                            </tr>
                        </tbody>
                    </table></div>
                </div>
                <div className="box-child1">
                    <div className="box-heading">
                        <h4>RECENT ORDERS REQUEST</h4>
                        <select name="" id="">
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                            <option value="">January</option>
                        </select>
                    </div><hr/>
                    <div className="percent-parent">
                        <h4>week1</h4>
                        <div className="percent">
                            <div className="percent-left">25%</div>
                            <div className="percent-right"></div>
                        </div>
                    </div>
                    <div className="percent-parent">
                        <h4>week2</h4>
                        <div className="percent">
                            <div className="percent-left">25%</div>
                            <div className="percent-right"></div>
                        </div>
                    </div>
                    <div className="percent-parent">
                        <h4>week3</h4>
                        <div className="percent">
                            <div className="percent-left">25%</div>
                            <div className="percent-right"></div>
                        </div>
                    </div>
                    <div className="percent-parent">
                        <h4>week4</h4>
                        <div className="percent">
                            <div className="percent-left">25%</div>
                            <div className="percent-right"></div>
                        </div>
                    </div>
                </div>  
            </div>     
        </div>
     );
}

export default DashMain;