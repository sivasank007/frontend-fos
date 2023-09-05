import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import S_Account from './Client/StatusBar/S_Account'
import Swal from 'sweetalert2'


function AccSignup({ change }) {
  const [userName, setUserName] = useState('')
  const [mail, setMail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [confirmationstatus, setconfirmationstatus] = useState(false)

  const navigate = useNavigate()
  const addUser = (e) => {
    e.preventDefault()
		if (password === checkPassword) {
			axios
				.post("https://backend-production-c84e.up.railway.app/adduser", {
					userName,
					mail,
					phone,
					password,
				})
				.then((res) => {
					
					if(res.data == "Email already exists"){
						Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Email already Exisits',
						})
					}
					else{
						if (confirmationstatus === false) {
              setconfirmationstatus(true)
              setTimeout(() => {
                setconfirmationstatus(false)
              }, 500)
            }
            setTimeout(() => {
              change(true)
            }, 700)
					}
				})
				.catch((err) => console.log(err));
		}
		else{
			Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Password mismatch',
			})
		}
	};
  return (
    <div>
      <div className="d-flex justify-content-center">
        <S_Account/>
      </div>
      <section className="d-flex justify-content-center">
        {confirmationstatus === true ? (
          <p
            style={{ position: 'absolute', right: '2%' }}
            className="successfullanimation"
          >
            Successfully Registered
          </p>
        ) : (
          ''
        )}
        <div
          className="bg-white"
          style={{ borderRadius: '7px', width: '500px', height: '400px' }}
        >
          <form onSubmit={addUser} className="py-3 px-5">
            <h4 className="text-center mt-3">SIGN UP</h4>
            <div className="d-flex flex-column my-2">
              <label className="label mb-2">
                <h6>User Name</h6>
              </label>
              <input
                name="name"
                type="name"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="d-flex">
              <div className="d-flex flex-column my-2 me-2">
                <label className="label mb-2">
                  <h6>Email</h6>
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="d-flex flex-column my-2">
                <label className="label mb-2">
                  <h6>Phone Number</h6>
                </label>
                <input
                  name="Number"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="d-flex flex-column my-2 me-2">
                <label className="label mb-2">
                  <h6>Password</h6>
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="d-flex flex-column my-2">
                <label className="label mb-2">
                  <h6>Confirm password</h6>
                </label>
                <input
                  type="password"
                  onChange={(e) => setCheckPassword(e.target.value)}
                  placeholder="Enter confirm password"
                  required
                />
              </div>
            </div>
            <center>
              <button type="submit" className="btn btn-primary mt-4">
                SIGN UP
              </button>
              <p className="mt-4">
                Already have an account ?{' '}
                <Link onClick={() => change(true)}>Log in</Link>{' '}
              </p>
            </center>
          </form>
        </div>
      </section> 
    </div>
  )
}

export default AccSignup
