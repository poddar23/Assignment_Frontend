import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react';

const GET_PRODUCTS = gql`
    query{
    products {
        pname,
        price,
        description
    }
}
`

function Home() {

    const {loading,error,data}=useQuery( GET_PRODUCTS)

    console.log(data);
    
      if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div>
         <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.products.map((index,i)=>(
                        <tr>
                            <td>{index.pname}</td>
                            <td>{index.price}</td>
                            <td>{index.description}</td>
                        </tr>
                    ))
                }
            </tbody>
         </table>
    </div>
  )
}

export default Home