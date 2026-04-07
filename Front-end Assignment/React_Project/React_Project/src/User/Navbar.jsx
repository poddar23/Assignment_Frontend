import React from 'react'

function Navbar() {
  return (
    <div>
       <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-blue-600">ShopEasy</h1>

      <ul class="hidden md:flex space-x-6 font-medium">
        <li><a href="#" class="hover:text-blue-600">Home</a></li>
        <li><a href="#categories" class="hover:text-blue-600">Categories</a></li>
        <li><a href="#catalog" class="hover:text-blue-600">Product Catalog</a></li>
      </ul>

      <button class="md:hidden text-2xl">☰</button>
    </div>
  </nav>
    </div>
  )
}

export default Navbar