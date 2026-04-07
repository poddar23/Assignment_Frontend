import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategory, getCatById, getCategory, updateCategory } from '../Redux/Category';
import { log } from 'firebase/firestore/pipelines';

function Category() {
  const dispatch = useDispatch();
  const { isloading, catMsg, error, catArray,singleCat } = useSelector((state) => state.category)
  const [cat, setCat] = useState({
    cname: "",
    cimage: ""
  })
  const [cid,setCid]=useState(null);

  0.

  const handleChange = (e) => {
    setCat({
      cname: e.target.value
    })
  }
  const handleFile = (e) => {
    console.log(e.target.files[0]);

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onload = () => {
      setCat({
        ...cat,
        ['cimage']: reader.result
      })
    }

  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(cat);
    dispatch(addCategory(cat))

  }

  const handleUpdate = (e)=>{
    e.preventDefault();
      let obj ={data:cat,cid:cid};
      dispatch(updateCategory(obj))
  }
  useEffect(
    () => {
      dispatch(getCategory())
      
      
    }
    , [catMsg])

    useEffect(()=>{
        console.log('edit');
        setCat(singleCat ?? {})

        console.log(cat);
        
        
    },[singleCat])
  return (
    <div>
      <h2 className='text-2xl'>Add Category</h2>
      {
        isloading && <h3>Loading...</h3>
      }
      {
        error && <p>{error}</p>
      }
      {
        catMsg && <h3>{catMsg}</h3>
      }
      <form method='post'>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Category name</label>
                <div class="mt-2">
                  <input id="first-name" type="text" name="cname" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={handleChange} value={cat.cname ?? ''} />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Category image</label>
                <div class="mt-2">
                  <input id="last-name" type="file" name="cimage" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={handleFile} />
                </div>
              </div>

              <div class="sm:col-span-3">

                <div class="mt-2">
                 {
                     (cid == null) ?
                       <button className='p-2 bg-blue-600 text-white' onClick={handleClick}>Submit</button>
                     :
                      <button className='p-2 bg-blue-600 text-white' onClick={handleUpdate}>Update</button>

                 }
                </div>
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
                <th class="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                catArray && catArray.map((item, i) => (
                  <tr key={i}>
                    <td class="border border-gray-300 px-4 py-2">{i+1}</td>
                    <td class="border border-gray-300 px-4 py-2">{item.cname}</td>
                    <td class="border border-gray-300 px-4 py-2"> <img src={item.cimage} alt="" height={"100px"} width={"100px"} /></td>
                    <td><button className='bg-red-500 text-white p-2' onClick={()=>{
                        dispatch(deleteCategory(item.id))
                    }}>Delete</button></td>
                    <td>
                      <button className='bg-green-500 text-white p-2' onClick={()=>{
                        setCid(item.id)
                        dispatch(getCatById(item.id))
                      }}>Edit</button>
                    </td>
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

export default Category