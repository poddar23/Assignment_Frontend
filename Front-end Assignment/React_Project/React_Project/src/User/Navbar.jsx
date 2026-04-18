import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../Redux/User';
function Navbar() {

  const [logged,setLogged]= useState(false);
  const [user1,setUser1]=useState({})
  const {islogged}= useSelector((state)=>state.users)
  const dispatch = useDispatch();

  useEffect(()=>{
        let userInfo = localStorage.getItem('loggedUser');
        console.log(userInfo);
        
        if(userInfo){
            userInfo = JSON.parse(userInfo)
            setUser1(userInfo ?? {})
            setLogged(true)
            console.log(user1);
            
        }
  },[islogged])

  const logout1 = ()=>{
      localStorage.removeItem('loggedUser');
      dispatch(logout())
      console.log(islogged);
      
  }

  return (
    <div >
       <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-blue-600">ShopEasy</h1>

      <ul class="hidden md:flex space-x-6 font-medium">
        <li><a href="#" class="hover:text-blue-600">Home</a></li>
        <li><a href="#categories" class="hover:text-blue-600">Categories</a></li>
        <li><a href="#catalog" class="hover:text-blue-600">Product Catalog</a></li>
        {
           islogged==true ? <li>Welcome:{user1.username} <button onClick={logout1}>Logout</button></li> : <li><NavLink class="hover:text-blue-600" to={'/registration'}>Registraion</NavLink></li>
        }
       
      </ul>

      <button class="md:hidden text-2xl">☰</button>
    </div>
  </nav>
    </div>
  )
}

export default Navbar