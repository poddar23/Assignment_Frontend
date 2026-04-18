import React, { useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Redux/Product';
import { CategoryContext } from '../Context/CategoryContext';

function ProductSec() {
  const { productArray } = useSelector((state) => state.product)
  const dispatch = useDispatch();
  const {catname,setCatName}= useContext(CategoryContext)
  //console.log(productArray);

 
  useEffect(() => {
    dispatch(getProducts())   
  }, [])

   const FilterProduct = useMemo(()=>{
        let newArray ;
        if(catname != ''){
       
          newArray  = productArray.filter((index,i)=>{
               if(index.cname == catname){
                  return index
               }
          })
        
        }
        else{
       
            newArray = productArray
        }
       
        return newArray
  },[catname,productArray])
  
  return (
    <div>


      <section id="catalog" class="max-w-7xl mx-auto px-4 py-16">
        <h3 class="text-3xl font-semibold mb-8 text-center">Product Catalog</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {
            FilterProduct && FilterProduct.map((index, i) => (
              <div class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg">
                <img src={index.pimage} class="w-100 h-48 object-cover" />
                <div class="p-4">
                  <h4 class="font-semibold text-lg">{index.pname}</h4>
                  <p class="text-gray-600">{index.price}</p>
                  <button class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            ))
          }



        

        </div>
      </section>
    </div>
  )
}

export default ProductSec