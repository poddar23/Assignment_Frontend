import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import {db} from "../Firebase/firebase";




export const addProduct = createAsyncThunk('addProduct', async (data) => {
    try {
        const doc = collection(db, 'product');
        const res = await addDoc(doc, data);
        
            const result = {
                msg: "Product Created",
            }
            return result;
        
    } catch (error) {
        return error
    }
})

export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        //get category
        const doc1 = collection(db, 'category');
        const snapShort1 = await getDocs(doc1);
        let arrayCat = [];
        snapShort1.forEach((doc) => {
            arrayCat.push({ ...doc.data(), id: doc.id })
        })
        const doc = collection(db, 'product');
        const snapShort = await getDocs(doc);
        
        let arrayPro = [];
       if(snapShort){
           snapShort.forEach((doc) => {
           const res = arrayCat.find((index,i)=>{
                if(index.id==doc.data().cname){
                    return index
                }
           })
        arrayPro.push({ ...doc.data(), id: doc.id,  catname: res?.cname ?? ""})
        })
       }
        return arrayPro;

    } catch (error) {
        console.log(error);
        return error
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (pid) => {
    try {
        console.log(cid);
        const docRef = doc(db, 'product', pid);
        const res = await deleteDoc(docRef);
        const result = {msg: "Product Deleted",}
        return result;
    } catch (error) {
        return error
        console.log(error);
    }
})

export const getProductById = createAsyncThunk('getProductById',async(pid)=>{
    try {
        const docRef = doc(db, 'product', pid);
        const res = await getDoc(docRef);
        return res.data();
        
    } catch (error) {
        return error
    }
})


export const updateProduct = createAsyncThunk('updateProduct',async(obj)=>{
    try {
         const docRef = doc(db, 'product', obj.pid);
         const res = await updateDoc(docRef,obj.data);
         
            const result = {
                msg: "Product updated",
            }
            return result;
        
    } catch (error) {
        return error
    }
})


const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        singleProduct: null,
        isloadingP: false,
        productArray: [],
        proMsg: null,
        proError: null
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addProduct.pending, (state, action) => {
            state.isloadingP = true;
        })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isloadingP = false;
                state.MsgMsg = action.payload.msg;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.proError = action.payload
            })
            .addCase(getProducts.pending, (state, action) => {
                state.isloadingP = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isloadingP = false;
                state.productArray = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.proError = action.payload
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.isloadingP = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isloadingP = false;
                state.proMsg = action.payload.msg;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.proError = action.payload
            })
            .addCase(getProductById.pending, (state, action) => {
                state.isloadingP = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isloadingP = false;
                state.proMsg = "Product find";
                state.singleProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.proError = action.payload
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.isloadingP = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isloadingP = false;
                state.proMsg = action.payload.msg;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.proError = action.payload
            })
            
    }
})

const ProductRedcuer = ProductSlice.reducer;
export default ProductRedcuer;