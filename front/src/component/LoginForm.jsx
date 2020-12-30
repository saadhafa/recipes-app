import React from 'react'
import { apiFetch } from '../util/apiFetch'
import {useState} from 'react'

export const LoginForm = ({setUser})=>{

  const [error,setError] = useState(null)
  const [lodding,setLodding] = useState(false)

  const handlLoginSumbit = async (e) =>{
    setLodding(true)
    e.preventDefault()
      const loginData = new FormData(e.target)
      const request = await apiFetch('/login', {
        method: 'POST',
        body: loginData
      })
      const response = await request.json()

      if(request.ok){
        //connecting User
        setUser(response)       
      }else{
        // handlling error messages 
        setError(response.errors[0].message)
      }

     setLodding(false)
      
  }

  const AlertDanger = ({children}) =>{
    return (
      <div className="alert alert-danger">
        {children}
      </div>
    )
  }





  return (
  <form className="container md-4" onSubmit={handlLoginSumbit}>
    <h2>Login </h2>
    {error && <AlertDanger>{error}</AlertDanger> }
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
      <input type="text" name="email" className="form-control" id="email" placeholder="name@example.com" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="passsword" className="form-label">Password</label>
      <input type="password" name="password" className="form-control" id="password" placeholder="password"  required/>
    </div>
    <div className="md-3">
      <button disabled={lodding} className="btn btn-primary">Login</button>
    </div>
  </form>

  )
}