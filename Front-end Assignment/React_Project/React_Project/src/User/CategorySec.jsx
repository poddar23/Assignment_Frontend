import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../Redux/Category';

function CategorySec() {
  const {catArray}=useSelector((state)=>state.category);
  
 const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getCategory())
  },[])
  return (
    <div>
      <section id="categories" class="max-w-7xl mx-auto px-4 py-16">
    <h3 class="text-3xl font-semibold mb-8 text-center">Shop by Category</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      {
          catArray && catArray.map((index,i)=>(
             <div class="bg-white shadow p-4 rounded-lg text-center hover:shadow-lg cursor-pointer">
              <button  onClick={()=>{
                alert(index.id)
              }}>
              <img src={index.cimage} alt="" />
              {index.cname}</button></div>
          ))
      }
    
    </div>
  </section>
    </div>
  )
}

export default CategorySec