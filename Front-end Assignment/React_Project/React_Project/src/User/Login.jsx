import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userRegistration } from '../Redux/User';
import { useNavigate } from 'react-router-dom';

function Login() {
     const [user,setUser]=useState({}); 
    const dispatch = useDispatch();
    const {userMsg,singleUser,islogged}=useSelector((state) => state.users)
    const navigate = useNavigate()


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
        dispatch(userLogin(user))      
    }

    useEffect(()=>{
        console.log(islogged);
        
         if(islogged){
              localStorage.setItem('loggedUser',JSON.stringify(singleUser))
            navigate('/')
            
        }  
    },[islogged])


  return (
    <div>
           <div class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
   {
        userMsg&& <p>{userMsg}</p>
    }
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

    <form class="space-y-4" method='post'>     
     

     
      <div>
        <label class="block font-medium text-gray-700 mb-1">Email</label>
        <input type="email" placeholder="Enter email"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" name='email' onChange={handleChange}/>
      </div>

      
      <div>
        <label class="block font-medium text-gray-700 mb-1">Password</label>
        <input type="password" placeholder="Enter password"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" name='password' onChange={handleChange}/>
      </div>

    
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleClick}>
        Register
      </button>

    </form>

    <p class="text-center text-gray-600 mt-4 text-sm">
      Already have an account?
      <a href="#" class="text-blue-600 font-medium hover:underline">Login</a>
    </p>

  </div>
  </div>
    </div>
  )
}

export default Login