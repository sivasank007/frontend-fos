import React, { useState } from 'react'
import Dashboard from './Dashboard';
import axios from 'axios';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

function Main() {
    const adminID = Cookies.get("adminid");;
    const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

    const checkuser = (e) =>{
        e.preventDefault();
        axios.post('https://backend-production-c84e.up.railway.app/checkadmin',{mail,password})
        .then((res=>{
            if(res.data > 0){
                Cookies.set("adminid",res.data)
                window.location.reload();
            }
            else{
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong username or password!',
                })
            }
        }))
    }

  return (
    <div>
        {(adminID>0)?
            <Dashboard/>
            :
            <div>
                <TopBar/>
                <section className="mt-4 d-flex justify-content-center">
                <div
                    className="bg-white"
                    style={{ borderRadius: "7px", width: "500px", height: "450px" }}
                >
                    <form onSubmit={checkuser} className="py-3 px-5">
                        <h3 className="text-center mt-3">LOG IN</h3>
                        <div className="d-flex flex-column my-3">
                            <label className="label my-2">
                                <h6>Email</h6>
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => {
                                    setMail(e.target.value);
                                }}
                                placeholder="enter email or phone number"
                                required
                            />
                        </div>
                        <div className="d-flex flex-column my-3">
                            <label className="label my-2">
                                <h6>Password</h6>
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="enter password"
                                required
                            />
                        </div>
                        <center>
                            <button type='submit' className="btn btn-primary mt-3 mb-4">
                                LOG IN
                            </button>
                            <div>
                                <Link to="/forgettenpassword">Forget Password ?</Link>
                            </div>
                        </center>
                    </form>
                </div>
                </section>
            </div>
        }
    </div>
  )
}

export default Main