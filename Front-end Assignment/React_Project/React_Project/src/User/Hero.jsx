import React from 'react'
import Back from '../assets/back.png'

function Hero() {
  return (
    <div>
       <section class="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 class="text-4xl font-bold mb-4">Freshness Delivered to Your Doorstep
</h2>
      <p class="text-lg mb-6">Fruits, vegetables, dairy, beverages & groceries in one place.</p>
      <button class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Shop Now</button>
    </div>
    <img src="/src/assets/back.png" />
  </section>
    </div>
  )
}

export default Hero