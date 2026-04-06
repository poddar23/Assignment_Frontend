import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";




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
        console.log("inproduct",arrayCat);
        

        //product Array
        const doc = collection(db, 'product');
        const snapShort = await getDocs(doc);
        let arrayPro = [];
        snapShort.forEach((doc) => {
            let res=arrayCat.find((index)=>index.id==doc.data().cname)
            console.log('matchcat',res.cname);
            
            arrayPro.push({ ...doc.data(), id: doc.id, catname:res.cname })
        })
       console.log("products",arrayPro);
       
        return arrayPro;

    } catch (error) {
        console.log(error);
        return error
    }
})

// export const deleteCategory = createAsyncThunk('deleteCategory', async (cid) => {
//     try {
//         console.log(cid);
//         const docRef = doc(db, 'category', cid);
//         const res = await deleteDoc(docRef);
//         const result = {msg: "Category Deleted",}
//         return result;
//     } catch (error) {
//         return error
//         console.log(error);
//     }
// })

// export const getCatById = createAsyncThunk('getCatById',async(cid)=>{
//     try {
//         const docRef = doc(db, 'category', cid);
//         const res = await getDoc(docRef);
//         return res.data();
        
//     } catch (error) {
//         return error
//     }
// })


// export const updateCategory = createAsyncThunk('updateCategory',async(obj)=>{
//     try {
//          const docRef = doc(db, 'category', obj.cid);
//          const res = await updateDoc(docRef,obj.data);
         
//             const result = {
//                 msg: "Category updated",
//             }
//             return result;
        
//     } catch (error) {
//         return error
//     }
// })


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
                state.proMsg = action.payload.msg;
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
            // .addCase(deleteCategory.pending, (state, action) => {
            //     state.isloading = true;
            // })
            // .addCase(deleteCategory.fulfilled, (state, action) => {
            //     state.isloading = false;
            //     state.catMsg = action.payload.msg;
            // })
            // .addCase(deleteCategory.rejected, (state, action) => {
            //     state.error = action.payload
            // })
            // .addCase(getCatById.pending, (state, action) => {
            //     state.isloading = true;
            // })
            // .addCase(getCatById.fulfilled, (state, action) => {
            //     state.isloading = false;
            //     state.singleCat = action.payload;
            // })
            // .addCase(getCatById.rejected, (state, action) => {
            //     state.error = action.payload
            // })
            // .addCase(updateCategory.pending, (state, action) => {
            //     state.isloading = true;
            // })
            // .addCase(updateCategory.fulfilled, (state, action) => {
            //     state.isloading = false;
            //     state.catMsg = action.payload.msg;
            // })
            // .addCase(updateCategory.rejected, (state, action) => {
            //     state.error = action.payload
            // })
            
    }
})

const ProductRedcuer = ProductSlice.reducer;
export default ProductRedcuer;