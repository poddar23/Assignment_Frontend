import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import React from 'react'
import { useState } from 'react'
import { ADD_FRUIT, GET_FRUITS,DELETE_FRUIT,UPDATE_FRUIT  } from './comman';
import { useEffect } from 'react';



function FruitsCreate() {
  const [edit,setEdit]=useState(0)
  const [fruist, setFruits] = useState({});
   const { loading, error, data } = useQuery(GET_FRUITS)
  const [addFruit] = useMutation(ADD_FRUIT,{
  refetchQueries: [{ query: GET_FRUITS }],
})
  const [upFruit] = useMutation( UPDATE_FRUIT,{
  refetchQueries: [{ query: GET_FRUITS }],
})

const [ deleteFruitFub] = useMutation(DELETE_FRUIT,{
  refetchQueries: [{ query: GET_FRUITS }],
})
 



  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'price') {
      setFruits({
        ...fruist,
        ['price']: parseInt(value)
      })
    }
    else {
      setFruits({
        ...fruist,
        [name]: value
      })
    }

  }

  const deleteFruits=async(id)=>{
       await deleteFruitFub({
    variables: { id }
  })
  }

  const editFruits=async(id)=>{
        let editFruit = data && data.fruits.find((index)=>{
               if(index.id==id){
                  return index
               }
        })
        setFruits(editFruit)
        setEdit(1)
        
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(fruist);
    
     if(edit==0){
          console.log('added');
        await addFruit({
          variables: fruist
        })
        alert('added')
     }
     else{
        console.log('update');
        console.log(fruist);
        
        await upFruit({

          variables:fruist
        })
        setEdit(0)
        setFruits({});
     }

  }
  useEffect(()=>{

  },[edit])
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-96"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Add Fruit
          </h2>

          {/* Fruit Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Fruit Name
            </label>
            <input
              type="text"
              name="name"
              value={fruist.name ?? ''}
              onChange={handleChange}
              placeholder="Enter fruit name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={fruist.price ?? ''}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={fruist.description ?? ''}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <input type="submit" value={edit==0 ? 'Add':"Update"} />
         
        </form>

        <h2>Fruits Details</h2>
        <table border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr>
              <th>Fruit Name</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data  && data.fruits.map((index, i) => (
                <tr>
                  <td>{index.name}</td>
                  <td>{index.price}</td>
                  <td>{index.description}</td>
                  <td><button onClick={()=>{
                    deleteFruits(index.id)
                  }}>Delete</button></td>
                    <td><button onClick={()=>{
                    editFruits(index.id)
                  }}>Edit</button></td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FruitsCreate