import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { clearMsg, userRegistration } from '../Redux/User';
import { NavLink, useNavigate } from 'react-router-dom';
function Registraion() {
    const [user,setUser]=useState({});
    const dispatch = useDispatch();
    const {userMsg}=useSelector((state) => state.users)
    const navigate = useNavigate();


    const handleChange = (e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const handleClick=(e)=>{
    
        e.preventDefault();
        console.log(user);
        dispatch(userRegistration(user))
      
        
    }
    useEffect(()=>{
       if( userMsg=='user added'){
        dispatch(clearMsg())
          navigate('/login')
       }
    },[userMsg])
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
   
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
 {
        userMsg&& <p>{userMsg}</p>
    }
    <form className="space-y-4" method='post'>     
      <div>
        <label className="block font-medium text-gray-700 mb-1">Username</label>
        <input type="text" placeholder="Enter username"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" name='username' onChange={handleChange}/>
      </div>

     
      <div>
        <label className="block font-medium text-gray-700 mb-1">Email</label>
        <input type="email" placeholder="Enter email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" name='email' onChange={handleChange}/>
      </div>

      
      <div>
        <label className="block font-medium text-gray-700 mb-1">Password</label>
        <input type="password" placeholder="Enter password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" name='password' onChange={handleChange}/>
      </div>

    
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleClick}>
        Register
      </button>

    </form>

    <p className="text-center text-gray-600 mt-4 text-sm">
      Already have an account?
      <NavLink href="#" className="text-blue-600 font-medium hover:underline" to={'/login'}>Login</NavLink>
    </p>

  </div>
  </div>
  )
}

export default Registraion