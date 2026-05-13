import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Adminindex from './Admin/Adminindex'
import Userindex from './User/Userindex'
import './App.css'
import Registraion from './User/Registration'
import Login from './User/Login'
import Viewcart from './User/Viewcart'



function App() {
 
  return (
    <>
      
      
       <Routes>
         <Route path='/' element={<Userindex />}></Route>
         <Route path='/registration' element={<Registraion/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/cart' element={<Viewcart/>}></Route>







         {/* Admin route */}
         <Route path='/admin/*' element={<Adminindex />}></Route>
          
       </Routes>
       
    </>
  )
}

export default App