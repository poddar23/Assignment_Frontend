import { configureStore } from "@reduxjs/toolkit";
import CategoryRedcuer from "./Category";
import ProductRedcuer from "./Product";
import UserReducer from "./User";
import CartRedcuer from "./Cart";


export const store = configureStore({
    reducer:{
        'category':CategoryRedcuer,
        'product':ProductRedcuer,
        'users':UserReducer,
        'cart':CartRedcuer
    }
})