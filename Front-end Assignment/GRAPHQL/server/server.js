const { gql, ApolloServer } = require('apollo-server-express');
const { default: axios } = require('axios');
const express = require('express')

const app = express();

const typeDefs = gql`
   type Product{
        pid:ID,
        pname:String, 
        price:Float,
        description:String
   }
     type Fruist{
     id:ID,
     name:String,
     price:Int,
     description:String
   }
   type Query{
        products:[Product] ,
        fruits:[Fruist]

   }  
  type Mutation{
          addFruist(name:String,price:Int,description:String):Fruist,
          deleteFruit(id: ID): Boolean,
          updateFruist(
          id: ID!
          name: String
          price: Int
          description: String
        ): Fruist
   }
  `;

const products = [
  { pid: '101p', pname: 'apple', price: '2100', description: 'green apple' },
  { pid: '102p', pname: 'graps', price: '200', description: 'black graps' }
]



const resolvers = {
  Query: {
    products: () => products,

    fruits: async () => {
      try {
        const res = await axios.get("http://localhost:5000/fruits");
        return res.data;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to fetch fruits");
      }
    },
  },

  Mutation: {
    addFruist: async (_, { name, price, description }) => {
      const newFruit = {
        id: Date.now().toString(),
        name,
        price,
        description,
      };
      await axios.post("http://localhost:5000/fruits", newFruit);
      return newFruit;
    },
    deleteFruit: async (_, { id }) => {
      try {
        await axios.delete(`http://localhost:5000/fruits/${id}`);
        return true;
      } catch (error) {
        console.error(error.message);
        return false;
      }
    },
    updateFruist: async(_, { id, name, price, description }) => {
         try {
          const newFruit = {
        name,
        price,
        description,
      };
           await axios.put(`http://localhost:5000/fruits/${id}`,newFruit);
            return newFruit;
         } catch (error) {
              console.log(error);
              
         }
    }
  
  },
};
async function serverStart() {
  const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers })
  await server.start();

  server.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/graphql');

  })

}


serverStart();