import { gql } from '@apollo/client';


export const ADD_FRUIT = gql`  mutation addFruist($name: String!, $price: Int!, $description: String) {
    addFruist(name: $name, price: $price, description: $description) {
      id
      name
      price
      description
    }
  }`

export const GET_FRUITS = gql`
  query {
    fruits {
      id
      name
      price
      description
    }
  }
`;

export const UPDATE_FRUIT = gql`  mutation updateFruist($id:ID!,$name: String!, $price: Int!, $description: String) {
    updateFruist(id:$id,name: $name, price: $price, description: $description) {
      id
      name
      price
      description
    }
  }`

export const DELETE_FRUIT = gql`
  mutation DeleteFruit($id: ID!) {
    deleteFruit(id: $id)
  }
`;