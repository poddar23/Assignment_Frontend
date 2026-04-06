import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../Redux/Category';
import { addProduct, getProducts } from '../Redux/Product';

function Product() {
  const dispatch = useDispatch();
  const { catArray } = useSelector((state) => state.category)
  const {proError,proMsg,isloadingP,productArray}=useSelector((state)=>state.product)
  const [product, setProduct] = useState({
    pname: '',
    cname: '',
    price: '',
    pimage: [],
    description: ''

  })

  const cleanUp = ()=>{
       setProduct({
    pname: '',
    cname: '',
    price: '',
    pimage: [],
    description: '',
   

  })
  }

  const handleFile = (e) => {
    let fileArray = e.target.files;
    console.log(e.target.files);
    let proImgArray = [];
    for (let i = 0; i < fileArray.length; i++) {
      const file = e.target.files[i];

      const reader = new FileReader();

      reader.readAsDataURL(file)

      reader.onload = () => {
        proImgArray.push(reader.result)

      }

    }

    console.log(proImgArray);
    setProduct({
      ...product,
      ['pimage']: proImgArray
    })


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleClick = () => {
    dispatch(addProduct(product))
      setTimeout(cleanUp,2000)
  }
  

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getProducts())
  }, [])
  return (
    <div>
      <h2 className='text-2xl'>Add Product</h2>
     {
        isloadingP && <h3>Loading...</h3>
      }
      {
        proError && <p>{proError}</p>
      }
      {
        proMsg && <h3>{proMsg}</h3>
      }
      <form method='post'>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Category name</label>
                <div class="mt-2">
                  <select id="first-name" type="text" name="cname" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required onChange={handleChange} value={product.cname}>
                    <option value="">Select</option>
                    {
                      catArray && catArray.map((index, i) => (
                        <option value={index.id}>{index.cname}</option>
                      ))
                    }
                  </select>

                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Product Name </label>
                <div class="mt-2">
                  <input id="last-name" type="text" name="pname" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required onChange={handleChange}  value={product.pname}/>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Product image</label>
                <div class="mt-2">
                  <input id="last-name" type="file" name="pimage[]" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required onChange={handleFile} value={product.pimage} multiple />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Product  Price</label>
                <div class="mt-2">
                  <input id="last-name" type="text" name="price" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required onChange={handleChange} value={product.price} />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Description</label>
                <div class="mt-2">
                  <input id="last-name" type="text" name="description" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required onChange={handleChange} value={product.description}/>
                </div>
              </div>

            </div>
            <div class="sm:col-span-3">

              <div class="mt-3">

                <button type='button' className='p-2 bg-blue-600 text-white' onClick={handleClick}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
<div className="container mt-20">
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300">
            <thead class="bg-gray-100">
              <tr>
               
                <th class="border border-gray-300 px-4 py-2 text-left">SRNO</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                <th class="border border-gray-300 px-4 py-2 text-left">ProductName</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Price</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Images</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
                    {
                      productArray&& productArray.map((index,i)=>(
                          <tr key={i}>
                            <td class="border border-gray-300 px-4 py-2">{i+1}</td>
                            <td class="border border-gray-300 px-4 py-2">{index.catname}</td>
                            <td class="border border-gray-300 px-4 py-2">{index.pname}</td>
                            <td class="border border-gray-300 px-4 py-2">{index.price}</td>
                            <td class="border border-gray-300 px-4 py-2 ">
                              {
                                index.pimage && index.pimage.map((index)=>(
                                    <img src={index} alt="" height={"100px"} width={"100px"} />
                                ))
                              }
                            </td>
                             <td class="border border-gray-300 px-4 py-2">{index.description}</td>
                          </tr>
                      ))
                    }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Product