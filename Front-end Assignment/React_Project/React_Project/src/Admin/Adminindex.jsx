import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Category from './Category'
import Product from './Product'
import Users from './Users'

function Adminindex() {
  return (
    <div className='bg-gray-100'>
              
  <div className="flex h-screen">

    
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to={'/admin'} className="block p-2 rounded hover:bg-gray-700">Dashboard</NavLink>
        <NavLink to={'/admin/users'} className="block p-2 rounded hover:bg-gray-700">Users</NavLink>
        <NavLink  to={'/admin/category'} className="block p-2 rounded hover:bg-gray-700">Category</NavLink>
        <NavLink  to={'/admin/products'} className="block p-2 rounded hover:bg-gray-700">Products</NavLink>
        <NavLink to={'/admin/'} className="block p-2 rounded hover:bg-gray-700">Settings</NavLink>
        
      </nav>

      <div className="p-4 border-t border-gray-700">
        Logout
      </div>

    </aside>

    
    <div className="flex-1 flex flex-col">

     
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>

     
      <main className="flex-1 p-6 overflow-y-auto">
        
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-gray-500">120</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-gray-500">75</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-gray-500">₹50,000</p>
          </div>

        </div>

        <div classNameName="container p-10">
             <Routes>
                <Route path='/category' element={<Category />}></Route>
                <Route path='/products' element={<Product/>}></Route>
                <Route path='/users' element={<Users />}></Route>
             </Routes>
        </div>

      </main>

      
      <footer className="bg-white p-4 text-center shadow">
        © 2026 Admin Panel
      </footer>

    </div>

  </div>
    </div>
  )
}

export default Adminindex