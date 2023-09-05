import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomerNavbar from './CustomerNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

function Login() {
  const [mail, setMail] = useState('')
  const [phnum, setPhnum] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const checkuser = () => {
    axios
      .post('https://backend-production-c84e.up.railway.app/checkuser', { mail, phnum, password })
      .then((res) => {
        console.log(res.data)
        let cid = 0;
        if(res.data > 0){
          cid = res.data
          Cookies.set('id', cid)
        }
        if (res.data > 0) {
          const localCartData = JSON.parse(localStorage.getItem('localCart'))

          if (Array.isArray(localCartData)) {
            axios
              .post('https://backend-production-c84e.up.railway.app/cartlogin', {
                localCart: localCartData,
                cid: cid,
              })
              .then((res) => {
                console.log('Local cart data sent to server:', res.data)
              })
              .catch((err) => {
                console.error('Error sending local cart data:', err)
              })
          }
          navigate('/')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong username or phone number or password!',
          })
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <CustomerNavbar />
      <section className="d-flex justify-content-center mt-2 pt-5">
        <div
          className="bg-white"
          style={{ borderRadius: '7px', width: '500px', height: '480px' }}
        >
          <div className="py-3 px-5">
            <h3 className="text-center mt-3">LOG IN</h3>
            <div className="d-flex flex-column my-3">
              <label className="label my-2">
                <h6>Email / Phone number</h6>
              </label>
              <input
                name="email"
                type="email"
                onChange={(e) => {
                  setMail(e.target.value)
                  setPhnum(e.target.value)
                }}
                placeholder="enter email or phone number"
                required
              />
            </div>
            <div className="d-flex flex-column my-3">
              <label className="label my-2">
                <h6>Password / OTP</h6>
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
                required
              />
            </div>
            <center>
              <button onClick={checkuser} className="btn btn-primary mt-3 mb-4">
                LOG IN
              </button>
              <div>
                <Link to="/forgettenpassword">Forget Password ?</Link>
                <p className="mt-2">
                  Don't have an account ? <Link to="/signup">Sign up</Link>{' '}
                </p>
                <Link to={'/'}>BACK TO HOME</Link>
              </div>
            </center>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
