import { configureStore } from "@reduxjs/toolkit";
import CategoryRedcuer from "./Category";
import ProductRedcuer from "./Product";

export const store = configureStore({
    reducer:{
        'category':CategoryRedcuer,
        'product':ProductRedcuer
    }
})