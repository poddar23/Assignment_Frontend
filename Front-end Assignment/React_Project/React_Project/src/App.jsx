import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Adminindex from './Admin/Adminindex'
import Userindex from './User/Userindex'
import './App.css'



function App() {
 
  return (
    <>
      
      
       <Routes>
         <Route path='/' element={<Userindex />}></Route>





         {/* Admin route */}
         <Route path='/admin/*' element={<Adminindex />}></Route>
          
       </Routes>
       
    </>
  )
}

export default App